import * as z from "zod"
import components from "../templates/components.json"
import ora from "ora"
import { existsSync, promises as fs } from "fs"
import _ from "lodash"
import path from "path"
import * as process from "process"
import { DependencyDef } from "@/src/helpers/dependencies"
import { logger } from "@/src/utils/logger"
import { createJSONSnapshot } from "@/src/helpers/snapshot"
import prompts from "prompts"
import chalk from "chalk"

const baseUrl = process.env.COMPONENTS_BASE_URL ?? "https://chalk.rahim.app"

const componentSchema = z.object({
    component: z.string(),
    name: z.string(),
    dependencies: z.array(z.array(z.string())).optional(),
    family: z.array(z.string()).optional(),
    files: z.array(
        z.object({
            name: z.string(),
            dir: z.string(),
            content: z.string(),
        }),
    ),
})

export type Component = z.infer<typeof componentSchema>

const componentsSchema = z.array(componentSchema)

/**
 * Get all components from components.json file
 */
export function getAvailableComponents() {
    return components.map((component: Component) => {
        return {
            component: component.component,
            name: component.name,
            dependencies: component.dependencies,
            family: component.family,
            files: component.files,
        }
    })
}

/**
 *
 */
export function getAvailableComponentDependencyList() {
    const availableComponents = getAvailableComponents()
    return _.flatten(availableComponents.map(c => c.dependencies?.map(n => n[0]))).filter(n => n!.length > 0) as string[]
}

/**
 *
 */
export async function getAvailableComponentsFromDir(dir: string) {
    const availableComponents = getAvailableComponents()
    const installedComponents = await getInstalledComponentList(dir)
    return installedComponents.map(name => availableComponents.filter(comp => comp.component === name)[0])
}

/**
 *
 */
export async function getAvailableComponentDependencyListFromDir(dir: string) {
    const components = await getAvailableComponentsFromDir(dir)
    return _.flatten(components.map(c => c.dependencies?.map(n => n[0]))).filter(n => n!.length > 0) as string[]
}

export async function getInstalledComponents(dir: string) {
    const srcPath = path.resolve(dir)
    return createJSONSnapshot(srcPath, path.resolve("./package.json"))
}

export async function getInstalledComponentList(dir: string) {
    try {

        const directoryEntries = await fs.readdir(dir, { withFileTypes: true })

        return directoryEntries
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
    } catch (error) {
        console.error("Error occurred while reading directory names:", error)
        return []
    }
}


export async function script_addComponents(
    {
        components,
        projectInfo,
        componentDestination,
        isUpdating = false,
    }: {
        components: Component[],
        projectInfo: any,
        componentDestination: string
        isUpdating?: boolean
    }
) {

    const availableComponents = await getAvailableComponents()
    const installedComponents = await getAvailableComponentsFromDir(componentDestination)

    let componentsToAdd: Component[] = components
    let dependenciesToInstall: DependencyDef[] = []

    if (!isUpdating) {
        for (const component of componentsToAdd) {
            // Insert component's family in list only if it isn't already added
            if (component.family?.length && component.family.length > 0) {
                component.family.filter(n => !componentsToAdd.map(s => s.component).includes(n)).map(n => {
                    const comp = availableComponents.filter(c => c.component === n)[0]
                    if (comp) componentsToAdd.push(comp)
                })
            }
        }

        // Add core folder
        componentsToAdd.push(availableComponents.filter(n => n.component === "core")[0]!)
    }

    // Overwrite components or filter
    componentsToAdd = isUpdating ? componentsToAdd : _.differenceBy(componentsToAdd, installedComponents, "component")

    for (const component of componentsToAdd) {
        const componentSpinner = ora(`${component.name}...`).start()

        // Write the files of each component
        for (const file of component.files) {

            // Replace path alias with the project's alias.
            if (projectInfo?.alias) {
                file.content = file.content.replace(/@\//g, projectInfo.alias)
            }

            // Get the directory of each file
            const componentDir = file.dir === "." ? componentDestination : (componentDestination + "/" + file.dir) // e.g: ./src/components/ui/xxxxx

            // Create dir if it doesn't exist
            if (file.dir) {
                if (!existsSync(path.resolve(componentDir))) {
                    await fs.mkdir(path.resolve(componentDir), { recursive: true })
                }
            }

            // Write the content of the component to the directory
            const filePath = path.resolve(componentDir, file.name)
            await fs.writeFile(filePath, file.content)
        }

        // Add dependencies to list to install
        if (component.dependencies?.length && component.dependencies.length > 0) {
            component.dependencies.map(d => dependenciesToInstall.push(d))
        }

        componentSpinner.succeed(component.name)

    }

    if (componentsToAdd.length === 0) {
        logger.warn("Component(s) already added.")
        return []
    }

    // Remove duplicates
    dependenciesToInstall = _.uniqWith(dependenciesToInstall, _.isEqual)

    return dependenciesToInstall
}

export async function script_updateComponents(
    availableComponents: Component[],
    installedComponents: Component[],
    dir: string,
) {

    const arr: Component[] = []

    console.log(chalk.bold("Chalk UI Updater:"), "Thank you for using the Chalk UI CLI.")
    console.log(chalk.italic(chalk.dim("Before updating your components beware of breaking components.\n")))

    const { maintainStyling } = await prompts({
        type: "confirm",
        name: "maintainStyling",
        message: "Do you want to maintain the changes you've made to components' anatomies?",
        initial: true,
    })

    const tempFilePath = path.resolve(dir + "/TEMP.tsx")

    for (const installedComponent of installedComponents) { // Go through installed components

        // Find the latest version of the component
        const updatedComponent = availableComponents.find((component) => component.component === installedComponent.component)

        if (updatedComponent && updatedComponent.component !== "core") {

            const updatedFiles: { name: string; dir: string; content: string }[] = []

            for (const updatedFile of updatedComponent.files) { // Go through each file

                const prefix = chalk.bold(chalk.magentaBright(`[${updatedFile.dir}/${updatedFile.name}]`))

                const installedFile = installedComponent.files.find(f => f.name === updatedFile.name)

                if (!installedFile) {
                    // add it
                    return
                }

                if (_.isEqual(updatedFile.content, installedFile.content)) {
                    console.log(prefix, chalk.dim(`-> No difference`))
                    continue
                }

                logger.warn("* Action required")
                logger.info(prefix, `-> Temporary updated file created, modify the file if necessary`, chalk.bold(chalk.red("(*)")))

                // Keep current anatomy functions intact or overwrite them
                const content = maintainStyling ? mergeFileContent(installedFile.content, updatedFile.content) : updatedFile.content

                await fs.writeFile(tempFilePath, content)

                // const { proceed } = await prompts({
                //     type: "confirm",
                //     name: "proceed",
                //     message: "Proceed?",
                //     initial: true,
                // })

                while (true) {

                    const { command } = await prompts([
                        {
                            type: "text",
                            name: "command",
                            message: "What do you want to do? [merge, skip]",
                            initial: "merge",
                        },
                    ])

                    if (command === "merge") {

                        const finalContent = await fs.readFile(tempFilePath, "utf8")

                        updatedFiles.push({
                            name: installedFile.name,
                            dir: installedFile.dir,
                            content: finalContent,
                        })
                        break

                    } else if (command === "skip") {
                        logger.success("√ File ignored")
                        break
                    } else {
                        break
                    }

                }

            }

            const finalComponent: Component = {
                component: installedComponent.component,
                name: installedComponent.name,
                dependencies: updatedComponent.dependencies,
                family: updatedComponent.family,
                files: updatedFiles,
            }

            arr.push(finalComponent)

        }
    }

    await fs.rm(tempFilePath)

    return arr

}

//
// export function script_updateComponents(
//     availableComponents: Component[],
//     installedComponents: Component[],
//     maintainCurrentStyling: boolean
// ): Component[] {
//     const arr: Component[] = []
//
//     for (const installedComponent of installedComponents) {
//         const updatedComponents = availableComponents.find(
//             (availableComponent) => availableComponent.component === installedComponent.component
//         )
//
//         if (updatedComponents) {
//             const updatedFiles: { name: string; dir: string; content: string }[] = []
//
//             for (const installedFile of installedComponent.files) {
//                 const updatedFile = updatedComponents.files.find((availableFile) => availableFile.name === installedFile.name)
//
//                 if (updatedFile) {
//
//                     let updatedContent = updatedFile.content
//
//                     if (maintainCurrentStyling && updatedFile.content.includes("defineStyleAnatomy") && !updatedFile.content.includes("ComponentAnatomy")) {
//                         updatedContent = mergeFileContent(installedFile.content, updatedFile.content)
//                     }
//
//                     if (installedComponent.component === "vertical-nav") {
//                         console.log(updatedContent)
//                     }
//                     updatedFiles.push({
//                         name: installedFile.name,
//                         dir: installedFile.dir,
//                         content: updatedContent,
//                     })
//                 }
//             }
//
//             const updatedComponent: Component = {
//                 component: installedComponent.component,
//                 name: installedComponent.name,
//                 dependencies: updatedComponents.dependencies,
//                 family: updatedComponents.family,
//                 files: updatedFiles,
//             }
//
//             arr.push(updatedComponent)
//         }
//     }
//
//     return arr
// }
//
function mergeFileContent(originalContent: string, updatedContent: string): string {
    const originalLines = originalContent.split("\n")
    const updatedLines = updatedContent.split("\n")
    // const mergedLines: string[] = originalLines

    const original = extractAnatomyFunctions(originalContent)
    const updated = extractAnatomyFunctions(updatedContent)

    // console.log(original)

    let mergedLines = updatedLines
    for (const indices of updated.indices) {
        mergedLines = mergedLines.filter((line, idx) => (idx < indices.start) || (idx > indices.end))
    }

    let preservedLines: string[][] = []
    for (const indices of original.indices) {
        if (indices.start !== 0 && indices.end !== 0) {
            preservedLines.push(originalLines.filter((line, idx) => (idx >= indices.start) && (idx <= indices.end)))
            preservedLines.push(["\r"])
        }
    }

    mergedLines.map((line, idx) => {
        if (line.trim().includes("*") && line.includes("Anatomy")) { // * Anatomy
            let injectionIndex = idx + 3
            // console.log(_.flatten(original.anatomyFuncs))
            mergedLines.splice(injectionIndex, 0, ..._.flatten(preservedLines))
        }
    })

    // console.log(mergedLines)

    return mergedLines.join("")
}

export function extractAnatomyFunctions(content: string) {
    const lines = content.split("\n")
    let anatomyFuncs: string[] = []
    let indices: { start: number, end: number }[] = []

    // console.log(content)
    // logger.error("-------------------")

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (line.includes("defineStyleAnatomy(")) { // Start of a function
            let funcStartIndex = i
            let funcEndIndex = -1
            let entireFuncLines: string[] = [] // export const ... = defineStyleAnatomy(

            let foundEnd = false
            let cursorIndex = i
            while (!foundEnd) {
                if (lines[cursorIndex].trim().includes("})")) {
                    funcEndIndex = cursorIndex
                    foundEnd = true
                }
                cursorIndex += 1
            }

            entireFuncLines = lines.slice(funcStartIndex, funcEndIndex + 1)

            indices.push({ start: funcStartIndex, end: funcEndIndex })
            anatomyFuncs.push(entireFuncLines.join())

        }
    }

    // console.log(anatomyFuncs)

    return {
        anatomyFuncs,
        indices
    }
}

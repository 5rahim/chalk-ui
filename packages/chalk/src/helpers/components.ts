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
    }: {
        components: Component[],
        projectInfo: any,
        componentDestination: string
    }
) {

    const availableComponents = await getAvailableComponents()
    const installedComponents = await getAvailableComponentsFromDir(componentDestination)

    let componentsToAdd: Component[] = components
    let dependenciesToInstall: DependencyDef[] = []

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

    // Get uninstalled components
    componentsToAdd = _.differenceBy(componentsToAdd, installedComponents, "component")

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


export function script_updateComponents(
    availableComponents: Component[],
    installedComponents: Component[]
): Component[] {
    const arr: Component[] = []

    const anatomyBlock = "/* -------------------------------------------------------------------------------------------------\r\n * Anatomy\r\n * -----------------------------------------------------------------------------------------------*/"

    for (const installedComponent of installedComponents) {
        const updatedComponents = availableComponents.find(
            (availableComponent) => availableComponent.component === installedComponent.component
        )

        if (updatedComponents) {
            const updatedFiles: { name: string; dir: string; content: string }[] = []

            for (const installedFile of installedComponent.files) {
                const updatedFile = updatedComponents.files.find(
                    (availableFile) => availableFile.name === installedFile.name
                )

                if (updatedFile) {

                    let updatedContent = mergeFileContent(installedFile.content, updatedFile.content)

                    if (installedComponent.component === "vertical-nav") {
                        console.log(updatedContent)
                    }
                    updatedFiles.push({
                        name: installedFile.name,
                        dir: installedFile.dir,
                        content: updatedContent,
                    })
                }
            }

            const updatedComponent: Component = {
                component: installedComponent.component,
                name: installedComponent.name,
                dependencies: updatedComponents.dependencies,
                family: updatedComponents.family,
                files: updatedFiles,
            }

            arr.push(updatedComponent)
        }
    }

    return arr
}

function mergeFileContent(originalContent: string, updatedContent: string): string {
    const originalLines = originalContent.split("\n")
    const updatedLines = updatedContent.split("\n")
    const mergedLines: string[] = []

    let mergeIndex = 0
    while (mergeIndex < originalLines.length && mergeIndex < updatedLines.length) {
        const originalLine = originalLines[mergeIndex].trim()
        const updatedLine = updatedLines[mergeIndex].trim()

        if (
            originalLine.startsWith("export const ") &&
            updatedLine.startsWith("export const ") &&
            originalLine.includes("defineStyleAnatomy") &&
            updatedLine.includes("defineStyleAnatomy")
        ) {
            const originalFunctionName = originalLine.match(/export const (\w+)/)?.[1]
            const updatedFunctionName = updatedLine.match(/export const (\w+)/)?.[1]

            if (originalFunctionName === updatedFunctionName) {
                let originalFunctionBody = ""
                let updatedFunctionBody = ""

                // Find the body of the original function
                let originalFunctionEndIndex = mergeIndex + 1
                while (
                    originalFunctionEndIndex < originalLines.length &&
                    !originalLines[originalFunctionEndIndex].includes("})")
                    ) {
                    originalFunctionBody += originalLines[originalFunctionEndIndex] + "\n"
                    originalFunctionEndIndex++
                }

                // Find the body of the updated function
                let updatedFunctionEndIndex = mergeIndex + 1
                while (
                    updatedFunctionEndIndex < updatedLines.length &&
                    !updatedLines[updatedFunctionEndIndex].includes("})")
                    ) {
                    updatedFunctionBody += updatedLines[updatedFunctionEndIndex] + "\n"
                    updatedFunctionEndIndex++
                }

                // Use the original function body as the merge result
                mergedLines.push(originalLine)
                mergedLines.push(originalFunctionBody)

                // Skip the updated function body
                mergeIndex = updatedFunctionEndIndex
                continue
            }
        }

        // Use the updated line as the merge result
        mergedLines.push(updatedLine)

        mergeIndex++
    }

    // Append the remaining lines from the longer file
    if (mergeIndex < originalLines.length) {
        mergedLines.push(...originalLines.slice(mergeIndex))
    } else if (mergeIndex < updatedLines.length) {
        mergedLines.push(...updatedLines.slice(mergeIndex))
    }

    return mergedLines.join("\n")
}

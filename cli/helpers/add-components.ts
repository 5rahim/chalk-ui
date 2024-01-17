import { DependencyDef } from "../helpers/dependencies"
import _ from "lodash"
import ora from "ora"
import fs from "fs"
import path from "path"
import { Component, getAvailableComponents, getAvailableComponentsFromDir } from "../helpers/components"
import chalk from "chalk"

export async function script_addComponents(
    {
        components,
        projectInfo,
        componentDestination,
        isUpdating = false,
        overwrite = false,
    }: {
        components: Component[],
        projectInfo: any,
        componentDestination: string
        isUpdating?: boolean
        overwrite?: boolean
    }
) {

    const availableComponents = getAvailableComponents()
    const installedComponents = await getAvailableComponentsFromDir(componentDestination)

    let componentsToAdd: Component[] = components
    let dependenciesToInstall: DependencyDef[] = []

    // Only add component family and core if we are not updating
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

    // Filter out components that are already added (only if we are not updating) when `overwrite=true`
    componentsToAdd = isUpdating ? componentsToAdd : (overwrite ? componentsToAdd : _.differenceBy(componentsToAdd, installedComponents, "component"))

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
                if (!fs.existsSync(path.resolve(componentDir))) {
                    await fs.promises.mkdir(path.resolve(componentDir), { recursive: true })
                }
            }

            // Write the content of the component to the directory
            const filePath = path.resolve(componentDir, file.name)
            await fs.promises.writeFile(filePath, file.content, { encoding: "utf-8" })
            // \/ Might not be needed
            const fileHandle = await fs.promises.open(filePath, "r")
            await fileHandle.close()
        }

        // Add dependencies to list to install
        if (component.dependencies?.length && component.dependencies.length > 0) {
            component.dependencies.map(d => dependenciesToInstall.push(d))
        }

        componentSpinner.succeed(component.name)

    }

    if (componentsToAdd.length === 0) {
        console.log(`\n${chalk.italic(chalk.dim("No components to add."))}`)
        return []
    }

    // Remove duplicates
    dependenciesToInstall = _.uniqWith(dependenciesToInstall, _.isEqual)

    return dependenciesToInstall
}

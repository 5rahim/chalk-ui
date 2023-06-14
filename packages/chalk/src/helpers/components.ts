import * as z from "zod"
import components from "../templates/components.json"
import ora from "ora"
import { existsSync, promises as fs } from "fs"
import _ from "lodash"
import path from "path"
import * as process from "process"
import { DependencyDef } from "@/src/helpers/dependencies"

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

export function getAvailableComponentDependencyList() {
    const availableComponents = getAvailableComponents()
    return _.flatten(availableComponents.map(c => c.dependencies?.map(n => n[0]))).filter(n => n!.length > 0) as string[]
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

    let componentsToAdd: Component[] = components
    let dependenciesToInstall: DependencyDef[] = []

    for (const component of components) {
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

    // Remove duplicates
    dependenciesToInstall = _.uniqWith(dependenciesToInstall, _.isEqual)

    return dependenciesToInstall
}

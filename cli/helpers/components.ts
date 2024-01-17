import * as z from "zod"
import { createJSONSnapshot } from "../../scripts/create-bank-snapshot"
import components from "../bank/bank.json"
import fs from "fs"
import _ from "lodash"
import path from "path"

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
 * Get the latest component list from components.js
 * -> ['button', ...]
 */
export function getAvailableComponentDependencyList() {
    const availableComponents = getAvailableComponents()
    return _.flatten(availableComponents.map(c => c.dependencies?.map(n => n[0]))).filter(n => n!.length > 0) as string[]
}

/**
 *  Get the latest version of already installed components
 */
export async function getAvailableComponentsFromDir(dir: string) {
    const availableComponents = getAvailableComponents()
    const installedComponents = await getInstalledComponentList(dir)
    return installedComponents.map(name => availableComponents.filter(comp => comp.component === name)[0])
}

/**
 * Get the latest dependency list from installed components
 */
export async function getAvailableComponentDependencyListFromDir(dir: string) {
    const components = await getAvailableComponentsFromDir(dir)
    return _.flatten(components.map(c => c.dependencies?.map(n => n[0]))).filter(n => n!.length > 0) as string[]
}

/**
 * Get installed components
 */
export async function getInstalledComponents(dir: string) {
    const srcPath = path.resolve(dir)
    return await createJSONSnapshot(srcPath, path.resolve("./package.json"))
}

/**
 * Get the list of installed components
 */
export async function getInstalledComponentList(dir: string) {
    try {

        const directoryEntries = await fs.promises.readdir(dir, { withFileTypes: true })

        return directoryEntries
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
    } catch (error) {
        console.error("Error occurred while reading directory names:", error)
        return []
    }
}



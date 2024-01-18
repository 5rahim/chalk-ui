import fs from "fs"
import { HttpsProxyAgent } from "https-proxy-agent"
import _ from "lodash"
import fetch from "node-fetch"
import path from "path"
import * as z from "zod"
import { createBankSnapshot } from "../../scripts/create-bank-snapshot"

const URL = process.env.COMPONENTS_BANK_URL || "https://chalk.rahim.app"
const agent = process.env.https_proxy
    ? new HttpsProxyAgent(process.env.https_proxy)
    : undefined

const componentSchema = z.object({
    component: z.string(),
    name: z.string(),
    dependencies: z.array(z.array(z.string())),
    family: z.array(z.string()),
    files: z.array(
        z.object({
            name: z.string(),
            dir: z.string(),
            content: z.string(),
        }),
    ),
})

export type Component = z.infer<typeof componentSchema>

/**
 * Get all components from the components bank
 */
export async function getAvailableComponents(): Promise<Component[]> {
    try {
        const res = await fetch(`${URL}/api/bank`, { agent })
        return await res.json() as Component[]
    }
    catch (error) {
        console.error(error)
        throw new Error(`Failed to fetch components bank from ${URL}`)
    }
}

/**
 * Get the latest component list from components.js
 * -> ['button', ...]
 */
export async function getAvailableComponentDependencyList() {
    const availableComponents = await getAvailableComponents()
    return _.flatten(availableComponents.map(c => c.dependencies?.map(n => n[0]))).filter(n => n!.length > 0) as string[]
}

/**
 *  Get the latest version of already installed components
 */
export async function getAvailableComponentsFromDir(dir: string) {
    const availableComponents = await getAvailableComponents()
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
    return await createBankSnapshot(srcPath, path.resolve("./package.json"))
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
    }
    catch (error) {
        // console.error("Error occurred while reading directory names:", error)
        return []
    }
}



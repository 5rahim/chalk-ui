import fs from "fs-extra"
import _ from "lodash"
import path from "path"
import { type PackageJson } from "type-fest"
import { getAvailableComponentDependencyList } from "../helpers/components"
import { mainDependencies } from "../info"

export function getPackageInfo() {
    const packageJsonPath = path.join("package.json")

    return fs.readJSONSync(packageJsonPath) as PackageJson
}

/**
 * Get all dependencies from package.json
 */
export function getDependencyListFromPackage() {
    const packageInfo = getPackageInfo()

    const res = !!packageInfo.dependencies ? Object.keys(packageInfo.dependencies) : []
    if (!!packageInfo.devDependencies) {
        Object.keys(packageInfo.devDependencies).map(n => {
            res.push(n)
        })
    }

    return res
}

/**
 * Get all dependencies that are used by components
 */
export async function getComponentDependencyListFromPackage() {
    const packageJsonDependencies = getDependencyListFromPackage()
    const availableComponentsDependencies = await getAvailableComponentDependencyList()

    return _.intersection(_.uniq([...availableComponentsDependencies, ...mainDependencies.map(n => n[0])]), packageJsonDependencies)
}


export function getPackageManager() {
    const agent = process.env.npm_config_user_agent

    if (!agent) {
        const parent = process.env._

        if (!parent) {
            // No luck, assume npm
            return "npm"
        }

        if (parent.endsWith("pnpx") || parent.endsWith("pnpm")) return "pnpm"
        if (parent.endsWith("yarn")) return "yarn"

        // Assume npm for anything else
        return "npm"
    }

    const [program] = agent.split("/")

    if (program === "yarn") return "yarn"
    if (program === "pnpm") return "pnpm"
    if (program === "bun") return "bun"

    // Assume npm
    return "npm"
}

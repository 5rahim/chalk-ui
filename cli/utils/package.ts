import fs from "fs-extra"
import path from "path"
import { type PackageJson } from "type-fest"
import _ from "lodash"

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


export function getPackageManager() {
    const userAgent = process.env.npm_config_user_agent

    if (!userAgent) {
        return "npm"
    }

    if (userAgent.startsWith("yarn")) {
        return "yarn"
    }

    if (userAgent.startsWith("pnpm")) {
        return "pnpm"
    }

    return "npm"
}

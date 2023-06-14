/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
import { getPackageManager } from "@/src/utils/package"
import { logger } from "@/src/utils/logger"

export const dependencyVersionArray = [
    ["class-variance-authority", "^0.6.0", ""],
    ["react-aria", "^3.24.0", ""],
    ["lodash", "^4.17.21", ""],
    ["@types/lodash", "^4.14.194", "-D"],
    ["tailwindcss-animate", "latest", ""],
    ["clsx", "^1.2.1", ""],
    ["tailwind-merge", "^1.13.1", ""]
]
export type AvailableDependencies = keyof typeof dependencyVersionArray;

export const legacy_addDependencies = (arr: string[] | string[][]) => {
    const withVersions = Array.isArray(arr[0])
    const dependencies = (withVersions ? arr.map(a => a[0] + "@" + a[1]) : arr as string[]).filter(Boolean)
    const pm = getPackageManager()
    // return execa(pm, [
    //    pm === "npm" ? "install" : "add",
    //    ...dependencies,
    // ])
    return ""
}

export const installDependencies = (arr: string[][]) => {
    const normalDeps = arr.filter(n => n[2] === "").map(a => a[0] + "@" + a[1].replace("^", ""))
    const devDeps = arr.filter(n => n[2] === "-D").map(a => a[0] + "@" + a[1].replace("^", ""))
    const pm = getPackageManager()
    const text = `${pm} ${pm === "npm" ? "install" : "add"} ${normalDeps.join(" ")}`
    const text2 = `${pm} ${pm === "npm" ? "install" : "add"} ${devDeps.join(" ")} -D`

    if (normalDeps.length > 0) {
        //
    }
    if (devDeps.length > 0) {
        //
    }

    logger.info("\nYou can copy and paste the following script to install dependencies manually in case of an error: ")
    logger.info("---")
    logger.text(text)
    logger.info("---")
    logger.text(text2)
    logger.info("---")

    return ""
}

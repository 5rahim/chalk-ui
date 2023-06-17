/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
import { getPackageManager } from "@/src/utils/package"
import { logger } from "@/src/utils/logger"
import { execa } from "execa"
import ora from "ora"

export type DependencyDef = string[];

export const mainDependencies: DependencyDef[] = [
    ["class-variance-authority", "^0.6.0", ""],
    ["react-aria", "^3.24.0", ""],
    ["lodash", "^4.17.21", ""],
    ["@types/lodash", "^4.14.194", "-D"],
    ["tailwindcss-animate", "latest", ""],
    ["clsx", "^1.2.1", ""],
    ["tailwind-merge", "^1.13.1", ""]
]
export type AvailableDependencies = keyof typeof mainDependencies;

export const script_installDependencies = async (arr: string[][]) => {
    if (arr.length > 0) {
        const spinner = ora(`Installing dependencies...`).start()
        const pm = getPackageManager()

        const normalDeps = arr.filter(n => n[2] === "").map(a => a[0] + "@" + a[1].replace("^", ""))
        const devDeps = arr.filter(n => n[2] === "-D").map(a => a[0] + "@" + a[1].replace("^", ""))
        const text = `${pm} ${pm === "npm" ? "install" : "add"} ${normalDeps.join(" ")}`
        const text2 = `${pm} ${pm === "npm" ? "install" : "add"} ${devDeps.join(" ")} -D`

        try {
            if (normalDeps.length > 0) {
                await execa(pm, [
                    pm === "npm" ? "install" : "add",
                    ...normalDeps,
                ])
            }
            if (devDeps.length > 0) {
                await execa(pm, [
                    pm === "npm" ? "install" : "add",
                    ...devDeps,
                    "-D"
                ])
            }
        } catch (e) {
            logger.error("\n An error occurred while installing dependencies.")
        }

        logger.info("\nYou can copy and paste the following script to install dependencies manually: ")
        logger.info("---")
        logger.text(text)
        if (devDeps.length > 0) {
            logger.info("---")
            logger.text(text2)
        }
        logger.info("---")

        spinner.succeed()
    } else {
        logger.warn("Dependencies already installed.")
    }
    return ""
}

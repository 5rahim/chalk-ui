import { getPackageManager } from "@/src/utils/package"
import { logger } from "@/src/utils/logger"
import { execa } from "execa"
import ora from "ora"
import path from "path"
import fs from "fs-extra"

export type DependencyDef = string[];

export const mainDependencies: DependencyDef[] = [
    ["class-variance-authority", "^0.6.1", ""],
    ["react-aria", "^3.26.0", ""],
    ["lodash", "^4.17.21", ""],
    ["@types/lodash", "^4.14.195", "-D"],
    ["tailwindcss-animate", "latest", ""],
    ["clsx", "^1.2.1", ""],
    ["tailwind-merge", "^1.13.2", ""]
]
export type AvailableDependencies = keyof typeof mainDependencies;

export const script_installDependencies = async (arr: string[][], install: boolean = true) => {
    if (arr.length > 0) {
        const pm = getPackageManager()
        const normalDeps = arr.filter(n => n[2] === "").map(a => a[0] + "@" + a[1].replace("^", ""))
        const devDeps = arr.filter(n => n[2] === "-D").map(a => a[0] + "@" + a[1].replace("^", ""))
        const text = `${pm} ${pm === "npm" ? "install" : "add"} ${normalDeps.join(" ")}`
        const text2 = `${pm} ${pm === "npm" ? "install" : "add"} ${devDeps.join(" ")} -D`

        if (install) {
            const spinner = ora(`Installing dependencies...`).start()
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
            spinner.succeed()

            logger.info("\nYou can copy and paste the following script to install dependencies manually: ")
            logger.info("---")
            logger.text(text)
            if (devDeps.length > 0) {
                logger.info("---")
                logger.text(text2)
            }
            logger.info("---")
        } else {

            // Write to package.json

            const packageJsonPath = path.join("package.json")

            const packageJson = fs.readFileSync(packageJsonPath, "utf8")
            const parsedPackageJson = JSON.parse(packageJson)

            // Add the new dependencies to the package.json file
            arr.forEach((dependency) => {
                const name = dependency[0]
                const version = dependency[1]
                const dev = dependency[2] === "-D"

                if (dev) {
                    parsedPackageJson.devDependencies[name] = version
                } else {
                    parsedPackageJson.dependencies[name] = version
                }
            })

            // Write the updated package.json file
            fs.writeFileSync(packageJsonPath, JSON.stringify(parsedPackageJson, null, 2), "utf8")

        }

    } else {
        logger.warn("Dependencies already installed.")
    }
    return ""
}

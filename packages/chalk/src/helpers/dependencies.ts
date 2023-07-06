import { getPackageManager } from "@/src/utils/package"
import { logger } from "@/src/utils/logger"
import { execa } from "execa"
import ora from "ora"
import path from "path"
import fs from "fs-extra"
import chalk from "chalk"

export type DependencyDef = string[];

export const script_installDependencies = async (arr: string[][], install: boolean = true, name: string = ``) => {

    const writePackageJSON = () => {
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

    if (arr.length > 0) {
        const pm = getPackageManager()
        const normalDeps = arr.filter(n => n[2] === "").map(a => a[0] + "@" + a[1].replace("^", ""))
        const devDeps = arr.filter(n => n[2] === "-D").map(a => a[0] + "@" + a[1].replace("^", ""))
        const text = `${pm} ${pm === "npm" ? "install" : "add"} ${normalDeps.join(" ")}`
        const text2 = `${pm} ${pm === "npm" ? "install" : "add"} ${devDeps.join(" ")} -D`

        if (install) {
            const spinner = ora(`Installing ${name ?? "the"} dependencies...`).start()
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
                logger.error("\nAn error occurred while installing dependencies.")
                // Write to package.json
                writePackageJSON()
            }
            spinner.succeed()
        } else {

            // Write to package.json
            writePackageJSON()

        }

    } else {
        console.log(`\n${chalk.italic(chalk.dim("No dependencies to install."))}`)
    }
}

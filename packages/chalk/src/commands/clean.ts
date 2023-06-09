import prompts from "prompts"
import process from "process"
import ora from "ora"
import { getComponentDependencyListFromPackage, getPackageInfo, getPackageManager } from "@/src/utils/package"
import { execa } from "execa"
import path from "path"
import { existsSync, promises as fs } from "fs"
import { logger } from "@/src/utils/logger"
import { Command } from "commander"
import { getProjectInfo } from "@/src/helpers/project"

export const clean = new Command()
    .name("clean")
    .action(async () => {

        const projectInfo = await getProjectInfo()
        const packageInfo = await getPackageInfo()
        const packageManager = getPackageManager()

        const { proceed } = await prompts({
            type: "confirm",
            name: "proceed",
            message: "Running this command will delete component files and remove their dependencies. Proceed?",
            initial: false,
        })

        if (!proceed) process.exit(0)

        const spinner = ora(`Uninstalling component dependencies...`).start()

        // Get only component dependencies that are installed in the project
        let deps = getComponentDependencyListFromPackage()


        // DEVNOTE - Dev only
        if (packageInfo.name === "@rahimstack/chalk-ui") {
            deps = deps.filter(n => !n?.includes("zod") && !n?.includes("lodash"))
        }

        if (deps.length > 0) {
            await execa(packageManager, [
                packageManager === "npm" ? "uninstall" : "remove",
                ...deps,
            ])
        }

        spinner.succeed()

        // Prompt for components and hooks directories
        const { dir } = await prompts([
            {
                type: "text",
                name: "dir",
                message: "Where are your components located?",
                initial: projectInfo?.srcDir ? "./src/components/ui" : "./components/ui",
            },
        ])

        const spinner2 = ora(`Removing components...`).start()

        // Delete directory if it exists.
        const componentDir = path.resolve(dir)
        if (existsSync(componentDir)) {
            await fs.rm(componentDir, { recursive: true }) // ./src/components/ui
        }

        spinner2.succeed()

        logger.success("\n✔ Project cleaned.")

    })

import { Command } from "commander"

import { defaultUIFolder } from "../info"
import { logger } from "../utils/logger"
import prompts from "prompts"
import { getAvailableComponentDependencyListFromDir, getAvailableComponents } from "../helpers/components"
import process from "process"
import _ from "lodash"
import ora from "ora"
import execa from "execa"
import path from "path"
import { existsSync, promises as fs } from "fs"
import { getProjectInfo } from "../helpers/project"
import { getPackageInfo, getPackageManager } from "../utils/package"
import chalk from "chalk"

export const remove = new Command()
    .name("remove")
    .description("Remove UI components.")
    .argument("[components...]", "name of components")
    .action(async (components: string[]) => {

        const packageInfo = await getPackageInfo()
        const projectInfo = await getProjectInfo()
        const packageManager = getPackageManager()

        logger.warn("Make sure you have committed your changes before proceeding.")
        logger.warn("")

        // Allows the user to skip confirmation prompts
        const { proceed } = await prompts({
            type: "confirm",
            name: "proceed",
            message: "Running this command will overwrite some existing files. Proceed?",
            initial: false,
        })

        if (!proceed) process.exit(0)

        const { dir, depUnProceed } = await prompts([
            {
                type: "text",
                name: "dir",
                message: "Where are your components located?",
                initial: projectInfo?.srcDir ? defaultUIFolder : "./components/ui",
            },
            {
                type: "confirm",
                name: "depUnProceed",
                message: `Do you want to uninstall the associated dependencies? ${chalk.dim(chalk.italic("This will not remove shared dependencies."))}`,
                initial: true,
            }
        ])

        // Get available components
        const availableComponents = getAvailableComponents()
        const installedComponentDependencies = await getAvailableComponentDependencyListFromDir(dir)

        if (!availableComponents?.length) {
            logger.error("An error occurred while fetching components. Please try again.",)
            process.exit(0)
        }

        // Filter selected components from the parameters
        let selectedComponents = availableComponents.filter((component) => components.includes(component.component))

        if (!selectedComponents?.length) {
            logger.warn("No components selected.")
            process.exit(0)
        }


        const selectedComponentDependencies = _.flatten(selectedComponents.map(n => _.flatten(n.dependencies?.map(o => o[0]))))

        // Remove dependencies
        if (depUnProceed) {
            const spinner = ora(`Uninstalling dependencies...`).start()
            // Get dependencies that are used by the components we will remove
            let dependenciesToRemove = _.intersection(installedComponentDependencies, selectedComponentDependencies)

            // Unused dependencies, meaning dependencies ONLY used by the components we will remove
            // This basically filters out dependencies that are used by other components
            const dependencyCounts = _.countBy(installedComponentDependencies)
            let unusedDependencies = _.filter(dependenciesToRemove, (dependency) => dependencyCounts[dependency] === 1)

            // DEVNOTE - Dev only
            if (packageInfo.name === "@rahimstack/chalk-ui") {
                unusedDependencies = unusedDependencies.filter(n => !n?.includes("zod") && !n?.includes("lodash"))
            }

            if (unusedDependencies.length > 0) {
                await execa(packageManager, [
                    packageManager === "npm" ? "uninstall" : "remove",
                    ...unusedDependencies,
                ])
            }
            spinner.succeed()
        }

        const spinner = ora(`Removing components...`).start()

        for (const component of selectedComponents) {
            // Delete directory if it exists.
            const componentDir = path.resolve(dir + "/" + component.component)
            if (existsSync(componentDir)) {
                await fs.rm(componentDir, { recursive: true }) // ./src/components/ui/xxx
            }
        }

        spinner.succeed()

        logger.success("\n✔ Component(s) removed.")

    })

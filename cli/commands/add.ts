import { Command } from "commander"
import path from "path"
import { defaultUIFolder } from "../info"
import { handleError } from "../utils/error"
import { logger } from "../utils/logger"
import prompts from "prompts"
import { getAvailableComponents } from "../helpers/components"
import process from "process"
import { script_addComponents } from "../helpers/add-components"
import { script_installDependencies } from "../helpers/dependencies"
import { promptForComponents } from "../helpers/component-selection"
import { getProjectInfo } from "../helpers/project"
import chalk from "chalk"

export const add = new Command()
    .name("add")
    .description("Add UI components.")
    .argument("[components...]", "name of components")
    .option(
        "-c, --cwd <cwd>",
        "the working directory. defaults to the current directory.",
        process.cwd()
    )
    .action(async (components: string[], options) => {

        try {
            const cwd = path.resolve(options.cwd)

            const projectInfo = await getProjectInfo()

            logger.warn("Make sure Chalk UI is already initialized.")
            logger.warn("Make sure you have committed your changes before proceeding.")
            logger.warn("")

            const { dir, willInstall } = await prompts([
                {
                    type: "text",
                    name: "dir",
                    message: "Where are your components located?",
                    initial: projectInfo?.srcDir ? defaultUIFolder : "./components/ui",
                },
                {
                    type: "confirm",
                    name: "willInstall",
                    message: `Do you want to run the ${chalk.cyanBright("install")} command?`,
                    initial: true,
                }
            ])

            // Get available components
            const availableComponents = await getAvailableComponents()
            if (!availableComponents?.length) {
                logger.error("An error occurred while fetching components. Please try again.",)
                process.exit(0)
            }

            // Filter selected components from the parameters
            let selectedComponents = availableComponents.filter((component) => components.includes(component.component))

            // If nothing was passed as parameter, prompt for components to add
            if (!selectedComponents?.length) {
                selectedComponents = await promptForComponents(availableComponents)
            }

            if (!selectedComponents?.length) {
                logger.warn("No components selected.")
                process.exit(0)
            }

            logger.warn("")

            logger.success(`Writing components...`)

            // Write components
            const dependenciesToInstall = await script_addComponents({ components: selectedComponents, projectInfo, componentDestination: dir })
            // Install dependencies
            await script_installDependencies(dependenciesToInstall, willInstall, undefined, cwd)

            logger.success("\n✔ Component(s) added.")
        } catch (e) {
            handleError(e)
        }

    })

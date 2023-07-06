import { Command } from "commander"
import { logger } from "@/src/utils/logger"
import prompts from "prompts"
import { getAvailableComponents } from "@/src/helpers/components"
import process from "process"
import { script_addComponents } from "@/src/helpers/add-components"
import { script_installDependencies } from "@/src/helpers/dependencies"
import { promptForComponents } from "@/src/helpers/component-selection"
import { getProjectInfo } from "@/src/helpers/project"
import chalk from "chalk"

export const add = new Command()
    .name("add")
    .description("Add UI components.")
    .argument("[components...]", "name of components")
    .action(async (components: string[]) => {

        const projectInfo = await getProjectInfo()

        logger.warn("Make sure Chalk UI is already initialized.")
        logger.warn("Make sure you have committed your changes before proceeding.")
        logger.warn("")

        const { dir, willInstall } = await prompts([
            {
                type: "text",
                name: "dir",
                message: "Where are your components located?",
                initial: projectInfo?.srcDir ? "./src/components/ui" : "./components/ui",
            },
            {
                type: "confirm",
                name: "willInstall",
                message: `Do you want to run the ${chalk.cyanBright("install")} command?`,
                initial: true,
            }
        ])

        // Get available components
        const availableComponents = getAvailableComponents()
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
        await script_installDependencies(dependenciesToInstall, willInstall)

        logger.success("\n✔ Component(s) added.")

    })

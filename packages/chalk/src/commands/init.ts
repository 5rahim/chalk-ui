import { Command } from "commander"
import { logger } from "@/src/utils/logger"
import prompts from "prompts"
import process from "process"
import { existsSync, promises as fs } from "fs"
import path from "path"
import ora from "ora"
import { STYLES, TAILWIND_CONFIG } from "@/src/templates/files"
import { getAvailableComponents } from "@/src/helpers/components"
import { DependencyDef, script_installDependencies } from "@/src/helpers/dependencies"
import chalk from "chalk"
import { getProjectInfo } from "@/src/helpers/project"
import { promptForComponents } from "@/src/helpers/component-selection"
import { script_addComponents } from "@/src/helpers/add-components"

const ChalkASCII = `       _           _ _    
      | |         | | |   
   ___| |__   __ _| | | __
  / __| '_ \\ / _\` | | |/ /
 | (__| | | | (_| | |   < 
  \\___|_| |_|\\__,_|_|_|\\_\\
                          `

export const mainDependencies: DependencyDef[] = [
    ["class-variance-authority", "^0.6.1", ""],
    ["react-aria", "^3.26.0", ""],
    ["lodash", "^4.17.21", ""],
    ["@types/lodash", "^4.14.195", "-D"],
    ["tailwindcss-animate", "latest", ""],
    ["clsx", "^1.2.1", ""],
    ["tailwind-merge", "^1.13.2", ""]
]
export type MainDependencies = keyof typeof mainDependencies;

export const init = new Command()
    .name("init")
    .description("Configure the project with the UI Library.")
    .option("-y, --yes", "Skip confirmation prompt.")
    .option("--all", "Skip component selection.")
    .action(async (options) => {

        const projectInfo = await getProjectInfo()

        // Print ASCII
        console.log(chalk.dim(ChalkASCII))

        logger.warn("Make sure your project meets all prerequisites.")
        logger.warn("Make sure you have committed your changes before proceeding.")
        logger.warn("")

        // Allows the user to skip confirmation prompts
        if (!options.yes) {
            // First confirmation prompt
            const { proceed } = await prompts({
                type: "confirm",
                name: "proceed",
                message: "Running this command will overwrite some existing files. Proceed?",
                initial: true,
            })

            if (!proceed) process.exit(0)
        }


        const config = await prompts([
            {
                type: "text",
                name: "tailwindCssDir",
                message: `In what directory is ${chalk.cyanBright("globals.css")} located?`,
                initial: projectInfo?.srcDir ? "./src/styles" : "./styles"
            },
            {
                type: "text",
                name: "tailwindConfig",
                message: `Where is ${chalk.cyanBright("tailwind.config.js")} located?`,
                initial: "./tailwind.config.js",
            },
            {
                type: "text",
                name: "componentDestination",
                message: "Where would you like to add the components?",
                initial: projectInfo?.srcDir ? "./src/components/ui" : "./components/ui",
            },
            {
                type: "confirm",
                name: "willInstall",
                message: `Do you want to run the ${chalk.cyanBright("install")} command?`,
                initial: true,
            }
        ])

        if (existsSync(path.resolve(config.componentDestination))) {
            console.log(`\n${chalk.red(chalk.bold("Oops!"))} It looks like ${chalk.magentaBright("Chalk UI")} has already been initialized.`)
            console.log(chalk.dim(`If it is not the case, please delete your ${chalk.italic(config.componentDestination)} folder.\n`))
            process.exit(0)
        }


        const stylesDestination = config.tailwindCssDir + "/globals.css"

        // Ensure styles directory exists
        const stylesDir = config.tailwindCssDir
        if (!existsSync(path.resolve(stylesDir))) {
            await fs.mkdir(path.resolve(stylesDir), { recursive: true })
        }
        const stylesSpinner = ora(`Adding styles...`).start()
        // Update or create globals.css
        await fs.writeFile(stylesDestination, STYLES, "utf8")
        stylesSpinner.succeed()

        // Update tailwind config
        const tailwindDestination = config.tailwindConfig
        const tailwindSpinner = ora(`Updating ${chalk.italic(`tailwind.config.js`)}...`).start()
        await fs.writeFile(tailwindDestination, TAILWIND_CONFIG(projectInfo?.srcDir), "utf8")
        tailwindSpinner.succeed()

        // Create componentPath directory if it doesn't exist.
        const componentDir = path.resolve(config.componentDestination)
        if (!existsSync(componentDir)) {
            const spinner = ora(`Creating ${chalk.italic(config.componentDestination)} folder...`).start()
            await fs.mkdir(componentDir, { recursive: true }) // ./src/components/ui/
            spinner.succeed()
        }

        logger.info("")

        /* -------------------------------------------------------------------------------------------------
         * Add components
         * -----------------------------------------------------------------------------------------------*/

        // Get available components
        const availableComponents = getAvailableComponents()

        if (!availableComponents?.length) {
            logger.error("An error occurred while fetching components. Please try again.")
            process.exit(0)
        }

        // By default, set selected components as all available components
        let selectedComponents = availableComponents

        if (options.all) {
            // Do nothing
        } else {
            // Prompt for components if no "--all" option
            selectedComponents = await promptForComponents(availableComponents)
        }

        logger.success("Writing components...")

        const dependenciesToInstall = await script_addComponents({
            components: selectedComponents,
            componentDestination: config.componentDestination,
            projectInfo,
        })


        // Install main dependencies
        await script_installDependencies(mainDependencies, config.willInstall, "main")
        // Install component dependencies
        await script_installDependencies(dependenciesToInstall, config.willInstall, "component")

        logger.success("\n✔ Chalk UI was successfully initialized.")

    })

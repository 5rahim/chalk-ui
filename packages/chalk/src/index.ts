#!/usr/bin/env node
import { Component, getAvailableComponents, script_addComponents } from "@/src/helpers/components"
import { mainDependencies, script_installDependencies } from "@/src/helpers/dependencies"
import { getProjectInfo } from "@/src/helpers/project"
import { createJSONSnapshot } from "@/src/helpers/snapshot"
import { STYLES, TAILWIND_CONFIG } from "@/src/templates/files"
import { logger } from "@/src/utils/logger"
import { getInstalledComponentDependencyList, getPackageInfo, getPackageManager } from "@/src/utils/package"
/**/
import _ from "lodash"
import { Command } from "commander"
import { execa } from "execa"
import { existsSync, mkdirSync, promises as fs, writeFileSync } from "fs"
import ora from "ora"
import path from "path"
import * as process from "process"
import prompts from "prompts"

// TODO Add "remove" option, refactor "add" option
// TODO Dev dependencies (@types/lodash)

async function main() {
    const packageInfo = await getPackageInfo()
    const projectInfo = await getProjectInfo()
    const packageManager = getPackageManager()

    const program = new Command()
        .name("@rahimstack/chalk-ui")
        .description("React and Tailwind components")
        .version(
            packageInfo.version || "1.0.0",
            "-v, --version",
            "display the version number",
        )

    /**
     * @internal
     */
    program.command("snapshot")
        .description("Copy files and directories under \"./src/\" and transform them into JSON format.")
        .action(() => {

            // Create the "snapshot" directory if it doesn't exist
            const snapshotDir = path.resolve("snapshot")
            if (!existsSync(snapshotDir)) {
                mkdirSync(snapshotDir)
            }

            // Generate the timestamp for the snapshot file name
            const timestamp = new Date().toISOString().replace(/:/g, "-")
            const snapshotFilename = `snapshot_${timestamp}.json`
            const snapshotPath = path.join(snapshotDir, snapshotFilename)

            const jsonData = createJSONSnapshot()
            const jsonOutput = JSON.stringify(jsonData.filter(n => n.name.length > 0), null, 2)
            writeFileSync(snapshotPath, jsonOutput)
            logger.info(`Snapshot created: ${snapshotFilename}`)
        })

    program.command("clean")
        .action(async () => {

            const spinner = ora(`Uninstalling component dependencies...`).start()

            // Get only component dependencies that are installed in the project
            let installedDependencies = getInstalledComponentDependencyList()

            // FIXME ONLY FOR TEST
            installedDependencies = installedDependencies.filter(n => !n?.includes("zod") && !n?.includes("lodash"))

            if (installedDependencies.length > 0) {
                await execa(packageManager, [
                    packageManager === "npm" ? "uninstall" : "remove",
                    ...installedDependencies,
                ])
            }

            spinner.succeed()

            // Prompt for components and hooks directories
            const componentDestination = await promptForComponentDestination() // prompt for ui dir

            const spinner2 = ora(`Removing components...`).start()

            // Delete directory if it exists.
            const componentDir = path.resolve(componentDestination)
            if (existsSync(componentDir)) {
                await fs.rmdir(componentDir, { recursive: true }) // ./src/components/ui
            }

            spinner2.succeed()

        })

    program
        .command("init")
        .description("Configure the project with the UI Library.")
        .option("-y, --yes", "Skip confirmation prompt.")
        .option("--all", "Skip component selection.")
        .action(async (options) => {
            logger.warn("Make sure your project is already configured with Tailwind.")
            logger.warn("")

            // Allows the user to skip confirmation prompts
            if (!options.yes) {
                // First confirmation prompt
                const { proceed } = await prompts({
                    type: "confirm",
                    name: "proceed",
                    message: "Running this command will install dependencies and overwrite your existing tailwind.config.js. Proceed?",
                    initial: true,
                })

                if (!proceed) process.exit(0)
            }

            // 1. Install main dependencies.
            const dependenciesSpinner = ora(`Installing dependencies... (${packageManager})`).start()
            await script_installDependencies(mainDependencies)
            dependenciesSpinner.succeed()

            // 2. Ensure styles directory exists. (Only for non-appDir apps)
            if (!projectInfo?.appDir) {
                const stylesDir = projectInfo?.srcDir ? "./src/styles" : "./styles"
                if (!existsSync(path.resolve(stylesDir))) {
                    await fs.mkdir(path.resolve(stylesDir), { recursive: true })
                }
            }

            // 3. Update or create globals.css
            let stylesDestination = "./src/styles/globals.css"
            if (projectInfo?.appDir) {
                stylesDestination = projectInfo?.srcDir ? "./src/app/globals.css" : "./app/globals.css"
            }
            const stylesSpinner = ora(`Adding styles...`).start()
            await fs.writeFile(stylesDestination, STYLES, "utf8")
            stylesSpinner.succeed()
            // ----

            // 4. Update tailwind config
            const tailwindDestination = "./tailwind.config.js"
            const tailwindSpinner = ora(`Updating tailwind.config.js...`).start()
            await fs.writeFile(tailwindDestination, TAILWIND_CONFIG, "utf8")
            tailwindSpinner.succeed()
            // ----

            // 5. Prompt for components and hooks directories
            const componentDestination = await promptForComponentDestination() // prompt for ui dir

            // 6. Create componentPath directory if it doesn't exist.
            const componentDir = path.resolve(componentDestination)
            if (!existsSync(componentDir)) {
                const spinner = ora(`Creating ${componentDestination}...`).start()
                await fs.mkdir(componentDir, { recursive: true }) // ./src/components/ui/
                spinner.succeed()
            }

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

            logger.success(`Writing components...`)

            const dependenciesToInstall = await script_addComponents({ components: selectedComponents, projectInfo, componentDestination })

            await script_installDependencies(dependenciesToInstall)


        })

    program
        .command("add")
        .description("Add UI components")
        .argument("[components...]", "name of components")
        .action(async (components: string[]) => {
            logger.warn("Running the following command will overwrite existing files.")
            logger.warn("Make sure you have committed your changes before proceeding.")
            logger.warn("")

            // 1. Get available components
            const availableComponents = getAvailableComponents()

            if (!availableComponents?.length) {
                logger.error("An error occurred while fetching components. Please try again.",)
                process.exit(0)
            }

            // 2. Filter selected components from the parameters
            let selectedComponents = availableComponents.filter((component) => components.includes(component.component))

            // 3. If nothing was passed as parameter, prompt for components to add
            if (!selectedComponents?.length) {
                selectedComponents = await promptForComponents(availableComponents)
            }

            if (!selectedComponents?.length) {
                logger.warn("No components selected.")
                process.exit(0)
            }

            logger.warn("Run the 'init' command first if you haven't. Add components in the same folder where the core directory is located.")
            logger.warn("")

            // 4. Ask for destination
            const componentDestination = await promptForComponentDestination()

            logger.success(`Writing components...`)

            // 5. Write components
            const dependenciesToInstall = await script_addComponents({ components: selectedComponents, projectInfo, componentDestination })

            // 6. Install dependencies
            await script_installDependencies(dependenciesToInstall)

        })

    program
        .command("remove")
        .description("Remove UI components")
        .argument("[components...]", "name of components")
        .action(async (components: string[]) => {
            logger.warn("Running the following command will overwrite existing files.")
            logger.warn("Make sure you have committed your changes before proceeding.")
            logger.warn("")

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

            const { proceed } = await prompts({
                type: "confirm",
                name: "proceed",
                message: "Running this command will delete component files. Proceed?",
                initial: false,
            })

            if (!proceed) process.exit(0)


            const { proceed: depUnProceed } = await prompts({
                type: "confirm",
                name: "proceed",
                message: "Do you want to uninstall the components' dependencies? This can likely uninstall shared dependencies",
                initial: false,
            })

            if (depUnProceed) {
                const spinner = ora(`Uninstalling dependencies...`).start()
                // Get only component dependencies that are installed in the project
                let installedDependencies = _.intersection(getInstalledComponentDependencyList(), _.flatten(selectedComponents.map(n => _.flatten(n.dependencies))))

                // FIXME ONLY FOR TEST
                installedDependencies = installedDependencies.filter(n => !n?.includes("zod") && !n?.includes("lodash"))

                if (installedDependencies.length > 0) {
                    await execa(packageManager, [
                        packageManager === "npm" ? "uninstall" : "remove",
                        ...installedDependencies,
                    ])
                }
                spinner.succeed()
            }


            // Prompt for components and hooks directories
            const componentDestination = await promptForComponentDestination() // prompt for ui dir

            const spinner = ora(`Removing components...`).start()

            for (const component of selectedComponents) {
                // Delete directory if it exists.
                const componentDir = path.resolve(componentDestination + "/" + component.component)
                if (existsSync(componentDir)) {
                    await fs.rmdir(componentDir, { recursive: true }) // ./src/components/ui/xxx
                }
            }

            spinner.succeed()

            logger.success("Components uninstalled")

        })


    program.parse()
}

async function promptForComponents(components: Component[]) {
    const { components: selectedComponents } = await prompts({
        type: "autocompleteMultiselect",
        name: "components",
        message: "Which component(s) would you like to add?",
        hint: "Space to select. A to select all. I to invert selection.",
        instructions: false,
        choices: components.filter(n => n.component !== "core").map((component) => ({
            title: component.name,
            value: component,
        })),
    })

    return selectedComponents
}

async function promptForComponentDestination() {
    const { dir } = await prompts([
        {
            type: "text",
            name: "dir",
            message: "Where would you like to add the component(s)?",
            initial: "./src/components/ui",
        },
    ])

    return dir
}

main()

#!/usr/bin/env node
import { Component, getAvailableComponents } from "@/src/helpers/components"
import { addDependencies, dependencyVersionArray } from "@/src/helpers/dependencies"
import { getProjectInfo } from "@/src/helpers/project"
import { CORE_INDEX, CORE_STYLE_ANATOMY, CORE_STYLE_PROVIDER, STYLES, TAILWIND_CONFIG } from "@/src/templates/files"
import { logger } from "@/src/utils/logger"
import { getPackageInfo, getPackageManager } from "@/src/utils/package"
/**/
import { Command } from "commander"
import { execa } from "execa"
import { existsSync, promises as fs } from "fs"
import ora from "ora"
import path from "path"
import * as process from "process"
import prompts from "prompts"

// TODO Add "remove" option, refactor "add" option

async function main() {
   const packageInfo = await getPackageInfo()
   const projectInfo = await getProjectInfo()
   const packageManager = getPackageManager()
   
   const program = new Command()
      .name("@rahimstack/chalk")
      .description("React and Tailwind components")
      .version(
         packageInfo.version || "1.0.0",
         "-v, --version",
         "display the version number",
      )
   
   program.command("clean")
          .action(async () => {
             const dependenciesSpinner = ora(`Uninstalling dependencies...`).start()
             await execa(packageManager, [
                packageManager === "npm" ? "uninstall" : "remove",
                ...dependencyVersionArray.map(d => d[0]),
             ])
             dependenciesSpinner.succeed()
             
             const dependenciesSpinner2 = ora(`Uninstalling component dependencies...`).start()
             let ud: string[] = []
             const components = await getAvailableComponents()
             for (const component of components) {
                if (component.dependencies?.length && component.dependencies.length > 0) {
                   await execa(packageManager, [
                      packageManager === "npm" ? "uninstall" : "remove",
                      ...component.dependencies.filter(d => !ud.includes(d)),
                   ])
                   component.dependencies.map(d => ud.push(d))
                }
             }
             dependenciesSpinner2.succeed()
          })
   
   program
      .command("init")
      .description("Configure the project with the UI Library.")
      .option("-y, --yes", "Skip confirmation prompt.")
      .option("--all", "Skip component selection.")
      .action(async (options) => {
         logger.warn(
            "Make sure your project is already configured with Tailwind.",
         )
         logger.warn("")
         
         if (!options.yes) {
            const { proceed } = await prompts({
               type: "confirm",
               name: "proceed",
               message: "Running this command will install dependencies and overwrite your existing tailwind.config.js. Proceed?",
               initial: true,
            })
            
            if (!proceed) {
               process.exit(0)
            }
         }
         
         // 2nd prompt
         const { proceed } = await prompts({
            type: "confirm",
            name: "proceed",
            message: "We will install the dependencies needed. Proceed?",
            initial: true,
         })
         
         if (!proceed) {
            process.exit(0)
         }
         
         // Install dependencies.
         const dependenciesSpinner = ora(`Installing dependencies... (${packageManager})`).start()
         await addDependencies(dependencyVersionArray)
         dependenciesSpinner.succeed()
         
         // Ensure styles directory exists.
         if (!projectInfo?.appDir) {
            const stylesDir = projectInfo?.srcDir ? "./src/styles" : "./styles"
            if (!existsSync(path.resolve(stylesDir))) {
               await fs.mkdir(path.resolve(stylesDir), { recursive: true })
            }
         }
         
         // Update globals.css
         let stylesDestination = "./src/styles/globals.css"
         if (projectInfo?.appDir) {
            stylesDestination = projectInfo?.srcDir ? "./src/app/globals.css" : "./app/globals.css"
         }
         const stylesSpinner = ora(`Adding styles with CSS variables...`).start()
         await fs.writeFile(stylesDestination, STYLES, "utf8")
         stylesSpinner.succeed()
         
         // Update tailwind config
         const tailwindDestination = "./tailwind.config.js"
         const tailwindSpinner = ora(`Updating tailwind.config.js...`).start()
         await fs.writeFile(tailwindDestination, TAILWIND_CONFIG, "utf8")
         tailwindSpinner.succeed()
         
         const dir = await promptForDestinationDir() // prompt for ui dir
         
         // Create componentPath directory if it doesn't exist.
         const destinationDir = path.resolve(dir)
         if (!existsSync(destinationDir)) {
            const spinner = ora(`Creating ${dir}...`).start()
            await fs.mkdir(destinationDir, { recursive: true })            // ./src/components/ui/
            await fs.mkdir(destinationDir + "/core", { recursive: true })  // ./src/components/ui/core/
            spinner.succeed()
         }
         
         /**
          * Set up core files
          */
         
         const coreSpinner = ora(`Populating core files...`).start()
         const coreIndexDestination = dir + "/core/index.ts"
         const coreStyleAnatomyDestination = dir + "/core/style-anatomy.ts"
         const coreStyleProviderDestination = dir + "/core/style-provider.tsx"
         await fs.writeFile(coreStyleAnatomyDestination, CORE_STYLE_ANATOMY, "utf8")
         await fs.writeFile(coreStyleProviderDestination, CORE_STYLE_PROVIDER, "utf8")
         await fs.writeFile(coreIndexDestination, CORE_INDEX, "utf8")
         coreSpinner.succeed()
         
         /**
          * Components
          */
            
            // Get available components
         const availableComponents = await getAvailableComponents()
         
         if (!availableComponents?.length) {
            logger.error("An error occurred while fetching components. Please try again.")
            process.exit(0)
         }
         
         let selectedComponents = availableComponents // Set selected components as all
         let installedDependencies: string[] = []
         
         if (options.all) {
            // Do nothing
         } else {
            // Prompt for components if no "--all" option
            selectedComponents = await promptForComponents(availableComponents)
            
            for (const component of selectedComponents) {
               // Insert component's family
               if (component.family?.length && component.family.length > 0) {
                  component.family.filter(n => !selectedComponents.map(s => s.component).includes(n)).map(n => {
                     const comp = availableComponents.filter(c => c.component === n)[0]
                     if (comp) selectedComponents.push(comp)
                  })
               }
            }
         }
         
         logger.success(`Installing ${selectedComponents.length} component(s) and their dependencies...`)
         
         // Write components
         for (const component of selectedComponents) {
            const componentSpinner = ora(`${component.name}...`).start()
            
            // Write the files.
            for (const file of component.files) {
               // Replace alias with the project's alias.
               if (projectInfo?.alias) {
                  file.content = file.content.replace(/@\//g, projectInfo.alias)
               }
               
               let componentDir = file.dir === "." ? dir : (dir + "/" + file.dir) // e.g: ./src/components/ui/xxxxx
               
               if (file.dir) { // Create dir if not exists
                  if (!existsSync(path.resolve(componentDir))) {
                     await fs.mkdir(path.resolve(componentDir), { recursive: true })
                  }
               }
               
               const filePath = path.resolve(componentDir, file.name)
               await fs.writeFile(filePath, file.content) // Write component
            }
            
            // Install dependencies.
            if (component.dependencies?.length && component.dependencies.length > 0) {
               await addDependencies(component.dependencies.filter(d => !installedDependencies.includes(d)))
               component.dependencies.map(d => installedDependencies.push(d))
            }
            componentSpinner.succeed(component.name)
         }
         
      })
   
   program
      .command("add")
      .description("Add UI components")
      .argument("[components...]", "name of components")
      .action(async (components: string[]) => {
         logger.warn("Running the following command will overwrite existing files.")
         logger.warn("Make sure you have committed your changes before proceeding.")
         logger.warn("")
         
         const availableComponents = await getAvailableComponents()
         
         if (!availableComponents?.length) {
            logger.error(
               "An error occurred while fetching components. Please try again.",
            )
            process.exit(0)
         }
         
         let selectedComponents = availableComponents.filter((component) =>
            components.includes(component.component),
         )
         
         if (!selectedComponents?.length) {
            selectedComponents = await promptForComponents(availableComponents)
         }
         
         
         if (!selectedComponents?.length) {
            logger.warn("No components selected.")
            process.exit(0)
         }
         
         logger.warn("Run the 'init' command first and add components in the same folder where the core files are located.")
         logger.warn("")
         
         // Ask for destination
         const { dir } = await prompts([
            {
               type: "text",
               name: "dir",
               message: "Where would you like to add the component(s)?",
               initial: "./src/components/ui",
            },
         ])
         
         logger.success(`Installing ${selectedComponents.length} component(s) and dependencies...`)
         
         // Write components
         for (const component of selectedComponents) {
            const componentSpinner = ora(`${component.name}...`).start()
            
            // Write the files.
            for (const file of component.files) {
               // Replace alias with the project's alias.
               if (projectInfo?.alias) {
                  file.content = file.content.replace(/@\//g, projectInfo.alias)
               }
               
               let componentDir = file.dir === "." ? dir : (dir + "/" + file.dir) // e.g: ./src/components/ui/****
               
               if (file.dir) { // Create dir if not exists
                  if (!existsSync(path.resolve(componentDir))) {
                     await fs.mkdir(path.resolve(componentDir), { recursive: true })
                  }
               }
               
               const filePath = path.resolve(componentDir, file.name)
               await fs.writeFile(filePath, file.content) // Write component
            }
            
            // Install dependencies.
            if (component.dependencies?.length) {
               await addDependencies(component.dependencies)
            }
            componentSpinner.succeed(component.name)
         }
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
      choices: components.map((component) => ({
         title: component.name,
         value: component,
      })),
   })
   
   return selectedComponents
}

async function promptForDestinationDir() {
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

import { Command } from "commander"
import { logger } from "@/src/utils/logger"
import { Component, getAvailableComponents, getInstalledComponents } from "@/src/helpers/components"
import { mergeFileContent } from "@/src/helpers/update-components"
import { script_addComponents } from "@/src/helpers/add-components"
import prompts from "prompts"
import { script_installDependencies } from "@/src/helpers/dependencies"
import { getProjectInfo } from "@/src/helpers/project"
import chalk from "chalk"
import path from "path"
import _ from "lodash"
import fs from "fs"
import { diffLines } from "diff"

export const update = new Command()
    .name("update")
    .description("Update UI components.")
    .action(async () => {

        const projectInfo = await getProjectInfo()

        logger.warn("Make sure you have committed your changes before proceeding.")
        logger.warn("")

        const { proceed } = await prompts({
            type: "confirm",
            name: "proceed",
            message: "Running this command will overwrite some existing files. Proceed?",
            initial: true,
        })

        if (!proceed) process.exit(0)


        const { dir, willInstall, maintainStyling } = await prompts([
            {
                type: "text",
                name: "dir",
                message: "Where are your components located?",
                initial: projectInfo?.srcDir ? "./src/components/ui" : "./components/ui",
            },
            {
                type: "confirm",
                name: "maintainStyling",
                message: "Do you want to maintain your current component styles (anatomy classes)?",
                initial: true,
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
        const installedComponents = await getInstalledComponents(dir)

        console.log("")

        const updatedArr: Component[] = []

        console.log(chalk.italic(chalk.dim("Before updating your components be mindful of breaking changes.\n")))

        for (const installedComponent of installedComponents) { // Go through installed components

            // Find the latest version of the component
            const updatedComponent = availableComponents.find((component) => component.component === installedComponent.component)

            if (updatedComponent && updatedComponent.component !== "core") {

                const updatedFiles: { name: string; dir: string; content: string }[] = []

                for (const updatedFile of updatedComponent.files) { // Go through each file

                    const tempFilePath = path.resolve(dir + `/TEMP_${updatedFile.name}`)

                    const prefix = chalk.bold(chalk.magentaBright(`[${updatedFile.dir}/${updatedFile.name}]:`))

                    const installedFile = installedComponent.files.find(f => f.name === updatedFile.name)

                    // If the file didn't exist before, add it and continue
                    if (!installedFile) {
                        updatedFiles.push({
                            name: updatedFile.name,
                            dir: updatedFile.dir,
                            content: updatedFile.content,
                        })
                        continue
                    }

                    // Keep current anatomy functions intact or overwrite the entire file
                    let content = updatedFile.content
                    if (maintainStyling) {
                        content = mergeFileContent(installedFile.content, updatedFile.content)
                    }

                    // If there is no difference, continue
                    if (_.isEqual(content, installedFile.content)) {
                        console.log(prefix, chalk.dim(`No updates found`))
                        continue
                    }

                    logger.info(`\n` + prefix, chalk.bold(chalk.red("* Action required *")), `Updates found, temporary file created`)
                    console.log(chalk.italic(chalk.dim(tempFilePath)))

                    // Write file
                    await fs.promises.writeFile(tempFilePath, content, { encoding: "utf-8" })

                    while (true) {

                        const { command } = await prompts([
                            {
                                type: "select",
                                name: "command",
                                message: `What do you want to do?`,
                                choices: [
                                    { title: "Merge", value: "merge" },
                                    { title: "Skip", value: "skip" },
                                    { title: "Show diff", value: "diff" },
                                ],
                                initial: 1,
                            },
                        ])

                        if (command === "merge") {

                            const finalContent = await fs.promises.readFile(tempFilePath, "utf8")

                            updatedFiles.push({
                                name: installedFile.name,
                                dir: installedFile.dir,
                                content: finalContent,
                            })
                            logger.success("✔ File merged\n")
                            await fs.promises.rm(tempFilePath)
                            break

                        } else if (command === "skip") {
                            logger.success("✔ File ignored\n")
                            await fs.promises.rm(tempFilePath)
                            break
                        } else if (command === "diff") {
                            console.log("")
                            logger.info("\\/--------------------------\\/")
                            const patch = diffLines(installedFile.content, content)
                            patch.forEach((part) => {
                                if (part) {
                                    if (part.added) {
                                        return process.stdout.write(chalk.green(part.value))
                                    }
                                    if (part.removed) {
                                        return process.stdout.write(chalk.redBright(part.value))
                                    }

                                    return process.stdout.write(chalk.gray(part.value))
                                }
                            })
                            logger.info("/\\--------------------------/\\")
                            console.log("")
                        } else {
                            await fs.promises.rm(tempFilePath)
                            break
                        }

                    }
                }

                const finalComponent: Component = {
                    component: installedComponent.component,
                    name: installedComponent.name,
                    dependencies: updatedComponent.dependencies,
                    family: updatedComponent.family,
                    files: updatedFiles,
                }

                updatedArr.push(finalComponent)

            }
        }

        console.log("")

        if (updatedArr.length > 0) {

            logger.success("Updating components...")

            const dependenciesToInstall = await script_addComponents({
                components: updatedArr,
                projectInfo,
                componentDestination: dir,
                isUpdating: true
            })

            // Install dependencies
            await script_installDependencies(dependenciesToInstall, willInstall)
        }

        logger.success("\n✔ Component(s) updated.")

    })

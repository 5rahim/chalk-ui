import { promises as fs, statSync } from "fs"
import path from "path"
import * as process from "process"
import { DependencyDef } from "@/src/helpers/dependencies"
import _ from "lodash"
import { exists } from "fs-extra"
import { mainDependencies } from "@/src/commands/init"

type FileData = {
    name: string;
    dir: string;
    content: string;
}

type DirectoryData = {
    component: string
    files: FileData[]
    name: string
    dependencies: DependencyDef[]
    family: string[]
}

function addCommentToContent(content: string, filename: string, date: string): string {
    const comment = `/**
 * Chalk UI - ${filename}
 *
 * @author 5rahim, https://github.com/5rahim/
 * @updated ${date}
 *
 */\n\n`

    // return comment + content
    return content
}

export async function createJSONSnapshot(_srcPath?: string, _packageJsonPath?: string): Promise<DirectoryData[]> {
    const srcPath = _srcPath ?? path.resolve("../../apps/workshop/src/components/ui")
    const packageJsonPath = _packageJsonPath ?? path.resolve("../../apps/workshop/package.json")

    const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8")

    if (!await exists(srcPath) || !await exists(packageJsonPath)) {
        console.error("Source directory or package.json does not exist.")
        process.exit(1)
    }

    const directories: any[] = [] // All components

    async function traverseDirectory(dirPath: string, componentName: string) {
        // Get all the files/directories in the path
        const files = await fs.readdir(dirPath)

        // Format of the snapshot
        let directoryData: DirectoryData = {
            component: componentName,
            name: componentName.charAt(0).toUpperCase() + _.camelCase(componentName).slice(1),
            dependencies: [],
            family: [],
            files: [],
        }

        // For each file/directory
        for (const file of files) {
            const filePath = path.join(dirPath, file) // Get path
            const stats = statSync(filePath) // Get info

            if (stats.isDirectory()) { // If it is a directory
                await traverseDirectory(filePath, file) // Traverse the directory (recursive)
            } else if (stats.isFile()) { // If it is a file

                const content = await fs.readFile(filePath, "utf8") // Get the content

                /**
                 * Populate family
                 */
                const family = findRelativeImports(content)
                family.map((f) => {
                    if (!directoryData.family.includes(f) && f !== "core" && f !== componentName) {
                        directoryData.family.push(f)
                    }
                })

                /**
                 * Populate dependencies
                 */
                const dependencies = extractComponentDependencies(content, packageJsonContent)
                dependencies.map(d => {
                    if (!directoryData.dependencies.map((n: any) => n[0]).includes(d[0])) {
                        directoryData.dependencies.push(d)
                    }
                })

                /**
                 * Populate files
                 */
                const transformedContent = addCommentToContent(content, componentName + "/" + file, new Date().toDateString()) // Rewrite it
                const fileData: FileData = {
                    name: file,
                    dir: componentName,
                    content: !file.includes("json") ? transformedContent : content,
                }

                directoryData.files.push(fileData)

            }
        }

        directories.push(directoryData) // Push component
    }

    await traverseDirectory(srcPath, "")

    return directories
}


/* -------------------------------------------------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------------------------------------------*/

/**
 * This is used to get shared, used components
 */
function findRelativeImports(fileContent: string): string[] {
    const importPattern = /from\s+['"]\.\.\/([a-zA-Z0-9-]+)['"]/g
    const imports: string[] = []

    let match: RegExpExecArray | null
    while ((match = importPattern.exec(fileContent)) !== null) {
        const importedModule = match[1]
        imports.push(importedModule)
    }

    return imports
}


/**
 * Find dependencies from imports
 * -> ["<name>", "<version>", "<flag>"][]
 */
function findDependencies(fileContent: string): DependencyDef[] {
    const importPattern = /import\s+[^'"]+\s+from\s+['"]([^'"]+)['"]/gmi
    const dependenciesArr: DependencyDef[] = []

    let match: RegExpExecArray | null

    let dependencies: string[] = []

    while ((match = importPattern.exec(fileContent)) !== null) {
        const importedModule = match[1]

        // Ignore base dependencies and react
        const baseDependencies = [...mainDependencies.map(n => n[0])]
        if (!baseDependencies.some(n => n.includes(importedModule)) && importedModule !== "react") {

            let name = importedModule
            // Reformat some dependencies
            // FIXME Find a better way
            if (name.includes("lodash")) name = "lodash"
            if (name.includes("date-fns")) name = "date-fns"
            if (name.includes("recharts")) name = "recharts"
            if (name.includes("@hookform/resolvers")) name = "@hookform/resolvers"

            if (!name.startsWith(".", 0) && !name.startsWith("@/", 0) && !dependencies.includes(name) && !baseDependencies.some(n => n.includes(name))) {
                dependencies.push(name)

                // Include types dependencies
                // FIXME Find a better way
                if (name.includes("dinero")) {
                    dependenciesArr.push(["@types/dinero.js", "^1.9.0", "-D"])
                }
                if (name.includes("@googlemaps")) {
                    dependenciesArr.push(["@types/google.maps", "^3.53.5", "-D"])
                }
            }
        }
    }

    dependencies.map(d => {
        dependenciesArr.push([d, "", ""])
    })

    return dependenciesArr
}

/**
 * Find dependencies from package.json content
 * -> ["<name>", "<version>", "<flag>"][]
 */
function extractComponentDependencies(fileContent: string, packageJsonContent: string): string[][] {
    const dependencies = findDependencies(fileContent)
    const packageJson = JSON.parse(packageJsonContent)

    for (const dependency of dependencies) {
        if (dependency[0] in packageJson.dependencies) {
            dependency[1] = packageJson.dependencies[dependency[0]]
        }
        if (dependency[0] in packageJson.devDependencies) {
            dependency[1] = packageJson.devDependencies[dependency[0]]
            dependency[2] = "-D"
        }
    }

    return dependencies
}

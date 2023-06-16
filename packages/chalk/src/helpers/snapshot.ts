import { existsSync, readdirSync, readFileSync, statSync } from "fs"
import path from "path"
import * as process from "process"
import { DependencyDef, mainDependencies } from "@/src/helpers/dependencies"
import _ from "lodash"

interface FileData {
    name: string;
    dir: string;
    content: string;
}

interface DirectoryData {
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

export function createJSONSnapshot(): DirectoryData[] {
    const srcPath = path.resolve("../../apps/web/src/components/ui")
    const packageJsonPath = path.resolve("../../apps/web/package.json")

    const packageJsonContent = readFileSync(packageJsonPath, "utf-8")

    if (!existsSync(srcPath) || !existsSync(packageJsonPath)) {
        console.error("Source directory or package.json does not exist.")
        process.exit(1)
    }

    const directories: any[] = [] // All components

    function traverseDirectory(dirPath: string, componentName: string) {
        // Get all the files/directories in the path
        const files = readdirSync(dirPath)

        // Format of the snapshot
        let directoryData: DirectoryData = {
            component: componentName,
            name: componentName.charAt(0).toUpperCase() + _.camelCase(componentName).slice(1),
            dependencies: [],
            family: [],
            files: [],
        }

        // For each file/directory
        files.forEach((file) => {
            const filePath = path.join(dirPath, file) // Get path
            const stats = statSync(filePath) // Get info

            if (stats.isDirectory()) { // If it is a directory
                traverseDirectory(filePath, file) // Traverse the directory (recursive)
            } else if (stats.isFile()) { // If it is a file

                const content = readFileSync(filePath, "utf8") // Get the content

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
        })

        directories.push(directoryData) // Push component
    }

    traverseDirectory(srcPath, "")

    return directories
}


/* -------------------------------------------------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------------------------------------------*/

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
            if (name.includes("lodash")) name = "lodash"
            if (name.includes("date-fns")) name = "date-fns"
            if (name.includes("recharts")) name = "recharts"
            if (name.includes("@hookform/resolvers")) name = "@hookform/resolvers"

            if (!name.startsWith(".", 0) && !name.startsWith("@/", 0) && !dependencies.includes(name) && !baseDependencies.some(n => n.includes(name))) {
                dependencies.push(name)

                // Include types dependencies
                if (name.includes("dinero")) {
                    dependencies.push("@types/dinero.js")
                }
            }
        }
    }

    dependencies.map(d => {
        dependenciesArr.push([d, "", ""])
    })

    return dependenciesArr
}

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

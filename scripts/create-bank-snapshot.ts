import { accessSync, constants, promises as fs, statSync } from "fs"
import _ from "lodash"
import path from "path"
import process from "process"
import { DependencyDef, DirectoryData, FileData, mainDependencies } from "../cli/info"

/**
 * This is used to create a snapshot of the components
 */
export async function createBankSnapshot(_srcPath?: string, _packageJsonPath?: string): Promise<DirectoryData[]> {
    const srcPath = _srcPath ?? path.resolve("src/workshop")
    const packageJsonPath = _packageJsonPath ?? path.resolve("package.json")

    const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8")

    try {
        accessSync(srcPath, constants.R_OK)
        accessSync(packageJsonPath, constants.R_OK)
    }
    catch (e) {
        console.error("Component directory or package.json does not exist.")
        process.exit(1)
    }

    const directories: DirectoryData[] = [] // All components

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
            if (file.includes("stories")) continue

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
                const fileData: FileData = {
                    name: file,
                    dir: componentName,
                    content: content,
                }

                directoryData.files.push(fileData)

            }
        }

        directories.push(directoryData) // Push component
    }

    await traverseDirectory(srcPath, "")

    return directories
}

/**
 * This is used to get shared components
 */
function findRelativeImports(fileContent: string): string[] {
    // e.g. `from "../button"`
    const importPattern = /from\s+['"]\.\.\/([a-zA-Z0-9-]+)['"]/g
    const imports: string[] = []

    let match: RegExpExecArray | null
    while ((match = importPattern.exec(fileContent)) !== null) {
        const importedModule = match[1]
        imports.push(importedModule)
    }

    return imports
}

const dependencyCorrections = [
    "lodash",
    "date-fns",
    "recharts",
    "@hookform/resolvers",
]
const devDependencies = [
    {
        dependency: "@googlemaps",
        devDependency: ["@types/google.maps", "^3.54.10", "-D"],
    },
]

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
        if (!baseDependencies.some(n => n.includes(importedModule)) && importedModule !== "react" && !importedModule.includes("next/")) {

            let name = importedModule
            // Reformat some dependencies
            // e.g. "date-fns/addDays" -> "date-fns"
            dependencyCorrections.map(c => {
                if (name.includes(c)) {
                    name = c
                }
            })

            if (!name.startsWith(".", 0) && !name.startsWith("@/",
                0) && !dependencies.includes(name) && !baseDependencies.some(n => n.includes(name))) {
                dependencies.push(name)

                // Include dev dependencies
                for (const devDependency of devDependencies) {
                    if (name.includes(devDependency.dependency)) {
                        dependenciesArr.push(devDependency.devDependency)
                    }
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
function extractComponentDependencies(fileContent: string, packageJsonContent: string): DependencyDef[] {
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

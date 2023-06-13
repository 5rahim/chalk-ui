import { existsSync, readdirSync, readFileSync, statSync } from "fs"
import path from "path"
import * as process from "process"

interface FileData {
    name: string;
    dir: string;
    content: string;
}

interface DirectoryData {
    component: string;
    files: FileData[];
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

    if (!existsSync(srcPath)) {
        console.error("Source directory does not exist.")
        process.exit(1)
    }

    const directories: DirectoryData[] = [] // All components

    function traverseDirectory(dirPath: string, componentName: string) {
        // Get all the files/directories in the path
        const files = readdirSync(dirPath)

        // Format of the snapshot
        const directoryData: DirectoryData = {
            component: componentName,
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


export function TEMP_createJSONBaseSnapshot(): DirectoryData[] {
    const srcPath = path.resolve("../../apps/web/src/components/ui")

    if (!existsSync(srcPath)) {
        console.error("Source directory does not exist.")
        process.exit(1)
    }

    const directories: any[] = [] // All components

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

    function traverseDirectory(dirPath: string, componentName: string) {
        // Get all the files/directories in the path
        const files = readdirSync(dirPath)

        // Format of the snapshot
        let directoryData: any = {
            component: componentName,
            name: "",
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
                const family = findRelativeImports(content)
                family.map((f) => {
                    if (!directoryData.family.includes(f) && f !== "core") {
                        directoryData.family.push(f)
                    }
                })
            }
        })

        directories.push(directoryData) // Push component
    }

    traverseDirectory(srcPath, "")

    return directories
}

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
   
   return comment + content
}

export function createJSONSnapshot(): DirectoryData[] {
   const srcPath = path.resolve("../ui/src")
   
   if (!existsSync(srcPath)) {
      console.error("Source directory \"./src\" does not exist.")
      process.exit(1)
   }
   
   const directories: DirectoryData[] = []
   
   function traverseDirectory(dirPath: string, componentName: string) {
      const files = readdirSync(dirPath)
      
      const directoryData: DirectoryData = {
         component: componentName,
         files: [],
      }
      
      files.forEach((file) => {
         const filePath = path.join(dirPath, file)
         const stats = statSync(filePath)
         
         if (stats.isDirectory()) {
            traverseDirectory(filePath, file)
         } else if (stats.isFile()) {
            const content = readFileSync(filePath, "utf8")
            const transformedContent = addCommentToContent(content, componentName + "/" + file, new Date().toDateString())
            const fileData: FileData = {
               name: file,
               dir: componentName,
               content: !file.includes("json") ? transformedContent : content,
            }
            directoryData.files.push(fileData)
         }
      })
      
      directories.push(directoryData)
   }
   
   traverseDirectory(srcPath, "")
   
   return directories
}

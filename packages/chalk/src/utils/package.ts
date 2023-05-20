import fs from "fs-extra"
import path from "path"
import { type PackageJson } from "type-fest"

export function getPackageInfo() {
   const packageJsonPath = path.join("package.json")
   
   return fs.readJSONSync(packageJsonPath) as PackageJson
}

export function getPackageManager() {
   const userAgent = process.env.npm_config_user_agent
   
   if (!userAgent) {
      return "npm"
   }
   
   if (userAgent.startsWith("yarn")) {
      return "yarn"
   }
   
   if (userAgent.startsWith("pnpm")) {
      return "pnpm"
   }
   
   return "npm"
}

import fs from "fs-extra"
import path from "path"
import { type PackageJson } from "type-fest"
import _ from "lodash"
import { mainDependencies } from "@/src/helpers/dependencies"
import { getAvailableComponentDependencyList } from "@/src/helpers/components"

export function getPackageInfo() {
   const packageJsonPath = path.join("package.json")

   return fs.readJSONSync(packageJsonPath) as PackageJson
}

export function getDependencyListFromPackage() {
   const packageInfo = getPackageInfo()

   const res = !!packageInfo.dependencies ? Object.keys(packageInfo.dependencies) : []
   if (!!packageInfo.devDependencies) {
      Object.keys(packageInfo.devDependencies).map(n => {
         res.push(n)
      })
   }

   return res
}

export function getInstalledComponentDependencyList() {
   const packageJsonDependencies = getDependencyListFromPackage()
   const availableComponentsDependencies = getAvailableComponentDependencyList()

   return _.intersection(_.uniq([...availableComponentsDependencies, ...mainDependencies.map(n => n[0])]), packageJsonDependencies)
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

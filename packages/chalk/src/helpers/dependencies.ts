/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
import { getPackageManager } from "@/src/utils/package"
import { execa } from "execa"

export const dependencyVersionArray = [
   ["@rahimstack/tailwind-utils", "0.3.0"],
   ["class-variance-authority", "^0.6.0"],
   ["react-aria", "^3.24.0"],
]
export type AvailableDependencies = keyof typeof dependencyVersionArray;

export const addDependencies = (arr: string[] | string[][]) => {
   const withVersions = Array.isArray(arr[0])
   const dependencies = (withVersions ? arr.map(a => a[0] + "@" + a[1]) : arr as string[])
   const pm = getPackageManager()
   return execa(pm, [
      pm === "npm" ? "install" : "add",
      ...dependencies,
   ])
   return ""
}

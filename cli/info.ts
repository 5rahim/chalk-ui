export const defaultUIFolder = "./src/components/ui"
export const mainDependencies: DependencyDef[] = [
    ["class-variance-authority", "^0.7.0", ""],
    ["clsx", "^2.1.0", ""],
    ["tailwind-merge", "^2.2.0", ""],
    ["@tailwindcss/typography", "^0.5.10", ""],
    ["@tailwindcss/forms", "^0.5.7", ""],
    ["tailwind-scrollbar-hide", "^1.1.7", ""],
    ["tailwindcss-animate", "^1.0.7", ""],
]
/**
 * e.g. ["@types/dinero.js", "^1.9.0", "-D"]
 */
export type DependencyDef = string[]
export type FileData = {
    /** File name */
    name: string
    /** Directory name */
    dir: string
    /** File content */
    content: string
}
export type DirectoryData = {
    /** Component name (e.g. button) */
    component: string
    /** Component files */
    files: FileData[]
    /** Component name (e.g. Button) */
    name: string
    /** Component dependencies */
    dependencies: DependencyDef[]
    /** Component family */
    family: string[]
}

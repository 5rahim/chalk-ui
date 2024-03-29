import fs from "fs"
import path from "path"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"
import { Bank } from "../src/bank"

const fileCache: { [filePath: string]: string } = {};

export function rehypeComponent() {
    return async (tree: any) => {
        visit(tree, (node: any) => {
            // src prop overrides both name and fileName.
            const { value: srcPath } =
            (getNodeAttributeByName(node, "src") as {
                name: string
                value?: string
                type?: string
            }) || {}

            if (node.name === "ComponentSource") {
                const name = getNodeAttributeByName(node, "name")?.value as string
                const fileName = getNodeAttributeByName(node, "fileName")?.value as
                    | string
                    | undefined

                if (!name && !srcPath) {
                    return null
                }

                try {
                    let src: string

                    if (srcPath) {
                        src = srcPath
                    } else {
                        const component = Bank[name]
                        src = fileName
                            ? component.files.find((file: string) => {
                            return (
                                file.endsWith(`/${fileName}.tsx`) ||
                                file.endsWith(`/${fileName}.ts`)
                            )
                        }) || component.files[0]
                            : component.files[0]
                    }

                    // Read the source file.
                    const filePath = path.join(process.cwd(), src)
                    let source
                    if (!fileCache[filePath]) {
                        source = fs.readFileSync(filePath, "utf8")
                        fileCache[filePath] = source
                    } else {
                        source = fileCache[filePath]
                    }

                    source = source.replaceAll(
                        `@/workshop/`,
                        "@/components/ui/",
                    )
                    source = source.replaceAll("export default", "export")

                    // Add code as children so that rehype can take over at build time.
                    node.children?.push(
                        u("element", {
                            tagName: "pre",
                            properties: {
                                __src__: src,
                            },
                            children: [
                                u("element", {
                                    tagName: "code",
                                    properties: {
                                        className: ["language-tsx"],
                                    },
                                    children: [
                                        {
                                            type: "text",
                                            value: source,
                                        },
                                    ],
                                }),
                            ],
                        }),
                    )
                }
                catch (error) {
                    console.error(error)
                }
            }

            if (node.name === "ComponentAnatomy") {
                const name = getNodeAttributeByName(node, "name")?.value as string
                const fileName = name
                // const fileName = getNodeAttributeByName(node, "fileName")?.value as
                //     | string
                //     | undefined

                if (!name && !srcPath) {
                    return null
                }

                try {
                    let src: string

                    if (srcPath) {
                        src = srcPath
                    } else {
                        const component = Bank[name]
                        src = fileName
                            ? component.files.find((file: string) => {
                            return (
                                file.endsWith(`/${fileName}.tsx`) ||
                                file.endsWith(`/${fileName}.ts`)
                            )
                        }) || component.files[0]
                            : component.files[0]
                    }

                    // Read the source file.
                    const filePath = path.join(process.cwd(), src)
                    let source
                    if (!fileCache[filePath]) {
                        source = fs.readFileSync(filePath, "utf8")
                        fileCache[filePath] = source
                    } else {
                        source = fileCache[filePath]
                    }

                    source = source.replaceAll(
                        `@/workshop/`,
                        "@/components/ui/",
                    )
                    source = source.replaceAll("export default", "export")

                    const lines = source.split("\n")

                    /** Anatomy **/
                    let anatomyStartIndices = []
                    let anatomyEndIndices = []
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].includes("defineStyleAnatomy({")) {
                            anatomyStartIndices.push(i)
                        }
                    }
                    for (let i = 0; i < anatomyStartIndices.length; i++) {
                        let j = anatomyStartIndices[i]
                        while (j < lines.length) {
                            if (lines[j].startsWith("})")) {
                                anatomyEndIndices.push(j)
                                break
                            }
                            j++
                        }
                    }
                    let anatomySlices: string[][] = []
                    for (let i = 0; i < anatomyStartIndices.length; i++) {
                        anatomySlices.push(lines.slice(anatomyStartIndices[i], anatomyEndIndices[i] + 1))
                        anatomySlices.push(["\n"])
                    }

                    let anatomyString = ""
                    for (let i = 0; i < anatomySlices.length; i++) {
                        anatomyString += anatomySlices[i].join("\n")
                    }
                    anatomyString = anatomyString.replaceAll(
                        `export const`,
                        "const",
                    )
                    anatomyString = anatomyString.trim()

                    /** Types **/
                    let typesIndices: number[][] = []

                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].startsWith("export type") || lines[i].startsWith("export interface")) {
                            let j = i + 1
                            while (j < lines.length) {
                                if (lines[j].startsWith("export const") || lines[j].startsWith("export function") || lines[j].startsWith(
                                    "export default") || lines[j].startsWith("export enum") || lines[j].startsWith("export type")) {
                                    typesIndices.push([i, j])
                                    break
                                }
                                j++
                            }
                        }
                    }
                    let typesSlices = []
                    for (let i = 0; i < typesIndices.length; i++) {
                        typesSlices.push(lines.slice(typesIndices[i][0], typesIndices[i][1]))
                    }

                    let typesString = ""
                    for (let i = 0; i < typesSlices.length; i++) {
                        typesString += typesSlices[i].join("\n")
                    }
                    typesString = typesString.replaceAll(
                        `export type`,
                        "type",
                    ).replaceAll(
                        `export interface`,
                        "interface",
                    )
                    typesString = typesString.trim()


                    // Add code as children so that rehype can take over at build time.
                    node.children?.push(
                        u("element", {
                            tagName: "pre",
                            properties: {
                                __src__: src,
                            },
                            children: [
                                u("element", {
                                    tagName: "code",
                                    properties: {
                                        className: ["language-tsx"],
                                    },
                                    children: [
                                        {
                                            type: "text",
                                            value: anatomyString || "No styles",
                                        },
                                    ],
                                }),
                            ],
                        }),
                    )
                    node.children?.push(
                        u("element", {
                            tagName: "pre",
                            properties: {
                                __src__: src,
                            },
                            children: [
                                u("element", {
                                    tagName: "code",
                                    properties: {
                                        className: ["language-tsx"],
                                    },
                                    children: [
                                        {
                                            type: "text",
                                            value: typesString,
                                        },
                                    ],
                                }),
                            ],
                        }),
                    )
                }
                catch (error) {
                    console.error(error)
                }
            }

            if (node.name === "ComponentPreview") {
                const name = getNodeAttributeByName(node, "name")?.value as string

                if (!name) {
                    return null
                }

                try {
                    const component = Bank[name]
                    const src = component.files[0]

                    // Read the source file.
                    const filePath = path.join(process.cwd(), src)
                    let source
                    if (!fileCache[filePath]) {
                        source = fs.readFileSync(filePath, "utf8")
                        fileCache[filePath] = source
                    } else {
                        source = fileCache[filePath]
                    }

                    source = source.replaceAll(
                        `@/workshop/`,
                        "@/components/ui/",
                    )
                    source = source.replaceAll("export default", "export")
                    source = source.replaceAll("//@ts-nocheck\n", "")

                    // Add code as children so that rehype can take over at build time.
                    node.children?.push(
                        u("element", {
                            tagName: "pre",
                            properties: {
                                __src__: src,
                            },
                            children: [
                                u("element", {
                                    tagName: "code",
                                    properties: {
                                        className: ["language-tsx"],
                                    },
                                    children: [
                                        {
                                            type: "text",
                                            value: source,
                                        },
                                    ],
                                }),
                            ],
                        }),
                    )
                }
                catch (error) {
                    console.error(error)
                }
            }
        })
    }
}

function getNodeAttributeByName(node: any, name: string) {
    return node.attributes?.find((attribute: any) => attribute.name === name)
}

function getComponentSourceFileContent(node: any) {
    const src = getNodeAttributeByName(node, "src")?.value as string

    if (!src) {
        return null
    }

    // Read the source file.
    const filePath = path.join(process.cwd(), src)
    const source = fs.readFileSync(filePath, "utf8")

    return source
}

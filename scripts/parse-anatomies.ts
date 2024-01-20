type ParsedVariant = {
    type: "enum" | "boolean"
    name: string
    part: string
    values: string[]
    default: string
}

type ParsedAnatomy = {
    name: string
    variants: ParsedVariant[]
    parts: string[]
}

function parseAnatomy(input: string) {
    const lines = input.split("\n")

    const anatomyDefRgx = /const\s+(\w+)\s+?=\s+?defineStyleAnatomy\(\{/
    const partDefRgx = /(\w+):\s+?cva\(/

    let anatomies: ParsedAnatomy[] = []

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (line.startsWith("const")) {
            const matches = line.match(anatomyDefRgx)
            let anatomyName = matches?.[1]
            if (!anatomyName) continue

            let endIndex = 0
            for (let j = i; j < lines.length; j++) {
                const line = lines[j]
                if (line.startsWith("})")) {
                    endIndex = j
                    break
                }
            }
            if (endIndex === 0) continue

            // Anatomy lines
            const anatomyLines = lines.slice(i, endIndex + 1)

            // Parts
            let parts: { name: string, index: number }[] = []
            for (let w = 0; w < anatomyLines.length; w++) {
                const alMatches = anatomyLines[w].match(partDefRgx)
                const partName = alMatches?.[1]
                if (!partName) continue
                parts.push({ name: partName, index: w })
            }
            console.log("Parts", parts)

            let variants: ParsedVariant[] = []
            // For each part, find variants
            for (let j = 0; j < parts.length; j++) {
                const part = parts[j] // Get current part

                // Go through each line after the part definition and before the next part definition
                for (let cursor = part.index + 1; cursor < anatomyLines.length; cursor++) {
                    if (parts[j + 1] && cursor >= parts[j + 1].index) break // Stop if next part reached

                    const line = anatomyLines[cursor]
                    if (!line.trim().startsWith("variants:")) continue

                    // Find variants
                    let variantDefIndices: { type: "normal" | "default", index: number }[] = []
                    for (let k = cursor + 1; k < anatomyLines.length; k++) {

                        if (anatomyLines[k].trim().startsWith("})") ||
                            anatomyLines[k].trim().startsWith("compoundVariants") ||
                            (parts[j + 1] && k >= parts[j + 1].index)) break

                        if (RegExp(/(\w+):\s+?\{/gi).test(anatomyLines[k].trim())) {
                            variantDefIndices.push({
                                type: anatomyLines[k].trim().includes("defaultVariants") ? "default" : "normal",
                                index: k,
                            })
                        }
                    }

                    let defaultVariantsRest: { [key: string]: string } = {}

                    // Go through each variant
                    variantDefIndices.forEach((vdi, idx) => {

                        let variantLines: string[] = [anatomyLines[vdi.index].trim()]

                        // Collect all lines until the next variant definition
                        for (let k = vdi.index + 1; k < anatomyLines.length; k++) {
                            if (
                                anatomyLines[k].trim().startsWith("})") ||
                                anatomyLines[k].trim().startsWith("compoundVariants") ||
                                anatomyLines[k].trim().startsWith("defaultVariants") ||
                                (variantDefIndices[idx + 1] && k >= variantDefIndices[idx + 1].index) ||
                                (parts[j + 1] && k >= parts[j + 1].index)
                            ) break
                            variantLines.push(anatomyLines[k].trim())
                        }

                        let line = variantLines.join(" ")

                        const nameRgx = /^(\w+):\s+?/gi
                        const nameMatch = line.match(nameRgx)
                        const name = nameMatch?.[0]?.trim().slice(0, -1) // Extract the name
                        const rest = line.replace(nameRgx, "").trim() // Remove the name from the line
                        const formatted = parseString(rest) // Parse the rest of the line

                        if(!name) return

                        let keys = Object.keys(formatted).map(key => {
                            if(!key.startsWith(`"`) && !key.endsWith(`"`) && key !== "true" && key !== "false") {
                                return `"${key}"`
                            }
                            return key
                        })

                        if(name !== "defaultVariants") {
                            variants.push({
                                type: keys.includes("true") || keys.includes("false") ? "boolean" : "enum",
                                name: name,
                                values: keys,
                                part: part.name,
                                default: "",
                            })
                        } else {
                            defaultVariantsRest = formatted
                        }

                        // console.log("---------------")

                    })

                    variants = variants.map(v => {
                        return {
                            ...v,
                            default: defaultVariantsRest[v.name] || (v.type === "boolean" ? "false" : "null"),
                        }
                    })
                }

            }

            anatomies.push({
                name: anatomyName,
                variants: variants,
                parts: parts.map(p => p.name),
            })

        }
    }

    console.log(JSON.stringify(anatomies, null, 2))

    return anatomies
}


const input = `const CheckboxAnatomy = defineStyleAnatomy({
    container: cva("UI-Checkbox__container inline-flex gap-2 items-center"),
    root: cva([
        "UI-Checkbox__root",
        "appearance-none peer block relative overflow-hidden transition h-5 w-5 shrink-0 text-white rounded-md ring-offset-1 border ring-offset-[--background]",
        "border-gray-300 dark:border-gray-700",
        "outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] disabled:cursor-not-allowed data-[disabled=true]:opacity-50",
        "data-[state=unchecked]:bg-white dark:data-[state=unchecked]:bg-gray-700", // Unchecked
        "data-[state=unchecked]:hover:bg-gray-100 dark:data-[state=unchecked]:hover:bg-gray-600", // Unchecked hover
        "data-[state=checked]:bg-brand dark:data-[state=checked]:bg-brand data-[state=checked]:border-brand", // Checked
        "data-[state=indeterminate]:bg-[--muted] dark:data-[state=indeterminate]:bg-gray-700 data-[state=indeterminate]:text-white data-[state=indeterminate]:border-transparent", // Checked
        "data-[error=true]:border-red-500 data-[error=true]:dark:border-red-500 data-[error=true]:data-[state=checked]:border-red-500 data-[error=true]:dark:data-[state=checked]:border-red-500", // Error
    ], {
        variants: {
            size: { md: "h-5 w-5", lg: "h-6 w-6" },
            hide: {
                true: "hidden",
                false: null,
            },
        },
        defaultVariants: {
            size: "md",
            hide: false,
        },
    }),
    label: cva([
        "UI-Checkbox_label",
        "font-normal",
        "data-[disabled=true]:opacity-50",
    ], {
        variants: {
            size: {
                md: "text-md",
                lg: "text-lg",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }),
    indicator: cva([
        "UI-Checkbox__indicator",
        "flex h-full w-full items-center justify-center relative",
    ]),
    checkIcon: cva("UI-Checkbox__checkIcon absolute", {
        variants: {
            size: {
                md: "h-4 w-4",
                lg: "h-5 w-5",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }),
})

const ButtonAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Button_root",
        "shadow-sm whitespace-nowrap font-semibold rounded-[--radius]",
        "inline-flex items-center text-white transition ease-in duration-100 text-center text-base justify-center",
        "focus-visible:outline-none focus-visible:ring-2 ring-offset-1 ring-offset-[--background] focus-visible:ring-[--ring]",
        "disabled:opacity-50 disabled:pointer-events-none",
    ], {
        variants: {
            intent: {
                "primary": "bg-brand-500 hover:bg-brand-600 active:bg-brand-700 border border-transparent",
                "primary-outline": "text-brand-500 border border-brand-500 bg-transparent hover:bg-brand-500 active:bg-brand-600 active:border-transparent hover:text-white dark:text-brand-300 dark:hover:border-brand-500 dark:active:bg-brand-600 dark:border-brand-200 dark:hover:text-white dark:active:border-transparent dark:active:text-white",
                "primary-subtle": "text-brand-600 border border-brand-500 bg-brand-50 border-transparent hover:bg-brand-100 active:bg-brand-200 dark:text-brand-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "primary-link": "shadow-none text-brand-500 border border-transparent bg-transparent hover:underline active:text-brand-700 dark:text-brand-300 dark:active:text-brand-400",
                "primary-basic": "shadow-none text-brand-500 border border-transparent bg-transparent hover:bg-brand-100 active:bg-brand-200 dark:text-brand-300 dark:hover:bg-opacity-10 dark:active:text-brand-200",
 
                "warning": "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 border border-transparent",
                "warning-outline": "text-orange-500 border border-orange-500 bg-transparent hover:bg-orange-500 active:bg-orange-600 active:border-transparent hover:text-white dark:text-orange-300 dark:hover:border-orange-500 dark:active:bg-orange-600 dark:border-orange-200 dark:hover:text-white dark:active:border-transparent dark:active:text-white",
                "warning-subtle": "text-orange-600 border border-orange-500 bg-orange-50 border-transparent hover:bg-orange-100 active:bg-orange-200 dark:text-orange-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "warning-link": "shadow-none text-orange-500 border border-transparent bg-transparent hover:underline active:text-orange-700 dark:text-orange-300 dark:active:text-orange-400",
                "warning-basic": "shadow-none text-orange-500 border border-transparent bg-transparent hover:bg-orange-100 active:bg-orange-200 dark:text-orange-300 dark:hover:bg-opacity-10 dark:active:text-orange-200",
 
                "success": "bg-green-500 hover:bg-green-600 active:bg-green-700 border border-transparent",
                "success-outline": "text-green-500 border border-green-500 bg-transparent hover:bg-green-500 active:bg-green-600 active:border-transparent hover:text-white dark:text-green-300 dark:hover:border-green-500 dark:active:bg-green-600 dark:border-green-200 dark:hover:text-white dark:active:border-transparent dark:active:text-white",
                "success-subtle": "text-green-600 border border-green-500 bg-green-50 border-transparent hover:bg-green-100 active:bg-green-200 dark:text-green-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "success-link": "shadow-none text-green-500 border border-transparent bg-transparent hover:underline active:text-green-700 dark:text-green-300 dark:active:text-green-400",
                "success-basic": "shadow-none text-green-500 border border-transparent bg-transparent hover:bg-green-100 active:bg-green-200 dark:text-green-300 dark:hover:bg-opacity-10 dark:active:text-green-200",
 
                "alert": "bg-red-500 hover:bg-red-600 active:bg-red-700 border border-transparent",
                "alert-outline": "text-red-500 border border-red-500 bg-transparent hover:bg-red-500 active:bg-red-600 active:border-transparent hover:text-white dark:text-red-300 dark:hover:border-red-500 dark:active:bg-red-600 dark:border-red-200 dark:hover:text-white dark:active:border-transparent dark:active:text-white",
                "alert-subtle": "text-red-600 border border-red-500 bg-red-50 border-transparent hover:bg-red-100 active:bg-red-200 dark:text-red-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "alert-link": "shadow-none text-red-500 border border-transparent bg-transparent hover:underline active:text-red-700 dark:text-red-300 dark:active:text-red-400",
                "alert-basic": "shadow-none text-red-500 border border-transparent bg-transparent hover:bg-red-100 active:bg-red-200 dark:text-red-300 dark:hover:bg-opacity-10 dark:active:text-red-200",
 
                "gray": "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 border border-transparent",
                "gray-outline": "text-gray-600 border border-gray-300 bg-transparent hover:bg-gray-100 active:border-transparent active:bg-gray-200 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:active:border-transparent dark:hover:text-gray-100",
                "gray-subtle": "text-gray-600 border border-gray-500 bg-gray-100 border-transparent hover:bg-gray-200 active:bg-gray-300 dark:text-gray-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "gray-link": "shadow-none text-gray-500 border border-transparent bg-transparent hover:underline active:text-gray-700 dark:text-gray-300 dark:active:text-gray-400",
                "gray-basic": "shadow-none text-gray-500 border border-transparent bg-transparent hover:bg-gray-100 active:bg-gray-200 dark:active:bg-opacity-20 dark:text-gray-300 dark:hover:bg-opacity-10 dark:active:text-gray-200",

                "white": "text-black bg-white hover:bg-gray-200 active:bg-gray-300 border border-transparent",
                "white-outline": "text-white border border-gray-200 bg-transparent hover:bg-white hover:text-black active:bg-gray-100 active:text-black",
                "white-subtle": "text-white bg-white bg-opacity-15 hover:bg-opacity-20 border border-transparent active:bg-opacity-25",
                "white-link": "shadow-none text-white border border-transparent bg-transparent hover:underline active:text-gray-200",
                "white-basic": "shadow-none text-white border border-transparent bg-transparent hover:bg-white hover:bg-opacity-15 active:bg-opacity-20 active:text-white-300",
            },
            rounded: {
                true: "rounded-full",
                false: null,
            },
            contentWidth: {
                true: "w-fit",
                false: null,
            },
            size: {
                xs: "text-sm h-6 px-2",
                sm: "text-sm h-8 px-3",
                md: "text-sm h-10 px-4",
                lg: "h-12 px-6 text-lg",
                xl: "text-2xl h-14 px-8",
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "md",
        },
    }),
    icon: cva([
        "UI-Button__icon",
        "inline-flex self-center flex-shrink-0",
    ]),
})
`

parseAnatomy(input)


function parseString(sizeString: string): { [key: string]: string } {
    const sizeMap: { [key: string]: string } = {}

    // Remove curly braces and split by comma
    const pairs = sizeString.replace(/[{}]/g, "").split(",")

    for (const pair of pairs) {
        // Split key and value by colon
        const [key, value] = pair.trim().split(":")

        if (key && value) {
            sizeMap[key.trim()] = value.trim()
        }
    }

    return sizeMap
}

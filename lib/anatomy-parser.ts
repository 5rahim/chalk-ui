export type ParsedVariant = {
    type: "enum" | "boolean"
    name: string
    part: string
    values: string[]
    default: string
}

export type ParsedAnatomy = {
    name: string
    parts: string[]
    variants: ParsedVariant[]
}

export function getComponentAnatomyClassNames(type: string, anatomies: ParsedAnatomy[]): string[] {
    if (type.startsWith("Pick<")) {
        const classRgx = /"([a-zA-Z]+)"/
        let matches = type.matchAll(classRgx)
        let classNames: string[] = []
        for (const match of matches) {
            classNames.push(match[1])
        }
        return classNames
    } else {
        const anatomyNameRgx = /typeof (\w+Anatomy)/
        const matches = type.match(anatomyNameRgx)
        const anatomyName = matches?.[0]?.split(" ")[1]
        if (!anatomyName) return []
        const anatomy = anatomies.find(a => a.name === anatomyName)
        if (!anatomy) return []
        return anatomy.parts.map(p => `${p}Class`)
    }
}

export function getComponentAnatomyVariants(type: string, anatomies: ParsedAnatomy[]): ParsedVariant[] {
    if (type.startsWith("VariantProps<")) {
        const classRgx = /typeof \w+Anatomy.(\w+)>/gm
        let matches = type.matchAll(classRgx)
        let partName: string = ""
        for (const match of matches) {
            partName = match[1]
        }
        if (!partName.length) return []
        return anatomies.flatMap(a => a.variants.filter(v => v.part === partName)).filter(v => !v.name.startsWith("_"))
    }
    return []
}

export function parseAnatomies(input: string) {
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
            // console.log("Parts", parts)

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

    return anatomies
}


function parseString(sizeString: string): { [key: string]: string } {
    const map: { [key: string]: string } = {}

    // Remove curly braces and split by comma
    const pairs = sizeString.replace(/[{}]/g, "").split(",")

    for (const pair of pairs) {
        // Split key and value by colon
        const [key, value] = pair.trim().split(":")

        if (key && value) {
            map[key.trim()] = value.trim()
        }
    }
    return map
}

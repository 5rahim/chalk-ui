export type ParsedTypeProperty = {
    name: string
    value: string
    description?: string
    required?: boolean
}

export type ParsedType = {
    kind: "type" | "interface"
    name: string
    typeValues: ParsedTypeProperty[]
}


export function parseTypes(input: string): ParsedType[] {
    input = input.replace(/[\r\n]+/g, " ")
    input = input.replace(/type \{(.*)}/g, "")
    const typeRgx = /type\s(\w+)((<[^=]+>\s)|\s)=/gm
    const matches = input.matchAll(typeRgx)

    const types: ParsedType[] = []
    for (const match of matches) {
        if (match[2]) input = input.replace(match[2], " ")
        types.push({
            kind: "type",
            name: match[1],
            typeValues: [],
        })
    }

    const typeDefs = input.split(/type\s\w+\s=/gmi).map(n => n.trim()).filter(n => n !== "")
    for (let i = 0; i < typeDefs.length; i++) {
        const typeDef = typeDefs[i]
        const els = typeDef.split(/&/).map(n => n.trim())

        for (const el of els) {
            if (el.startsWith("{") && el.endsWith("}")) {
                const propDefsStr = el.slice(1, -1) // Remove braces
                const propDefsArr = propDefsStr.split(/\s+/).map(n => n.trim()).filter(n => n !== "") // Get tokens inside braces

                let cursor = 0
                let parenOpened = 0

                let unknownTkns: { value: string, index: number }[] = []

                let commentTkns: { value: string, index: number, took: boolean }[] = []
                let commentOpened = false

                let propertyTkns: { value: string, required: boolean, index: number }[] = []
                let propertyOpened = false
                let innerBracketOpened = false
                while (cursor < propDefsArr.length) {
                    const token = propDefsArr[cursor]
                    if(token === "()") {
                        if(!commentOpened) unknownTkns.push({ value: token, index: cursor })
                        else commentTkns.push({ value: token, index: cursor, took: false })
                    } else if (token === "{" && !innerBracketOpened) { // Start of inner bracket e.g `prop: { }`
                        innerBracketOpened = true
                        // Handle comment that is a bracket
                        if(!commentOpened) unknownTkns.push({ value: token, index: cursor })
                        else commentTkns.push({ value: token, index: cursor, took: false })
                    } else if (token.startsWith("}") && innerBracketOpened) { // End of inner bracket e.g `prop: { }`
                        innerBracketOpened = false
                        // Handle comment that is a bracket
                        if(!commentOpened) unknownTkns.push({ value: token, index: cursor })
                        else commentTkns.push({ value: token, index: cursor, took: false })
                    } else if (token === "/**") {
                        commentOpened = true
                    } else if (token.endsWith("*/")) {
                        commentOpened = false
                    } else if (commentOpened) {
                        commentTkns.push({ value: token, index: cursor, took: false })
                    } else if (
                        (token.endsWith(":") || token.endsWith("?:")) &&
                        !token.startsWith("(") && !token.includes(">") && !token.includes("<") && parenOpened === 0
                    ) { // Property e.g `prop:`
                        if (!innerBracketOpened && !commentOpened) { // Ignore properties inside inner brackets and comments, e.g `prop: { ignored: true }`
                            propertyOpened = true
                            const required = !token.endsWith("?:")
                            let name = token.endsWith("?:") ? token.slice(0, -2) : token.slice(0, -1)
                            propertyTkns.push({ value: name, required, index: cursor })
                        } else {
                            unknownTkns.push({ value: token, index: cursor })
                        }
                    } else if (propertyOpened) {
                        if (token.startsWith("(") || token.includes(">(")) {
                            parenOpened++
                        } else if (token.endsWith(")")) {
                            parenOpened--
                        }
                        unknownTkns.push({ value: token, index: cursor })
                    }
                    cursor++
                }

                let typeValues: ParsedTypeProperty[] = []

                for (let i = 0; i < propertyTkns.length; i++) {
                    const propertyTkn = propertyTkns[i]

                    let comment = ""
                    let value = ""
                    const required = propertyTkn.required
                    let name = propertyTkn.value

                    let commentStrs = []
                    for (let j = propertyTkn.index - 1; j > 0; j--) {
                        const commentTkn = commentTkns.find(n => n.index === j)
                        if(!commentTkn) continue
                        if (commentTkn.took) break
                        if (commentTkn.index < propertyTkn.index) {
                            commentTkn.took = true
                            commentStrs.push(commentTkn.value)
                        }
                    }
                    comment = commentStrs.toReversed().join(" ")

                    for (let j = propertyTkn.index + 1; j < propDefsArr.length; j++) {
                        const valueTkn = unknownTkns.find(n => n.index === j)
                        if(!valueTkn) continue
                        if (propertyTkns[i + 1] && valueTkn.index > propertyTkns[i + 1].index) break
                        value += valueTkn.value + " "
                    }

                    value = value.trim()
                    if(value.endsWith(",")) value = value.slice(0, -1)

                    typeValues.push({
                        name,
                        required,
                        description: comment,
                        value: value,
                    })
                }

                types[i]?.typeValues.push(...typeValues)

            } else {
                types[i]?.typeValues.push({
                    name: "",
                    value: el,
                })
            }
        }
    }

    return types
}

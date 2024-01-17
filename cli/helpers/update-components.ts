import _ from "lodash"

export function mergeFileContent(originalContent: string, updatedContent: string): string {
    const originalLines = originalContent.split("\n")
    const updatedLines = updatedContent.split("\n")

    const original = extractAnatomyFunctions(originalContent)
    const updated = extractAnatomyFunctions(updatedContent)


    let mergedLines = updatedLines
    for (const indices of updated.indices) {
        mergedLines = mergedLines.filter((line, idx) => (idx < indices.start) || (idx > indices.end))
    }

    let preservedLines: string[][] = []
    for (const indices of original.indices) {
        if (indices.start !== 0 && indices.end !== 0) {
            preservedLines.push(originalLines.filter((line, idx) => (idx >= indices.start) && (idx <= indices.end)))
            // preservedLines.push(["\r"])
        }
    }

    mergedLines.map((line, idx) => {
        if (line.trim().startsWith("*") && line.includes("Anatomy")) { // * Anatomy
            let injectionIndex = idx + 3
            mergedLines.splice(injectionIndex, 0, ..._.flatten(preservedLines))
        }
    })

    return mergedLines.join("\n")
}

export function extractAnatomyFunctions(content: string) {
    const lines = content.split("\n")
    let anatomyFuncs: string[] = []
    let indices: { start: number, end: number }[] = []


    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (line.includes("defineStyleAnatomy(")) { // Start of a function
            let funcStartIndex = i
            let funcEndIndex = -1
            let entireFuncLines: string[] = [] // export const ... = defineStyleAnatomy(

            let foundEnd = false
            let cursorIndex = i
            while (!foundEnd) {
                if (lines[cursorIndex].trim().includes("})")) {
                    funcEndIndex = cursorIndex
                    foundEnd = true
                }
                cursorIndex += 1
            }

            entireFuncLines = lines.slice(funcStartIndex, funcEndIndex + 1)

            indices.push({ start: funcStartIndex, end: funcEndIndex })
            anatomyFuncs.push(entireFuncLines.join())

        }
    }

    return {
        anatomyFuncs,
        indices
    }
}

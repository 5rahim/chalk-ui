// interface TypeValue {
//     name: string;
//     value: string;
//     description?: string;
//     required?: boolean;
// }
//
// interface ParsedType {
//     type: string;
//     name: string;
//     typeValues: TypeValue[];
// }
//
// type Token = {
//     value: string,
//     kind: "unknown" | "prop" | "equals" | "commentStart" | "commentEnd" | "typeKeyword" | "openBracket" | "closeBracket" | "interfaceKeyword" | "ampersand"
// }
//
// function parseTypes(input: string): any {
//     let strTokens = input.split(/\s+/)
//     for (let i = 0; i < strTokens.length; i++) {
//         if (
//             !strTokens[i].startsWith("Omit") &&
//             !strTokens[i].startsWith("Pick") &&
//             !strTokens[i].startsWith("ComponentAnatomy") &&
//             !strTokens[i].startsWith("React.ComponentProps") &&
//             !strTokens[i].startsWith("React.HTMLAttributes")
//         ) {
//             continue
//         }
//         if (strTokens[i].endsWith(">")) {
//             continue
//         }
//         let found
//         for (let j = i++; j < strTokens.length; j++) {
//             if (!strTokens[j].endsWith(">")) {
//                 continue
//             }
//             found = j
//             break
//         }
//         if (!found) {
//             continue
//         }
//         let newTkns = strTokens.slice(i - 1, found + 1)
//         strTokens = [
//             ...strTokens.slice(0, i - 1),
//             newTkns.join(" "),
//             ...strTokens.slice(found + 1),
//         ]
//     }
//
//     let tokens: Token[] = []
//     let commentOpened = false
//     for (let str of strTokens) {
//
//         if (str === "=") {
//             tokens.push({ value: str, kind: "equals" })
//         } else if (str === "/**") {
//             tokens.push({ value: str, kind: "commentStart" })
//             commentOpened = true
//         } else if (str === "*/") {
//             tokens.push({ value: str, kind: "commentEnd" })
//             commentOpened = false
//         } else if (str === "{") {
//             tokens.push({ value: str, kind: "openBracket" })
//             commentOpened = true
//         } else if (str === "}") {
//             tokens.push({ value: str, kind: "closeBracket" })
//             commentOpened = false
//         } else if (str.endsWith(":") || str.endsWith("?:")) {
//             if (commentOpened || str.startsWith("(")) {
//                 tokens.push({ value: str, kind: "unknown" })
//                 continue
//             }
//             tokens.push({ value: str, kind: "prop" })
//         } else if (str === "type") {
//             if (commentOpened) {
//                 tokens.push({ value: str, kind: "unknown" })
//                 continue
//             }
//             tokens.push({ value: str, kind: "typeKeyword" })
//         } else if (str === "interface") {
//             if (commentOpened) {
//                 tokens.push({ value: str, kind: "unknown" })
//                 continue
//             }
//             tokens.push({ value: str, kind: "interfaceKeyword" })
//         } else if (str === "&") {
//             if (commentOpened) {
//                 tokens.push({ value: str, kind: "unknown" })
//                 continue
//             }
//             tokens.push({ value: str, kind: "ampersand" })
//         } else {
//             tokens.push({ value: str, kind: "unknown" })
//         }
//     }
//
//     let parsedTypes: ParsedType[] = []
//     for (let i = 0; i < tokens.length; i++) {
//         const token = tokens[i]
//
//         if (token.kind !== "typeKeyword" && token.kind !== "interfaceKeyword") continue
//
//         let type = "type" // Type prop
//         if (token.kind === "interfaceKeyword") type = "interface"
//
//         let name = "" // Name prop
//         if (tokens[i + 1].kind !== "unknown") continue // Couldn't find type name
//         name = tokens[i + 1].value
//
//         // devnote: handle "extends" when interface
//
//         if (tokens[i + 2].kind !== "equals") continue // Couldn't find "="
//
//         let mainProps: TypeValue[] = []
//
//         for (let j = i + 3; j < tokens.length; j++) {
//
//             if(tokens[j].kind === "typeKeyword")
//                 break
//
//             if (tokens[j].value === "{") { // Get props inside { }
//                 let props: TypeValue[] = []
//
//                 for (let k = j + 1; k < tokens.length; k++) {
//                     if (tokens[k].value === "}") break
//                     const propTkn = tokens[k]
//                     if (propTkn.kind === "prop") {
//                         let value = ""
//                         let commentArr = []
//                         for (let w = k + 1; w < tokens.length; w++) {
//                             if (tokens[w].kind === "commentStart" || tokens[w].kind === "prop" || tokens[w].kind === "typeKeyword" || tokens[w].kind === "interfaceKeyword") break
//                             value += tokens[w].value + " "
//                         }
//                         if (tokens[k - 1].kind === "commentEnd") {
//                             for (let w = k - 2; w > tokens.length; w--) {
//                                 if (tokens[w].kind !== "unknown") break
//                                 commentArr.push(tokens[w].value)
//                             }
//                         }
//                         let comment = commentArr.toReversed().join(" ")
//                         let required = !propTkn.value.includes("?")
//                         value = value.trim()
//                         props.push({
//                             name: propTkn.value.replace(":", "").replace("?", ""),
//                             value: value.endsWith(",") ? value.split("").toSpliced(0, -1).join("") : value,
//                             description: comment,
//                             required,
//                         })
//                     }
//                 }
//                 mainProps.push(...props)
//             }
//         }
//
//         parsedTypes.push({
//             type,
//             name,
//             typeValues: mainProps,
//         })
//
//
//     }
//
//     console.log(JSON.stringify(parsedTypes, null, 2))
//     // console.log(parsedTypes.flatMap(n => n.typeValues))
//     // console.log(tokens)
// }
//
// const input = `type AutocompleteOption = { value: string | null, label: string } type AutocompleteProps = Omit<React.ComponentPropsWithRef<"input">, "size" | "value" | "defaultValue"> & BasicFieldOptions & InputStyling & ComponentAnatomy<typeof AutocompleteAnatomy> & { /** * The selected option */ value?: AutocompleteOption | undefined /** * Callback invoked when the value changes. */ onValueChange?: (value: { value: string | null, label: string } | undefined) => void /** * Callback invoked when the input text changes. */ onTextChange?: (value: string) => void /** * The autocompletion options. */ options: AutocompleteOption[] /** * The message to display when there are no options. * * If not provided, the options list will be hidden when there are no options. */ emptyMessage?: React.ReactNode /** * The placeholder of the input. */ placeholder?: string /** * Additional props to pass to the command component. */ commandProps?: CommandProps /** * Default value of the input when uncontrolled. */ defaultValue?: AutocompleteOption /** * If true, the options list will be filtered based on the input value. * Set this to false if you want to filter the options yourself by listening to the \`onTextChange\` event. * * @default true */ autoFilter?: boolean /** * If true, a loading indicator will be displayed. */ isFetching?: boolean /** * The type of the autocomplete. * * - \`custom\`: Arbitrary values are allowed * - \`options\`: Only values from the options list are allowed. Falls back to last valid option if the input value is not in the options list. * * @default "custom" */ type?: "custom" | "options" }`
//
// parseTypes(input)

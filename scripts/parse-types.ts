// interface TypeValue {
//     name: string;
//     value: string;
//     description?: string;
//     required?: boolean;
// }
//
// interface ParsedType {
//     kind: "type" | "interface";
//     name: string;
//     typeValues: TypeValue[];
// }
//
//
// function parseTypes(input: string): any {
//     const typeRgx = /type\s(\w+)\s=/g
//     const matches = input.matchAll(typeRgx)
//
//     const types: ParsedType[] = []
//     for (const match of matches) {
//         types.push({
//             kind: "type",
//             name: match[1],
//             typeValues: [],
//         })
//     }
//
//     const typeDefs = input.split(/type\s\w+\s=\s+/).map(n => n.trim()).filter(n => n !== "")
//     for (let i = 0; i < typeDefs.length; i++) {
//         const typeDef = typeDefs[i]
//         const els = typeDef.split(/&/).map(n => n.trim())
//         // console.log(els)
//
//         for (const el of els) {
//             if (el.startsWith("{") && el.endsWith("}")) {
//                 const propDefsStr = el.slice(1, -1) // Remove braces
//                 const propDefsArr = propDefsStr.split(/\s+/).map(n => n.trim()).filter(n => n !== "") // Get tokens inside braces
//
//                 let cursor = 0
//
//                 let unknownTkns: { value: string, index: number }[] = []
//
//                 let commentTkns: { value: string, index: number, took: boolean }[] = []
//                 let commentOpened = false
//
//                 let propertyTkns: { value: string, required: boolean, index: number }[] = []
//                 let propertyOpened = false
//                 let innerBracketOpened = false
//                 while (cursor < propDefsArr.length) {
//                     const token = propDefsArr[cursor]
//                     if (token === "{") {
//                         innerBracketOpened = true
//                         unknownTkns.push({ value: token, index: cursor })
//                     } else if (token.startsWith("}")) {
//                         innerBracketOpened = false
//                         unknownTkns.push({ value: token, index: cursor })
//                     } else if (token === "/**") {
//                         commentOpened = true
//                     } else if (token.endsWith("*/")) {
//                         commentOpened = false
//                     } else if (commentOpened) {
//                         commentTkns.push({ value: token, index: cursor, took: false })
//                     } else if (
//                         (token.endsWith(":") || token.endsWith("?:")) &&
//                         !token.startsWith("(")
//                     ) {
//                         if (!innerBracketOpened && !commentOpened) {
//                             propertyOpened = true
//                             const required = !token.endsWith("?:")
//                             let name = token.endsWith("?:") ? token.slice(0, -2) : token.slice(0, -1)
//                             propertyTkns.push({ value: name, required, index: cursor })
//                         } else {
//                             unknownTkns.push({ value: token, index: cursor })
//                         }
//                     } else if (propertyOpened) {
//                         unknownTkns.push({ value: token, index: cursor })
//                     }
//                     cursor++
//                 }
//
//                 let typeValues: TypeValue[] = []
//
//                 for (let i = 0; i < propertyTkns.length; i++) {
//                     const propertyTkn = propertyTkns[i]
//
//                     let comment = ""
//                     let value = ""
//                     const required = propertyTkn.required
//                     let name = propertyTkn.value
//
//                     let commentStrs = []
//                     for (let j = propertyTkn.index - 1; j > 0; j--) {
//                         const commentTkn = commentTkns.find(n => n.index === j)
//                         if(!commentTkn) continue
//                         if (commentTkn.took) break
//                         if (commentTkn.index < propertyTkn.index) {
//                             commentTkn.took = true
//                             commentStrs.push(commentTkn.value)
//                         }
//                     }
//                     comment = commentStrs.toReversed().join(" ")
//
//                     for (let j = propertyTkn.index + 1; j < propDefsArr.length; j++) {
//                         const valueTkn = unknownTkns.find(n => n.index === j)
//                         if(!valueTkn) continue
//                         if (propertyTkns[i + 1] && valueTkn.index > propertyTkns[i + 1].index) break
//                         value += valueTkn.value + " "
//                     }
//
//                     value = value.trim()
//                     if(value.endsWith(",")) value = value.slice(0, -1)
//
//                     typeValues.push({
//                         name,
//                         required,
//                         description: comment,
//                         value: value,
//                     })
//                 }
//
//                 types[i].typeValues.push(...typeValues)
//
//             } else {
//                 types[i].typeValues.push({
//                     name: el,
//                     value: "",
//                 })
//             }
//         }
//     }
//
//     console.log(JSON.stringify(types, null, 2))
// }
//
// const input = `type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & ComponentAnatomy<typeof AccordionAnatomy> type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & Pick<ComponentAnatomy<typeof AccordionAnatomy>, "headerClass" | "triggerIconClass"> type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & Pick<ComponentAnatomy<typeof AccordionAnatomy>, "contentContainerClass">`
// // const input = `type AutocompleteOption = { value: string | null, label: string } type AutocompleteProps = Omit<React.ComponentPropsWithRef<"input">, "size" | "value" | "defaultValue"> & BasicFieldOptions & InputStyling & ComponentAnatomy<typeof AutocompleteAnatomy> & { /** * The selected option */ value?: AutocompleteOption | undefined /** * Callback invoked when the value changes. */ onValueChange?: (value: { value: string | null, label: string } | undefined) => void /** * Callback invoked when the input text changes. */ onTextChange?: (value: string) => void /** * The autocompletion options. */ options: AutocompleteOption[] /** * The message to display when there are no options. * * If not provided, the options list will be hidden when there are no options. */ emptyMessage?: React.ReactNode /** * The placeholder of the input. */ placeholder?: string /** * Additional props to pass to the command component. */ commandProps?: CommandProps /** * Default value of the input when uncontrolled. */ defaultValue?: AutocompleteOption /** * If true, the options list will be filtered based on the input value. * Set this to false if you want to filter the options yourself by listening to the \`onTextChange\` event. * * @default true */ autoFilter?: boolean /** * If true, a loading indicator will be displayed. */ isFetching?: boolean /** * The type of the autocomplete. * * - \`custom\`: Arbitrary values are allowed * - \`options\`: Only values from the options list are allowed. Falls back to last valid option if the input value is not in the options list. * * @default "custom" */ type?: "custom" | "options" }`
// // const input = `type NativeSelectProps = Omit<React.ComponentPropsWithRef<"select">, "size"> & InputStyling & BasicFieldOptions & { /** * The options to display */ options: { value: string | number, label?: string }[] | undefined /** * The placeholder text */ placeholder?: string className?: string children?: React.ReactNode }`
// // const input = `type DonutChartProps = React.HTMLAttributes<HTMLDivElement> & { data: any[] category?: string index?: string colors?: UIColor[] variant?: "donut" | "pie" valueFormatter?: ChartValueFormatter label?: string showLabel?: boolean showAnimation?: boolean showTooltip?: boolean emptyMessage?: string } type DonutChartTooltipProps = { active?: boolean payload: any valueFormatter: ChartValueFormatter }`
// parseTypes(input)
//
// // (\/\*\*[*a-zA-Z.(\s+)_-`@"':,\\]+\*\/\s?)?(\s[a-zA-Z_]+[?]?:\s([a-zA-Z|\s\[\]."?<>]+|\([a-zA-Z,\s():{}|]+\)\s=>\s\w+\s))
//
// // (\/\*\*([\s\S]*?)\*\/)?(\s[a-zA-Z_]+[?]?:\s([a-zA-Z|\s\[\]."?<>]+|\([a-zA-Z,\s():{}|]+\)\s=>\s\w+\s))
//
// // (\/\*\*([\s\S]*?)\*\/)?(\s([a-zA-Z_]+[?]?:)\s([a-zA-Z|\s\[\]."?<>]+|\([a-zA-Z,\s():{}|]+\)\s=>\s\w+\s))
//
// // /(\/\*\*([\s\S]*?)\*\/)?(\s?([a-zA-Z_]+[?]?:)\s(([a-zA-Z|\s\[\]."?<>,]+)|\([a-zA-Z,\s():{}|]+\)\s=>\s\w+\s))\s/gmi
//
// // /(\/\*\*([\s\S]*?)\*\/)?(\s?([a-zA-Z_]+[?]?:)\s(([a-zA-Z|\s\[\]."?<>,]+)|\([a-zA-Z,\s():{}|]+\)\s=>\s\w+\s?))\s/gmi

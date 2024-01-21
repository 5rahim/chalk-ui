"use client"

import { AnatomyRow, VariantPropsRow } from "@/components/component-anatomy/custom-rows"
import { BaseChartProps, BasicFieldOptionsProps, InputStylingProps } from "@/components/component-anatomy/extracted-props"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/workshop/accordion"
import { cn } from "@/workshop/core/styling"
import { Popover } from "@/workshop/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/workshop/table"
import kebabCase from "lodash/kebabCase"
import Link from "next/link"
import * as React from "react"
import { BiInfoCircle, BiLinkExternal, BiPalette } from "react-icons/bi"
import { LuTextCursorInput } from "react-icons/lu"
import { getComponentAnatomyClassNames, parseAnatomies, ParsedAnatomy } from "../../../lib/anatomy-parser"
import { ParsedType, ParsedTypeProperty, parseTypes } from "../../../lib/type-parser"

interface ComponentAnatomyProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string
}

export function ComponentAnatomy({
    children,
    className,
    ...props
}: ComponentAnatomyProps) {

    const [parsedTypes, setParsedTypes] = React.useState<ParsedType[]>([])
    const [parsedAnatomies, setParsedAnatomies] = React.useState<ParsedAnatomy[]>([])

    const Codes = React.Children.toArray(children) as React.ReactElement[]

    // Types
    React.useEffect(() => {
        const TypeCode = Codes[1]
        if (typeof TypeCode?.props["data-rehype-pretty-code-fragment"] !== "undefined") {
            const [Code] = React.Children.toArray(TypeCode.props.children) as React.ReactElement[]
            const rawString = Code?.props?.value || Code?.props?.__rawString__ || null
            let res = parseTypes(rawString) || []

            // Replace BaseChartProps with the actual props
            let i1 = res.findIndex(type => type.typeProps.find(prop => prop.value === "BaseChartProps"))
            if (i1 !== -1) {
                res[i1].typeProps = [...BaseChartProps.typeProps, ...res[i1].typeProps].filter((prop) => prop.value !== "BaseChartProps")
            }

            setParsedTypes(res)
        }
        const AnatomyCode = Codes[0]
        if (typeof AnatomyCode?.props["data-rehype-pretty-code-fragment"] !== "undefined") {
            const [Code] = React.Children.toArray(AnatomyCode.props.children) as React.ReactElement[]
            const rawString = Code?.props?.value || Code?.props?.__rawString__ || null
            let res = parseAnatomies(rawString) || []
            setParsedAnatomies(res)
        }
    }, [])


    return (
        <div className="space-y-4">
            <Accordion
                type="multiple"
                className="space-y-2"
                triggerClass="border rounded-[--radius] data-[state=open]:rounded-b-none bg-[--subtle] hover:bg-[--subtle-highlight]"
                itemClass="border-none"
                contentClass="border border-t-0 rounded-b-[--radius]"
                defaultValue={["types", "anatomy"]}
            >
                <AccordionItem value="types">
                    <AccordionTrigger>Types</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-6">
                            {parsedTypes.map((type, i) => {
                                return (
                                    <div key={type.name + type.kind}>
                                        <p className="font-semibold text-sm tracking-wider w-fit bg-brand-50 dark:bg-gray-800 text-[--brand] dark:text-gray-50 px-3 py-1">{type.name.replace(
                                            "Props",
                                            "")}</p>
                                        <Table className="rounded-[--radius] table-fixed min-w-[800px]">
                                            <TableHeader className="bg-[--background] text-md font-medium">
                                                <TableRow className="">
                                                    <TableHead className="w-[250px]">Prop</TableHead>
                                                    <TableHead className="min-w-[200px]">Type</TableHead>
                                                    <TableHead className="w-[200px]">Default</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {/*Rest*/}
                                                {type.typeProps.filter(v => !v.value.includes("ComponentAnatomy") &&
                                                    !v.value.includes("Pick<ComponentAnatomy") &&
                                                    !v.value.includes("VariantProps") &&
                                                    v.value !== ("BasicFieldOptions") &&
                                                    v.value !== ("InputStyling"),
                                                ).map((prop, i) => {
                                                    return (
                                                        <TableRow key={prop.name + i}>
                                                            <TableCell className="font-medium"><TypeProperty prop={prop} /></TableCell>
                                                            <TableCell><TypeValue value={prop.value} /></TableCell>
                                                            <TableCell><TypePropertyDefault prop={prop} /></TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                                {/*Variants*/}
                                                {type.typeProps.filter(v => v.value.includes("VariantProps")).map((prop, i) => {
                                                    return <VariantPropsRow key={prop.value + i} prop={prop} anatomies={parsedAnatomies} />
                                                })}
                                                {/*BasicFieldOptions*/}
                                                {type.typeProps.filter(v => v.value === "BasicFieldOptions").map(() => {
                                                    return BasicFieldOptionsProps.map((prop, i) => {
                                                        return (
                                                            <TableRow key={prop.name + i}>
                                                                <TableCell className="font-medium flex flex-none gap-2 items-center"><LuTextCursorInput
                                                                    className="text-[--blue]"
                                                                /> <TypeProperty prop={prop} /></TableCell>
                                                                <TableCell><TypeValue value={prop.value} /></TableCell>
                                                                <TableCell><TypePropertyDefault prop={prop} /></TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                })}
                                                {/*InputStyling*/}
                                                {type.typeProps.filter(v => v.value === "InputStyling").map(() => {
                                                    return InputStylingProps.map((prop, i) => {
                                                        return (
                                                            <TableRow key={prop.name + i}>
                                                                <TableCell className="font-medium flex flex-none gap-2 items-center"><LuTextCursorInput
                                                                    className="text-[--gray]"
                                                                /> <TypeProperty prop={prop} /></TableCell>
                                                                <TableCell><TypeValue value={prop.value} /></TableCell>
                                                                <TableCell><TypePropertyDefault prop={prop} /></TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                })}
                                                {/*Anatomy Classes*/}
                                                {type.typeProps.filter(v => v.value.includes("ComponentAnatomy")).map((prop, i) => {
                                                    return <AnatomyRow
                                                        key={prop.value}
                                                        prop={prop}
                                                        classes={getComponentAnatomyClassNames(prop.value, parsedAnatomies)}
                                                    />
                                                })}
                                                {/*BasicFieldOptions Classes*/}
                                                {type.typeProps.filter(v => v.value === "BasicFieldOptions").map((prop, i) => {
                                                    return <AnatomyRow
                                                        key={prop.value}
                                                        prop={prop}
                                                        classes={["fieldLabel", "fieldAsterisk", "fieldDetails", "field", "fieldHelpText",
                                                            "fieldErrorText"]}
                                                    />
                                                })}
                                                {/*InputStyling Classes*/}
                                                {type.typeProps.filter(v => v.value === "InputStyling").map((prop, i) => {
                                                    return <AnatomyRow
                                                        key={prop.value}
                                                        prop={prop}
                                                        classes={["iconClass", "addonClass"]}
                                                    />
                                                })}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="anatomy">
                    <AccordionTrigger>Anatomy</AccordionTrigger>
                    <AccordionContent>
                        <div className="relative">
                            {Codes[0]}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export const codeStyles = cn("border bg-gray-50 dark:bg-gray-900 rounded-[--radius] py-1 px-1.5 flex-none")

export function TypeProperty({ prop }: { prop: ParsedTypeProperty }) {
    const lines = prop.description?.replaceAll("*", "\n\n")?.split("\n\n")?.filter(n => n.trim() !== "")
    const popoverLines = lines?.filter(n => !n.trim().startsWith("@default"))
    return (
        <div className="flex gap-1 items-center">
            {prop.name.endsWith("Class") ?
                <span className="flex font-normal flex-none gap-2 items-center text-[--muted]"><BiPalette className="text-lg" /> {prop.name}
                </span> : prop.name}
            {" "}{prop.required && <span className="text-[--red] text-lg">*</span>}
            {" "}{!!prop.description && (
            <Popover
                trigger={<span className="cursor-pointer"><BiInfoCircle className="text-[--muted] hover:text-[--foreground] text-lg" /></span>}
            >
                <p className="text-sm">
                    {popoverLines?.map((line, i) => (
                        <span key={i}>
                            {line.trim()}
                            <br />
                            {i !== (popoverLines.length - 1) && <br />}
                        </span>
                    ))}
                </p>
            </Popover>
        )}
        </div>
    )
}

export function TypePropertyDefault({ prop }: { prop: ParsedTypeProperty }) {
    return (
        <div className="flex gap-1 items-center">
            {prop.description?.replaceAll("*", "\n").split("\n").filter(n => n.trim().startsWith("@default")).map((line, i) => (
                <code key={i}>
                    {line.replace("@default", "").trim()}
                </code>
            ))}
        </div>
    )
}

export function TypeValue({ value }: { value: string }) {

    if (value.includes("Primitive.") && !value.toLowerCase().includes("command")) {
        const radixType = value.split("typeof ")[1].split(".")
        const part = radixType[1]?.split(">")[0]
        const component = radixType[0].replace("Primitive", "")
        return <Link
            href={`https://www.radix-ui.com/primitives/docs/components/${kebabCase(component).toLowerCase()}#${part?.toLowerCase()}`}
            className="text-[--indigo] hover:underline"
            target="_blank"
            rel="noreferrer"
        >
            {value}
        </Link>
    } else if (value.includes("Primitive.") && value.includes("Command")) {
        return <Link
            href={`https://github.com/pacocoursey/cmdk`}
            className="text-[--indigo] hover:underline"
            target="_blank"
            rel="noreferrer"
        >
            {value}
        </Link>
    }

    if (value === "CarouselOptions") {
        return <Link
            href={`https://www.embla-carousel.com/api/options/#reference`}
            className="text-[--indigo] font-medium hover:underline flex flex-none gap-1 items-center"
            target="_blank"
            rel="noreferrer"
        >
            {value} <BiLinkExternal />
        </Link>
    } else if (value.startsWith("CarouselPlugin")) {
        return <Link
            href={`https://www.embla-carousel.com/api/plugins/`}
            className="text-[--indigo] font-medium hover:underline flex flex-none gap-1 items-center"
            target="_blank"
            rel="noreferrer"
        >
            {value} <BiLinkExternal />
        </Link>
    } else if (value.includes("DayPickerBase")) {
        return <Link
            href={`https://react-day-picker.js.org/api/interfaces/DayPickerBase`}
            className="text-[--indigo] font-medium hover:underline flex flex-none gap-1 items-center"
            target="_blank"
            rel="noreferrer"
        >
            {value} <BiLinkExternal />
        </Link>
    } else if (value.includes("Sonner")) {
        return <Link
            href={`https://sonner.emilkowal.ski/toaster#api-reference`}
            className="text-[--indigo] font-medium hover:underline flex flex-none gap-1 items-center"
            target="_blank"
            rel="noreferrer"
        >
            {value} <BiLinkExternal />
        </Link>
    }

    return <code className={codeStyles}>{value}</code>
}



"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/workshop/accordion"
import { HoverCard } from "@/workshop/hover-card"
import { Popover } from "@/workshop/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/workshop/table"
import kebabCase from "lodash/kebabCase"
import Link from "next/link"
import * as React from "react"
import { useEffect } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { ParsedType, ParsedTypeProperty, parseTypes } from "../../lib/type-parser"

interface ComponentAnatomyProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string
}

export function ComponentAnatomy({
    children,
    className,
    ...props
}: ComponentAnatomyProps) {

    const [parsedTypes, setParsedTypes] = React.useState<ParsedType[]>([])

    const Codes = React.Children.toArray(children) as React.ReactElement[]

    // Types
    useEffect(() => {
        const CodeEl = Codes[1]
        if (typeof CodeEl?.props["data-rehype-pretty-code-fragment"] !== "undefined") {
            const [Code] = React.Children.toArray(CodeEl.props.children) as React.ReactElement[]
            const rawString = Code?.props?.value || Code?.props?.__rawString__ || null
            let parsedTypesRes = parseTypes(rawString) || []

            // Replace BaseChartProps with the actual props
            let i1 = parsedTypesRes.findIndex(type => type.typeValues.find(prop => prop.value === "BaseChartProps"))
            if (i1 !== -1) {
                parsedTypesRes[i1].typeValues = [...BaseChartProps.typeValues,
                    ...parsedTypesRes[i1].typeValues].filter((prop) => prop.value !== "BaseChartProps")
            }

            setParsedTypes(parsedTypesRes)
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
                            {parsedTypes.map((type, i) => (
                                <div key={type.name + type.kind}>
                                    <p className="font-semibold text-sm tracking-wider w-fit bg-brand-50 dark:bg-gray-800 text-[--brand] dark:text-gray-50 px-3 py-1">{type.name.replace(
                                        "Props",
                                        "")}</p>
                                    <Table className="rounded-[--radius] table-fixed">
                                        <TableHeader className="bg-[--background] text-md font-medium">
                                            <TableRow className="">
                                                <TableHead className="w-[200px]">Prop</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead className="w-[200px]">Default</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {type.typeValues.map((prop, i) => (
                                                <TableRow key={prop.name + i}>
                                                    <TableCell><TypeProperty prop={prop} /></TableCell>
                                                    <TableCell><TypeValue value={prop.value} /></TableCell>
                                                    <TableCell><TypePropertyDefault prop={prop} /></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ))}
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

export function TypeProperty({ prop }: { prop: ParsedTypeProperty }) {
    const lines = prop.description?.replaceAll("*", "\n\n")?.split("\n\n")?.filter(n => n.trim() !== "")
    const popoverLines = lines?.filter(n => !n.trim().startsWith("@default"))
    return (
        <div className="flex gap-1 items-center">
            {prop.name} {prop.required && <span className="text-[--red] text-lg">*</span>} {!!prop.description && (
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
    } else if(value.includes("Primitive.") && value.includes("Command")) {
        return <Link
            href={`https://github.com/pacocoursey/cmdk`}
            className="text-[--indigo] hover:underline"
            target="_blank"
            rel="noreferrer"
        >
            {value}
        </Link>
    }

    if (value === "InputStyling" || value === "BasicFieldOptions") {
        return <Link
            href={`#`}
            className="text-[--orange] font-medium hover:underline"
        >
            {value}
        </Link>
    }

    if (value === "CarouselOptions") {
        return <Link
            href={`https://www.embla-carousel.com/api/options/#reference`}
            className="text-[--indigo] font-medium hover:underline"
        >
            {value}
        </Link>
    } else if (value.startsWith("CarouselPlugin")) {
        return <Link
            href={`https://www.embla-carousel.com/api/plugins/`}
            className="text-[--indigo] font-medium hover:underline"
        >
            {value}
        </Link>
    }

    if (value.includes("VariantProps")) {
        return <HoverCard
            trigger={<span className="flex items-center gap-1 text-[--blue] w-fit">{value} <BiInfoCircle className="text-[--blue] text-lg" /></span>}
        >
            Check out the Anatomy source code to see the available variants props for this component.
        </HoverCard>
    }

    if (value.includes("ComponentAnatomy")) {
        return <HoverCard
            trigger={<span className="flex items-center gap-1 text-[--brand] w-fit">{value}
                <BiInfoCircle className="text-[--brand] text-lg" /></span>}
        >
            Check out the Anatomy source code to see the available class properties for this component.
        </HoverCard>
    }

    return <code className="border bg-gray-50 dark:bg-gray-900 rounded-[--radius] py-1 px-1.5">{value}</code>
}

export const BaseChartProps = {
    "kind": "type",
    "name": "BaseChartProps",
    "typeValues": [
        {
            "name": "data",
            "required": true,
            "description": "* The data to be displayed in the chart. * An array of objects. Each object represents a data point.",
            "value": "any[] | null | undefined",
        },
        {
            "name": "categories",
            "required": true,
            "description": "* Data categories. Each string represents a key in a data object. * e.g. [\"Jan\", \"Feb\", \"Mar\"]",
            "value": "string[]",
        },
        {
            "name": "index",
            "required": true,
            "description": "* The key to map the data to the axis. It should match the key in the data object. * e.g. \"value\"",
            "value": "string",
        },
        {
            "name": "colors",
            "required": false,
            "description": "* Color palette to be used in the chart.",
            "value": "ChartColor[]",
        },
        {
            "name": "valueFormatter",
            "required": false,
            "description": "* Changes the text formatting for the y-axis values.",
            "value": "ChartValueFormatter",
        },
        {
            "name": "startEndOnly",
            "required": false,
            "description": "* Show only the first and last elements in the x-axis. Great for smaller charts or sparklines. * @default false",
            "value": "boolean",
        },
        {
            "name": "showXAxis",
            "required": false,
            "description": "* Controls the visibility of the X axis. * @default true",
            "value": "boolean",
        },
        {
            "name": "showYAxis",
            "required": false,
            "description": "* Controls the visibility of the Y axis. * @default true",
            "value": "boolean",
        },
        {
            "name": "yAxisWidth",
            "required": false,
            "description": "* Controls width of the vertical axis. * @default 56",
            "value": "number",
        },
        {
            "name": "showAnimation",
            "required": false,
            "description": "* Sets an animation to the chart when it is loaded. * @default true",
            "value": "boolean",
        },
        {
            "name": "showTooltip",
            "required": false,
            "description": "* Controls the visibility of the tooltip. * @default true",
            "value": "boolean",
        },
        {
            "name": "showLegend",
            "required": false,
            "description": "* Controls the visibility of the legend. * @default true",
            "value": "boolean",
        },
        {
            "name": "showGridLines",
            "required": false,
            "description": "* Controls the visibility of the grid lines. * @default true",
            "value": "boolean",
        },
        {
            "name": "autoMinValue",
            "required": false,
            "description": "* Adjusts the minimum value in relation to the magnitude of the data. * @default false",
            "value": "boolean",
        },
        {
            "name": "minValue",
            "required": false,
            "description": "* Sets the minimum value of the shown chart data.",
            "value": "number",
        },
        {
            "name": "maxValue",
            "required": false,
            "description": "* Sets the maximum value of the shown chart data.",
            "value": "number",
        },
        {
            "name": "allowDecimals",
            "required": false,
            "description": "* Controls if the ticks of a numeric axis are displayed as decimals or not. * @default true",
            "value": "boolean",
        },
        {
            "name": "emptyDisplay",
            "required": false,
            "description": "* Element to be displayed when there is no data. * @default `<></>`",
            "value": "React.ReactElement",
        },
    ],
}

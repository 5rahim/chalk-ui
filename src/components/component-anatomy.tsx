"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/workshop/accordion"
import { cn } from "@/workshop/core/styling"
import { HoverCard } from "@/workshop/hover-card"
import { Popover } from "@/workshop/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/workshop/table"
import kebabCase from "lodash/kebabCase"
import Link from "next/link"
import * as React from "react"
import { BiInfoCircle, BiLinkExternal, BiPalette } from "react-icons/bi"
import { LuTextCursorInput } from "react-icons/lu"
import { getComponentAnatomyClassNames, getComponentAnatomyVariants, parseAnatomies, ParsedAnatomy } from "../../lib/anatomy-parser"
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
            let i1 = res.findIndex(type => type.typeValues.find(prop => prop.value === "BaseChartProps"))
            if (i1 !== -1) {
                res[i1].typeValues = [...BaseChartProps.typeValues, ...res[i1].typeValues].filter((prop) => prop.value !== "BaseChartProps")
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
                                                {type.typeValues.filter(v => !v.value.includes("ComponentAnatomy") &&
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
                                                {type.typeValues.filter(v => v.value.includes("VariantProps")).map((prop, i) => {
                                                    return <VariantPropsRow key={prop.value} prop={prop} anatomies={parsedAnatomies} />
                                                })}
                                                {/*BasicFieldOptions*/}
                                                {type.typeValues.filter(v => v.value === "BasicFieldOptions").map(() => {
                                                    return BasicFieldOptionsTypes.map((prop, i) => {
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
                                                {type.typeValues.filter(v => v.value === "InputStyling").map(() => {
                                                    return InputStylingTypes.map((prop, i) => {
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
                                                {type.typeValues.filter(v => v.value.includes("ComponentAnatomy") ||
                                                    v.value.includes("Pick<ComponentAnatomy"),
                                                ).map((prop, i) => {
                                                    return <AnatomyRow
                                                        key={prop.value}
                                                        prop={prop}
                                                        classes={getComponentAnatomyClassNames(prop.value, parsedAnatomies)}
                                                    />
                                                })}
                                                {/*BasicFieldOptions Classes*/}
                                                {type.typeValues.filter(v => v.value === "BasicFieldOptions").map((prop, i) => {
                                                    return <AnatomyRow
                                                        key={prop.value}
                                                        prop={prop}
                                                        classes={["fieldLabel", "fieldAsterisk", "fieldDetails", "field", "fieldHelpText",
                                                            "fieldErrorText"]}
                                                    />
                                                })}
                                                {/*InputStyling Classes*/}
                                                {type.typeValues.filter(v => v.value === "InputStyling").map((prop, i) => {
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

const codeStyles = cn("border bg-gray-50 dark:bg-gray-900 rounded-[--radius] py-1 px-1.5")

export function AnatomyRow({ prop, classes }: { prop: ParsedTypeProperty, classes: string[] }) {

    const data = React.useMemo(() => {
        return classes.map(cn => cn === "rootClass" ? "className" : cn)
    }, [])

    if (!data.length) return null

    return data.map((d, i) => {
        return (
            <TableRow key={d}>
                <TableCell><span className="flex flex-none gap-2 items-center text-[--muted]"><BiPalette className="text-lg" /> {d}</span></TableCell>
                <TableCell><code className={codeStyles}>string</code></TableCell>
                <TableCell></TableCell>
            </TableRow>
        )
    })
}

export function VariantPropsRow({ prop, anatomies }: { prop: ParsedTypeProperty, anatomies: ParsedAnatomy[] }) {

    const data = React.useMemo(() => {
        return getComponentAnatomyVariants(prop.value, anatomies)
    }, [])

    if (!data.length) return null

    return data.map((d, i) => {
        return (
            <TableRow key={d.name}>
                <TableCell>{d.name}</TableCell>
                <TableCell className="leading-8">{d.type === "boolean" ? <code className={codeStyles}>{d.type}</code> : d.values.map((v, i) => {
                    return (
                        <>
                            {i !== 0 && " | "}
                            <code key={v} className={codeStyles}>{v}</code>
                        </>
                    )
                })}</TableCell>
                <TableCell><code>{d.default}</code></TableCell>
            </TableRow>
        )
    })
}

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

    return <code className={codeStyles}>{value}</code>
}


const BasicFieldOptionsTypes = [
    {
        "name": "id",
        "required": false,
        "description": "* The id of the field. If not provided, a unique id will be generated.",
        "value": "string | undefined"
    },
    {
        "name": "name",
        "required": false,
        "description": "* The form field name.",
        "value": "string"
    },
    {
        "name": "label",
        "required": false,
        "description": "* The label of the field.",
        "value": "React.ReactNode"
    },
    {
        "name": "labelProps",
        "required": false,
        "description": "* Additional props to pass to the label element.",
        "value": "React.LabelHTMLAttributes<HTMLLabelElement>"
    },
    {
        "name": "help",
        "required": false,
        "description": "* Help or description text to display below the field.",
        "value": "React.ReactNode"
    },
    {
        "name": "error",
        "required": false,
        "description": "* Error text to display below the field.",
        "value": "string"
    },
    {
        "name": "required",
        "required": false,
        "description": "* If `true`, the field will be required.",
        "value": "boolean"
    },
    {
        "name": "disabled",
        "required": false,
        "description": "* If `true`, the field will be disabled.",
        "value": "boolean"
    },
    {
        "name": "readonly",
        "required": false,
        "description": "* If `true`, the field will be readonly.",
        "value": "boolean"
    }
]

const InputStylingTypes = [
    {
        "name": "intent",
        "required": false,
        "description": "The style of the input.",
        "value": '"basic" | "filled" | "unstyled"'
    },
    {
        "name": "leftAddon",
        "required": false,
        "description": "",
        "value": "string"
    },
    {
        "name": "leftIcon",
        "required": false,
        "description": "",
        "value": "React.ReactNode"
    },
    {
        "name": "rightAddon",
        "required": false,
        "description": "",
        "value": "string"
    },
    {
        "name": "rightIcon",
        "required": false,
        "description": "",
        "value": "React.ReactNode"
    }
]

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

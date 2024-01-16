"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/workshop/accordion"
import { useIsomorphicLayoutEffect } from "@/workshop/core/hooks"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/workshop/table"
import * as React from "react"
import { ParsedType, parseTypes } from "../../lib/type-parser"

interface ComponentAnatomyProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string
}

export function ComponentAnatomy({
    children,
    className,
    ...props
}: ComponentAnatomyProps) {

    const [parsedTypes, setParsedTypes] = React.useState<ParsedType[]>([])

    useIsomorphicLayoutEffect(() => {
        // @ts-expect-error
        let rawString = children[1].props.children.props.__rawString__
        setParsedTypes(parseTypes(rawString) || [])
    }, [])

    const anatomyContent = React.useMemo(() => {
        // @ts-expect-error
        return children[0].props.children.props.__rawString__
    }, [])

    return (
        <div className="space-y-4">
            <Accordion
                type="multiple"
                className="space-y-2"
                triggerClass="bg-[--subtle] hover:bg-[--subtle-highlight] rounded-[--radius]"
                itemClass="border-none"
                contentClass="px-0 py-0"
                defaultValue={["types"]}
            >
                <AccordionItem value="types">
                    <AccordionTrigger>Types</AccordionTrigger>
                    <AccordionContent>
                        <div className="py-4 space-y-6">
                            {parsedTypes.map((type, i) => (
                                <div key={type.name + type.kind}>
                                    <h4 className="text-medium mb-2">{type.name.replace("Props", "")}</h4>
                                    <Table className="border rounded-[--radius] table-fixed">
                                        <TableHeader className="bg-[--subtle-highlight]">
                                            <TableRow>
                                                <TableHead>Prop</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Default</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {type.typeValues.map((prop, i) => (
                                                <TableRow key={prop.name + i}>
                                                    <TableCell>{prop.name}</TableCell>
                                                    <TableCell>{prop.value}</TableCell>
                                                    <TableCell>{""}</TableCell>
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
                        <div>
                            {/*// @ts-expect-error*/}
                            {children[0]}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

const obj = [
    {
        type: "type",
        name: "AutocompleteOption",
        typeValues: [{
            type: "object",
            value: "{ value: string | null, label: string }",
        }],
    },
    {
        type: "type",
        name: "AutocompleteProps",
        typeValues: [
            {
                type: "type",
                value: `Omit<React.ComponentPropsWithRef<"input">`,
            },
            {
                type: "property",
                name: "options",
                required: true,
                description: "The autocompletion options.",
                value: "AutocompleteOption[]",
            },
        ],
    },
]

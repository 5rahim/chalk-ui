import { codeStyles } from "@/components/component-anatomy/component-anatomy"
import { TableCell, TableRow } from "@/workshop/table"
import * as React from "react"
import { BiPalette } from "react-icons/bi"
import { getComponentAnatomyVariants, ParsedAnatomy } from "../../../lib/anatomy-parser"
import { ParsedTypeProperty } from "../../../lib/type-parser"

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

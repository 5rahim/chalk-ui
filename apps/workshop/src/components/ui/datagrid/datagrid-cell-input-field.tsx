"use client"

import React from "react"
import { cn, ComponentWithAnatomy, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"
import { DataGridEditingHelperProps } from "./helpers.ts"
import { AnyZodObject, z } from "zod"
import { Cell, Row } from "@tanstack/react-table"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DataGridCellInputFieldAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-DataGridCellInputField__root",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * DataGridCellInputField
 * -----------------------------------------------------------------------------------------------*/

export type DataGridCellInputFieldContext<Schema extends AnyZodObject, Key extends keyof z.infer<Schema>> = {
    value: Extract<z.infer<Schema>, Key>,
    onChange: (value: z.infer<Schema>[Key]) => void
    ref: React.MutableRefObject<any>
}

export interface DataGridCellInputFieldProps<S extends AnyZodObject, T extends Record<string, any>, K extends keyof z.infer<S>>
    extends ComponentWithAnatomy<typeof DataGridCellInputFieldAnatomy> {
    meta: DataGridEditingHelperProps<S, K>
    cell: Cell<T, unknown>
    row: Row<T>
    onValueUpdated: (value: unknown, row: Row<T>, cell: Cell<T, unknown>, schema: AnyZodObject, key: keyof z.infer<S>) => void
}

export function DataGridCellInputField<S extends AnyZodObject, T extends Record<string, any>, K extends keyof z.infer<S>>(props: DataGridCellInputFieldProps<S, T, K>) {

    const {
        rootClassName,
        cell,
        row,
        onValueUpdated, // Emit updates
        meta: {
            schema,
            key,
            field,
            valueFormatter: _valueFormatter,
        },
    } = props

    const valueFormatter = (_valueFormatter ?? function (value: any) {
        return value
    }) as (value: any) => any

    const cellValue = valueFormatter(cell.getContext().getValue())
    const inputRef = React.useRef<any>(null)

    const [value, setValue] = React.useState<Extract<z.infer<S>, K>>(cellValue)

    React.useEffect(() => {
        onValueUpdated(cellValue, row, cell, schema, key)
        inputRef.current?.focus()
    }, [])

    React.useLayoutEffect(() => {
        onValueUpdated(valueFormatter(value), row, cell, schema, key)
    }, [value])


    return (
        <div
            className={cn(DataGridCellInputFieldAnatomy.root(), rootClassName)}
        >
            {field({
                value: value,
                onChange: setValue,
                ref: inputRef,
            })}
        </div>
    )

}

DataGridCellInputField.displayName = "DataGridCellInputField"

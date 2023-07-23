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

/**
 * withEditing({ field: (ctx: DataGridCellInputFieldContext) => <></> })
 */
export type DataGridCellInputFieldContext<Schema extends AnyZodObject, Key extends keyof z.infer<Schema>> = {
    value: z.infer<Schema>[Key],
    onChange: (value: z.infer<Schema>[Key]) => void
    ref: React.MutableRefObject<any>
}

export interface DataGridCellInputFieldProps<
    Schema extends AnyZodObject,
    T extends Record<string, any>,
    Key extends keyof z.infer<Schema>
>
    extends ComponentWithAnatomy<typeof DataGridCellInputFieldAnatomy> {
    meta: DataGridEditingHelperProps<Schema, Key>
    cell: Cell<T, unknown>
    row: Row<T>
    onValueUpdated: (value: unknown, row: Row<T>, cell: Cell<T, unknown>, schema: AnyZodObject, key: keyof z.infer<Schema>) => void
}

export function DataGridCellInputField<
    Schema extends AnyZodObject,
    T extends Record<string, any>,
    Key extends keyof z.infer<Schema>
>(props: DataGridCellInputFieldProps<Schema, T, Key>) {

    const {
        rootClassName,
        cell,
        row,
        onValueUpdated, // Emits updates to the hook
        meta: {
            schema,
            key,
            field,
            valueFormatter: _valueFormatter,
        },
    } = props

    const defaultValueFormatter = (value: any) => value
    const valueFormatter = (_valueFormatter ?? defaultValueFormatter) as (value: any) => any

    const cellValue = valueFormatter(cell.getContext().getValue())
    const inputRef = React.useRef<any>(null)

    const [value, setValue] = React.useState<z.infer<Schema>[Key]>(cellValue)

    React.useEffect(() => {
        onValueUpdated(cellValue, row, cell, schema, key)
        inputRef.current?.focus()
    }, [])

    return (
        <div
            className={cn(DataGridCellInputFieldAnatomy.root(), rootClassName)}
        >
            {field({
                value: value,
                onChange: (value => {
                    setValue(value)
                    onValueUpdated(valueFormatter(value), row, cell, schema, key)
                }),
                ref: inputRef,
            })}
        </div>
    )

}

DataGridCellInputField.displayName = "DataGridCellInputField"

"use client"

import React from "react"
import { cn, ComponentWithAnatomy, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"
import { DataGridEditingHelperProps } from "./helpers.ts"
import { ZodSchema } from "zod"
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

export type DataGridCellInputFieldControlProps = {
    value: any,
    onChange: (value: any) => void
    ref: React.MutableRefObject<any>
}

export interface DataGridCellInputFieldProps<S extends ZodSchema, T extends Record<string, any>>
    extends ComponentWithAnatomy<typeof DataGridCellInputFieldAnatomy> {
    meta: DataGridEditingHelperProps<S>
    cell: Cell<T, unknown>
    row: Row<any>
    onValueUpdated: (value: unknown, row: Row<T>, cell: Cell<T, unknown>, schema: ZodSchema) => void
}

export function DataGridCellInputField<S extends ZodSchema, T extends Record<string, any>>(props: DataGridCellInputFieldProps<S, T>) {

    const {
        rootClassName,
        cell,
        row,
        onValueUpdated, // Emit updates
        meta: {
            schema,
            field,
            valueFormatter: _valueFormatter,
        },
    } = props

    const valueFormatter = (_valueFormatter ?? function (value: any) {
        return value
    }) as (value: any) => any

    const cellValue = valueFormatter(cell.getContext().getValue())
    const inputRef = React.useRef<any>(null)

    const [value, setValue] = React.useState<unknown>(cellValue)

    React.useEffect(() => {
        onValueUpdated(cellValue, row, cell, schema)
        inputRef.current?.focus()
    }, [])

    React.useLayoutEffect(() => {
        onValueUpdated(valueFormatter(value), row, cell, schema)
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

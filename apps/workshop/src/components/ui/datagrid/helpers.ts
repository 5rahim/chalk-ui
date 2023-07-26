import { BuiltInFilterFn, Column, ColumnDef } from "@tanstack/react-table"
import { AnyZodObject, z } from "zod"
import { DataGridCellInputFieldContext } from "./datagrid-cell-input-field"
import React from "react"

/* -------------------------------------------------------------------------------------------------
 * Editing
 * -----------------------------------------------------------------------------------------------*/

export type DataGridEditingHelper<Schema extends AnyZodObject, Key extends keyof z.infer<Schema>> = {
    schema: Schema,
    key: Key
    field: (props: DataGridCellInputFieldContext<Schema, Key>) => React.ReactElement,
    valueFormatter?: (value: z.infer<Schema>[Key]) => z.infer<Schema>[Key]
}

function withEditing<Schema extends AnyZodObject, Key extends keyof z.infer<Schema>>(params: DataGridEditingHelper<Schema, Key>) {
    return {
        editingMeta: {
            ...params,
        },
    }
}

/* -------------------------------------------------------------------------------------------------
 * Filtering
 * -----------------------------------------------------------------------------------------------*/

type FilteringTypes = "select" | "radio" | "checkbox" | "boolean" | "date-range"

export interface FilterFns {
    dateRangeFilter: any
}

type _DefaultFilteringProps = {
    type: FilteringTypes
    name: string,
    icon?: React.ReactElement
    options?: { value: string, label?: any }[]
    valueFormatter?: (value: string) => string
}

type DefaultFilteringProps<T extends FilteringTypes> = {
    type: T
    name: string,
    icon?: React.ReactElement
    options: { value: string, label?: T extends "select" ? string : React.ReactNode }[]
    valueFormatter?: (value: string) => string
}

// Improve type safety by removing "options" when the type doesn't need it
export type DataGridFilteringHelper<T extends FilteringTypes = "select"> =
    T extends Extract<FilteringTypes, "select" | "radio" | "checkbox">
        ? DefaultFilteringProps<T>
        : Omit<DefaultFilteringProps<T>, "options">

/**
 * Built-in filter functions supported DataGrid
 */
export type DataGridSupportedFilterFn = Extract<BuiltInFilterFn, "equalsString" | "arrIncludesSome" | "inNumberRange"> | "dateRangeFilter"

function withFiltering<T extends FilteringTypes>(params: DataGridFilteringHelper<T>) {
    return {
        filteringMeta: {
            ...params,
        },
    }
}

const getFilterFn = (type: FilteringTypes) => {
    const fns: { [key: string]: DataGridSupportedFilterFn } = {
        select: "equalsString",
        boolean: "equalsString",
        checkbox: "arrIncludesSome",
        radio: "equalsString",
        "date-range": "dateRangeFilter",
    }
    return fns[type] as any
}

/* -------------------------------------------------------------------------------------------------
 * Value formatter
 * -----------------------------------------------------------------------------------------------*/

function withValueFormatter<T extends any>(callback: (value: T) => T) {
    return {
        valueFormatter: callback,
    }
}

export function getValueFormatter<T>(column: Column<T>): (value: any) => any {
    return (column.columnDef.meta as any)?.valueFormatter || ((value: any) => value)
}

/* -------------------------------------------------------------------------------------------------
 * Column Def Helpers
 * -----------------------------------------------------------------------------------------------*/

export type DataGridHelpers = "filteringMeta" | "editingMeta" | "valueFormatter"

export type DataGridColumnDefHelpers<T extends Record<string, any>> = {
    withFiltering: typeof withFiltering
    getFilterFn: typeof getFilterFn
    withEditing: typeof withEditing
    withValueFormatter: typeof withValueFormatter
}

/**
 * Return
 * @example
 * const columns = useMemo(() => createDataGridColumns<T>(() => [
 *  ...
 * ]), [])
 * @param callback
 */
export function createDataGridColumns<T extends Record<string, any>>(
    callback: (helpers: DataGridColumnDefHelpers<T>) => Array<ColumnDef<T>>,
) {
    return callback({
        withFiltering,
        getFilterFn,
        withEditing,
        withValueFormatter,
    })
}


export function getColumnHelperMeta<T, K extends DataGridHelpers>(column: Column<T>, helper: K) {
    return (column.columnDef.meta as any)?.[helper] as (
        K extends "filteringMeta" ? _DefaultFilteringProps :
            K extends "editingMeta" ? DataGridEditingHelper<any, any> :
                K extends "valueFormatter" ? ReturnType<typeof withValueFormatter> :
                    never
        ) | undefined
}

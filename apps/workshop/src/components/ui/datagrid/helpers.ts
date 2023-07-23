import { BuiltInFilterFn, ColumnDef } from "@tanstack/react-table"
import { AnyZodObject, z } from "zod"
import { DataGridCellInputFieldContext } from "./datagrid-cell-input-field"
import React from "react"

/* -------------------------------------------------------------------------------------------------
 * Editing
 * -----------------------------------------------------------------------------------------------*/

export type DataGridEditingHelperProps<Schema extends AnyZodObject, Key extends keyof z.infer<Schema>> = {
    schema: Schema,
    key: Key
    field: (props: DataGridCellInputFieldContext<Schema, Key>) => React.ReactElement,
    valueFormatter?: (value: z.infer<Schema>[Key]) => z.infer<Schema>[Key]
}

function withEditing<Schema extends AnyZodObject, Key extends keyof z.infer<Schema>>(params: DataGridEditingHelperProps<Schema, Key>) {
    return {
        editable: {
            ...params,
        },
    }
}

/* -------------------------------------------------------------------------------------------------
 * Filtering
 * -----------------------------------------------------------------------------------------------*/

type FilteringTypes = "select" | "radio" | "checkbox" | "boolean"

type DefaultFilteringProps<T extends FilteringTypes> = {
    type: T
    name: string,
    icon?: React.ReactElement
    options: { value: string, label?: T extends "select" ? string : React.ReactNode }[]
    valueFormatter?: (value: string) => string
}

export type DataGridFilteringHelperProps<T extends FilteringTypes = "select"> =
    T extends Extract<FilteringTypes, "select" | "radio" | "checkbox">
        ? DefaultFilteringProps<T>
        : Omit<DefaultFilteringProps<T>, "options">

/**
 * Built-in filter functions supported DataGrid
 */
export type DataGridSupportedFilterFn = Extract<BuiltInFilterFn, "equalsString" | "arrIncludesSome">

function withFiltering<T extends FilteringTypes>(params: DataGridFilteringHelperProps<T>) {
    return {
        filter: {
            ...params,
        },
    }
}

const getFilteringType = (type: FilteringTypes) => {
    const fns: { [key: string]: DataGridSupportedFilterFn } = {
        select: "equalsString",
        boolean: "equalsString",
        checkbox: "arrIncludesSome",
        radio: "equalsString",
    }
    return fns[type] as DataGridSupportedFilterFn
}

/* -------------------------------------------------------------------------------------------------
 * Columns
 * -----------------------------------------------------------------------------------------------*/

export type DataGridColumnDefHelpers = {
    withFiltering: typeof withFiltering
    getFilteringType: typeof getFilteringType
    withEditing: typeof withEditing
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
    callback: (helpers: DataGridColumnDefHelpers) => ColumnDef<T>[],
) {
    return callback({
        withFiltering,
        getFilteringType,
        withEditing,
    })
}

import { BuiltInFilterFn, ColumnDef } from "@tanstack/react-table"

/* -------------------------------------------------------------------------------------------------
 * Filtering
 * -----------------------------------------------------------------------------------------------*/

export type DataGridFilteringProps = {
    type: "select" | "radio" | "checkbox" | "boolean"
    name: string,
    icon?: React.ReactElement
    options?: { value: string, label?: React.ReactNode }[]
    valueFormatter?: (value: string) => string
}

/**
 * Built-in filter functions supported DataGrid
 */
export type DataGridSupportedFilterFn = Extract<BuiltInFilterFn, "equalsString" | "arrIncludesSome">

const withFiltering = (params: DataGridFilteringProps) => {
    const fns: { [key: string]: DataGridSupportedFilterFn } = {
        select: "equalsString",
        boolean: "equalsString",
        checkbox: "arrIncludesSome",
        radio: "equalsString"
    }
    return {
        filterFn: fns[params.type] as DataGridSupportedFilterFn,
        meta: {
            filter: {
                name: params.name,
                type: params.type,
                icon: params.icon,
                options: params.options,
                valueFormatter: params.valueFormatter
            },
        }
    }
}

const getFilteringType = (type: DataGridFilteringProps["type"]) => {
    const fns: { [key: string]: DataGridSupportedFilterFn } = {
        select: "equalsString",
        boolean: "equalsString",
        checkbox: "arrIncludesSome",
        radio: "equalsString"
    }
    return fns[type] as DataGridSupportedFilterFn
}

/* -------------------------------------------------------------------------------------------------
 * Columns
 * -----------------------------------------------------------------------------------------------*/

export type DataGridColumnDefOptions = {
    withFiltering: typeof withFiltering
    getFilteringType: typeof getFilteringType
}

/**
 * Return
 * @example
 * const columns = useMemo(() => createDataGridColumns<T>(() => [
 *  ...
 * ]), [])
 * @param callback
 */
export function createDataGridColumns<T extends Record<string, any>>(callback: (options: DataGridColumnDefOptions) => ColumnDef<T>[]) {
    return callback({
        withFiltering,
        getFilteringType
    })
}

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

const withFiltering = (params: DataGridFilteringProps) => {
    const fns: { [key: string]: BuiltInFilterFn } = {
        select: "equalsString",
        boolean: "equalsString",
        checkbox: "arrIncludesSome",
        radio: "equalsString"
    }
    return {
        filterFn: fns[params.type] as BuiltInFilterFn,
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

/* -------------------------------------------------------------------------------------------------
 * Columns
 * -----------------------------------------------------------------------------------------------*/

interface DataGridOptions {
    withFiltering: typeof withFiltering
}

/**
 * Return
 * @example
 * const columns = useMemo(() => createDataGridColumns<Item>(() => [
 *  ...
 * ]), [])
 * @param callback
 */
export function createDataGridColumns<T extends Record<string, any>>(callback: (options: DataGridOptions) => ColumnDef<T>[]) {
    return callback({
        withFiltering
    })
}

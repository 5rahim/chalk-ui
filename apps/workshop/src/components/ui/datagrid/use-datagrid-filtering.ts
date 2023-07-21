import { Column, ColumnFiltersState, Table } from "@tanstack/react-table"
import React, { useMemo } from "react"
import { DataGridFilteringHelperProps } from "./helpers.ts"

interface DataGridFilteringHookProps<T> {
    table: Table<T>,
    columnFilters: ColumnFiltersState,
}

export function useDataGridFiltering<T>(props: DataGridFilteringHookProps<T>) {

    const {
        table,
        columnFilters,
    } = props

    /**
     * Item filtering
     */
    const [filterableColumns, selectedFilteredColumns] = useMemo(() => {
        return [
            table.getAllLeafColumns().filter(n => n.getCanFilter() && (n.columnDef.meta as any)?.filter),
            table.getAllLeafColumns().filter(n => columnFilters.map(a => a.id).includes(n.id)),
        ]
    }, [table.getAllLeafColumns(), columnFilters])
    const unselectedFilterableColumns = filterableColumns.filter(n => !columnFilters.map(c => c.id).includes(n.id))

    // Get the default value for a filter when the user selects it
    const getFilterDefaultValue = React.useCallback((col: Column<any>) => {
        // Since the column is filterable, get options
        const options = (col.columnDef.meta as any)?.filter as DataGridFilteringHelperProps
        if (options.type === "select" || options.type === "radio") {
            return options.options?.[0]?.value ?? ""
        } else if (options.type === "boolean") {
            return "true"
        } else if (options.type === "checkbox") {
            return options.options?.map(n => n.value) ?? []
        }
        return null
    }, [])

    return {
        getFilterDefaultValue,
        unselectedFilterableColumns,
        selectedFilteredColumns,
        filterableColumns,
    }

}

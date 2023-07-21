import { useDataGridSize } from "./use-datagrid-size.ts"
import React from "react"
import { Table } from "@tanstack/react-table"

interface DataGridResponsivenessHookProps<T> {
    hideColumns: { below: number, hide: string[] }[],
    table: Table<T>
}

export function useDataGridResponsiveness<T>(props: DataGridResponsivenessHookProps<T>) {

    const {
        hideColumns,
        table,
    } = props

    const [tableRef, { width: tableWidth }] = useDataGridSize<HTMLDivElement>()

    React.useLayoutEffect(() => {
        hideColumns.map(({ below, hide }) => {
            table.getAllLeafColumns().map(column => {
                if (hide.includes(column.id)) {
                    if (tableWidth !== 0 && tableWidth < below) {
                        if (column.getIsVisible()) column.toggleVisibility(false)
                    } else {
                        if (!column.getIsVisible()) column.toggleVisibility(true)
                    }
                }
            })
        })
    }, [hideColumns, tableWidth])

    return {
        tableRef,
    }

}

import { useEffect } from "react"
import { Table } from "@tanstack/react-table"

interface DataGridRowSelectionHookProps<T> {
    onSelection?: (value: T[]) => void
    table: Table<T>,
    data: T[] | null
}

export function useDataGridRowSelection<T extends Record<string, any>>(props: DataGridRowSelectionHookProps<T>) {

    const {
        table,
        onSelection,
        data,
    } = props

    useEffect(() => {
        const selectedIndexArr = Object.keys(table.getState().rowSelection).map(v => parseInt(v))
        onSelection && onSelection(data?.filter((v, i) => selectedIndexArr.includes(i)) ?? [])
    }, [table.getState().rowSelection])

    const selectedRowCount = Object.keys(table.getState().rowSelection).length

    return {
        selectedRowCount,
    }

}

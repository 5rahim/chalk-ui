import { startTransition, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Row, Table } from "@tanstack/react-table"

/**
 * DataGrid Prop
 */
export type DataGridOnRowSelect<T> = (event: DataGridRowSelectedEvent<T>) => void

/**
 * Hook props
 */
type Props<T> = {
    enableServerSideRowSelection: boolean
    onRowSelect?: DataGridOnRowSelect<T>
    table: Table<T>,
    data: T[] | null
    displayedRows: Row<T>[]
    isServerSideMode: boolean
    serverSideRowSelectionPrimaryKey?: string
}

/**
 * Event
 */
export type DataGridRowSelectedEvent<T> = {
    data: T[],
    rows: Row<T>[]
}

export function useDataGridRowSelection<T extends Record<string, any>>(props: Props<T>) {

    const {
        table,
        data,
        onRowSelect,
        enableServerSideRowSelection,
        serverSideRowSelectionPrimaryKey: key = "id",
        displayedRows,
        isServerSideMode,
    } = props

    // SSR
    const pageIndex = useMemo(() => table.getState().pagination.pageIndex, [table.getState().pagination.pageIndex])
    const displayedRowsRef = useRef<Row<T>[]>(displayedRows)

    const [nonexistentSelectedRows, setNonexistentSelectedRows] = useState<{ id: string, row: Row<T> }[]>([])

    const [rowSelection, rows] = useMemo(() => [
        table.getState().rowSelection,
        table.getRowModel().rows,
    ], [table.getState().rowSelection, table.getRowModel().rows])

    useLayoutEffect(() => {
        // When the table is paginated
        if (displayedRows.length > 0 && enableServerSideRowSelection) {
            startTransition(() => {
                table.resetRowSelection()
                // Actualize nonexistent rows
                setNonexistentSelectedRows(prev => {
                    // Find the rows that were selected on the previous page
                    const rowIsSelected = (row: Row<T>) => Object.keys(rowSelection).map(v => parseInt(v)).includes(row.index)
                    const rowDoesntAlreadyExist = (row: Row<T>) => !prev.find(sr => sr.id === row.original[key])

                    const selectedRows = displayedRowsRef.current.filter(rowIsSelected).filter(rowDoesntAlreadyExist)

                    if (selectedRows.length > 0) {
                        return [...prev, ...selectedRows.map(row => ({ id: row.original[key], row: row }))]
                    }

                    return prev
                })
                displayedRowsRef.current = displayedRows // Actualize displayed row
            })

            displayedRows.map(displayedRow => {
                if (nonexistentSelectedRows.some(row => row.id === displayedRow.original[key])) {
                    // If the currently displayed row is in the nonexistent array but isn't selected, select it
                    if (displayedRow.getCanSelect() && !displayedRow.getIsSelected()) {
                        displayedRow.toggleSelected(true)
                        // Then remove it from nonexistent
                        setNonexistentSelectedRows(prev => {
                            return [...prev.filter(row => row.id !== displayedRow.original[key])]
                        })
                    }
                }
            })
        }

    }, [pageIndex, displayedRows])

    useEffect(() => {
        /** Client-side row selection **/
        if (!isServerSideMode && data && data?.length > 0) {
            const selectedIndices = Object.keys(rowSelection).map(v => parseInt(v))

            if (selectedIndices.length > 0) {

                onRowSelect && onRowSelect({
                    data: data.filter((v, i) => selectedIndices.includes(i)) ?? [],
                    rows: rows.filter(row => selectedIndices.includes(row.index)),
                })

            }
        }
    }, [rowSelection, rows])

    useEffect(() => {
        /** Server-side row selection **/
        if (isServerSideMode && data && data?.length > 0) {
            const selectedIndices = Object.keys(rowSelection).map(v => parseInt(v))

            if ((+(Object.keys(rowSelection).length) + (nonexistentSelectedRows.length)) > 0) {

                startTransition(() => {
                    onRowSelect && onRowSelect({
                        data: [
                            ...data.filter((v, i) => selectedIndices.includes(i)),
                            ...nonexistentSelectedRows.map(nr => nr.row.original),
                        ],
                        rows: [
                            ...rows.filter(row => selectedIndices.includes(row.index)),
                            ...nonexistentSelectedRows.map(nr => nr.row),
                        ],
                    })
                })

            }
        }
    }, [rowSelection, nonexistentSelectedRows, rows])


    return {
        // On client-side row selection, the count is simply what is visibly selection. On server-side row selection, the count is what is visible+nonexistent rows
        selectedRowCount: (isServerSideMode && enableServerSideRowSelection) ? +(Object.keys(rowSelection).length) + (nonexistentSelectedRows.length) : Object.keys(rowSelection).length,
    }

}

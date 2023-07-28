import { startTransition, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Row, Table } from "@tanstack/react-table"
import _ from "lodash"

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
    rowSelectionPrimaryKey: string | undefined
    enableRowSelection: boolean
}

/**
 * Event
 */
export type DataGridRowSelectedEvent<T> = {
    data: T[]
}

export function useDataGridRowSelection<T extends Record<string, any>>(props: Props<T>) {

    const {
        table,
        data,
        onRowSelect,
        enableServerSideRowSelection,
        rowSelectionPrimaryKey: key,
        displayedRows,
        isServerSideMode,
        enableRowSelection,
    } = props

    const canSelect = useRef<boolean>(enableRowSelection)

    // Server mode
    const pageIndex = useMemo(() => table.getState().pagination.pageIndex, [table.getState().pagination.pageIndex])
    const pageSize = useMemo(() => table.getState().pagination.pageSize, [table.getState().pagination.pageSize])
    // Server mode
    const displayedRowsRef = useRef<Row<T>[]>(displayedRows)
    // Server mode
    const previousSelectionEvent = useRef<DataGridRowSelectedEvent<T>>({ data: [] })
    // Server mode
    const [nonexistentSelectedRows, setNonexistentSelectedRows] = useState<{ id: string, row: Row<T> }[]>([])

    const rowSelection = useMemo(() => table.getState().rowSelection, [table.getState().rowSelection])
    const rows = useMemo(() => table.getRowModel().rows, [table.getRowModel().rows])

    // Warnings
    useEffect(() => {
        if (enableRowSelection && !key) {
            console.error("[DataGrid] You've enable row selection without providing a primary key. Make sure to define the `rowSelectionPrimaryKey` prop.")
            canSelect.current = false
        }
    }, [])

    const firstCheckRef = useRef<boolean>(false)
    useEffect(() => {
        if (enableRowSelection && key && !firstCheckRef.current && displayedRows.length > 0 && !displayedRows.some(row => !!row.original[key])) {
            console.error("[DataGrid] The key provided by `rowSelectionPrimaryKey` does not match any property in the data.")
            firstCheckRef.current = true
            canSelect.current = false
        }
    }, [displayedRows])

    /** Server-side row selection **/
    useLayoutEffect(() => {
        // When the table is paginated
        if (displayedRows.length > 0 && enableServerSideRowSelection && !!key && canSelect.current) {
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
                        // Then remove it from nonexistent array
                        setNonexistentSelectedRows(prev => {
                            return [...prev.filter(row => row.id !== displayedRow.original[key])]
                        })
                    }
                }
            })
        }

    }, [pageIndex, pageSize, displayedRows])

    /** Client-side row selection **/
    useEffect(() => {
        if (!isServerSideMode && data && data?.length > 0 && canSelect.current) {
            const selectedIndices = Object.keys(rowSelection).map(v => parseInt(v))

            if (selectedIndices.length > 0) {

                onRowSelect && onRowSelect({
                    data: data.filter((v, i) => selectedIndices.includes(i)) ?? [],
                })

            }
        }
    }, [rowSelection, rows])

    useEffect(() => {
        /** Server-side row selection **/
        if (isServerSideMode && data && data?.length > 0 && canSelect.current && key) {
            const selectedIndices = Object.keys(rowSelection).map(v => parseInt(v))

            if ((+(Object.keys(rowSelection).length) + (nonexistentSelectedRows.length)) > 0) {

                startTransition(() => {
                    const result = {
                        data: [
                            ...data.filter((v, i) => selectedIndices.includes(i)),
                            ...nonexistentSelectedRows.map(nr => nr.row.original),
                        ],
                    }
                    // Compare current selection with previous
                    if (!isArrayEqual(result.data, previousSelectionEvent.current.data)) {
                        onRowSelect && onRowSelect(result)
                        previousSelectionEvent.current = result
                    }
                })

            }
        }
    }, [rowSelection])


    return {
        // On client-side row selection, the count is simply what is visibly selection. On server-side row selection, the count is what is visible+nonexistent rows
        selectedRowCount: (isServerSideMode && enableServerSideRowSelection) ? +(Object.keys(rowSelection).length) + (nonexistentSelectedRows.length) : Object.keys(rowSelection).length,
    }

}


const isArrayEqual = function (x, y) {
    return _(x).differenceWith(y, _.isEqual).isEmpty()
}

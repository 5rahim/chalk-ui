import { Row, Table } from "@tanstack/react-table"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { DataGridEditingHelperProps } from "./helpers.ts"
import _ from "lodash"
import { DataGridCellInputFieldProps } from "./datagrid-cell-input-field.tsx"
import { AnyZodObject } from "zod"
import { useToast } from "../toast"

interface DataGridEditingHookProps<T> {
    data: T[]
    table: Table<T>
    rows: Row<T>[]
    onSave?: (data: T) => void
    isMutating: boolean | undefined
    enableOptimisticUpdates: boolean
    onDataChange: React.Dispatch<React.SetStateAction<T[]>>
    optimisticUpdatePrimaryKey: string | undefined
}

export function useDataGridEditing<T extends Record<string, any>>(props: DataGridEditingHookProps<T>) {

    const {
        data,
        table,
        rows,
        onSave,
        isMutating,
        onDataChange,
        enableOptimisticUpdates,
        optimisticUpdatePrimaryKey,
    } = props

    const toast = useToast()

    const leafColumns = table.getAllLeafColumns()
    // Keep track of the state of each editable cell
    const [editableCellStates, setEditableCellStates] = useState<{ id: string, colId: string, isEditing: boolean }[]>([])

    // Track updated value
    const [activeValue, setActiveValue] = useState<unknown>(undefined)
    const [rowData, setRowData] = useState<T | undefined>(undefined)
    const [key, setKey] = useState<PropertyKey | undefined>(undefined)
    const [schema, setSchema] = useState<AnyZodObject | undefined>(undefined)

    // Keep track of editable columns (columns defined with the `withEditing` helper)
    const editableColumns = useMemo(() => {
        return leafColumns.filter(n => n.getIsVisible() && !!(n.columnDef.meta as any)?.editable)
    }, [leafColumns])

    // Keep track of editable cells (cells whose columns are editable)
    const editableCells = useMemo(() => {
        if (rows.length > 0) {
            return _.flatten(rows.map(row => row.getVisibleCells().filter(cell => !!editableColumns.find(col => col.id === cell.column.id)?.id)))
        }
        return []
    }, [rows])

    // Get a column's editing meta (onChange etc...)
    const getColumnEditingMeta = useCallback((colId: string) => {
        return (editableColumns.find(col => col.id === colId)?.columnDef?.meta as any)?.editable as DataGridEditingHelperProps<any, any> | undefined
    }, [])

    // Set/update editable cells
    useEffect(() => {
        // Control the states of individual cells that can be edited
        if (editableCells.length > 0) {
            editableCells.map(cell => {
                setEditableCellStates(prev => [...prev, { id: cell.id, colId: cell.column.id, isEditing: false }])
            })
        }
    }, [editableCells])

    /**/
    const onCellDoubleClick = useCallback((cellId: string) => {
        // Set cell is editing to true only if no other cell is being edited
        setEditableCellStates(prev => {
            const others = prev.filter(prevCell => prevCell.id !== cellId)
            const cell = prev.find(prevCell => prevCell.id === cellId)
            if (cell && prev.every(prevCell => !prevCell.isEditing)) {
                return [...others, { ...cell, id: cellId, isEditing: true }]
            }
            return prev
        })
    }, [])

    /**/
    const getIsCellActivelyEditing = useCallback((cellId: string) => {
        return editableCellStates.some(cell => cell.id === cellId && cell.isEditing)
    }, [editableCellStates])
    /**/
    const getIsCellEditable = useCallback((cellId: string) => {
        return !!editableCellStates.find(cell => cell.id === cellId)
    }, [editableCellStates])
    /**/
    const getIsCurrentlyEditing = useCallback(() => {
        return editableCellStates.some(cell => cell.isEditing)
    }, [editableCellStates])
    /**/
    const cancelEditing = useCallback(() => {
        setEditableCellStates(prev => {
            return prev.map(n => ({ ...n, isEditing: false }))
        })
    }, [])
    /**/

    const mutationRef = React.useRef<boolean>(false)

    useEffect(() => {
        if (!isMutating && mutationRef.current) {
            cancelEditing()
            mutationRef.current = false
        }
    }, [isMutating])

    const saveEdit = useCallback(() => {
        if (schema && rowData && key && typeof key === "string") {
            console.log(schema)
            const parsed = schema.shape[key].safeParse(rowData[key])

            if (!parsed.success) {
                toast.error(JSON.parse((parsed.error as any).message)?.[0]?.message)
            } else {
                // Return new data
                onSave && onSave(rowData)

                // Optimistic update
                if (enableOptimisticUpdates && optimisticUpdatePrimaryKey) {
                    let clone = structuredClone(data)
                    const index = clone.findIndex(p => {
                        if (!p[optimisticUpdatePrimaryKey] || !rowData[optimisticUpdatePrimaryKey]) return false
                        return p[optimisticUpdatePrimaryKey] === rowData[optimisticUpdatePrimaryKey]
                    })
                    if (clone[index] && index > -1) {
                        console.log(index)
                        clone[index] = rowData
                        onDataChange(clone) // Emit optimistic update
                    } else {
                        console.error("[DataGrid] Could not perform optimistic update. Make sure `optimisticUpdatePrimaryKey` is correct.")
                    }

                } else if (enableOptimisticUpdates) {
                    console.error("[DataGrid] Could not perform optimistic update. Make sure `optimisticUpdatePrimaryKey` is defined.")
                }

                // Immediately stop edit if optimistic updates are enabled
                if (enableOptimisticUpdates) {
                    cancelEditing()
                } else {
                    // Else, we send it to the queue so that we wait for `isMutating` to be false
                    mutationRef.current = true
                }
            }

        }

    }, [activeValue, rowData, data, onDataChange, isMutating])
    /**/
    const handleUpdateValue = useCallback<DataGridCellInputFieldProps<AnyZodObject, T, any>["onValueUpdated"]>((value, row, cell, schema, key) => {
        setActiveValue(value)
        setSchema(schema)
        setKey(key)
        setRowData({
            ...row.original,
            [cell.column.id]: value,
        })
    }, [])
    /**/


    return {
        onCellDoubleClick,
        getIsCellActivelyEditing,
        getIsCellEditable,
        getColumnEditingMeta,
        getIsCurrentlyEditing,
        cancelEditing,
        saveEdit,
        handleUpdateValue,
    }

}

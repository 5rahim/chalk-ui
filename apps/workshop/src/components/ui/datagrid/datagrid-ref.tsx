import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    OnChangeFn,
    PaginationState,
    RowSelectionState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { dataRangeFilter } from "./use-datagrid-filtering.ts"
import React, { useMemo, useState } from "react"
import { Checkbox } from "../checkbox"
import { DataGridOnRowEdit } from "./use-datagrid-editing.ts"
import { DataGridOnRowSelect } from "./use-datagrid-row-selection.ts"

export type DataGridRefProps<T extends Record<string, any>> = {
    data: T[] | null | undefined
    rowCount: number
    columns: ColumnDef<T>[]
    isLoading?: boolean

    hideColumns?: { below: number, hide: string[] }[]

    enableRowSelection: boolean | undefined
    onRowSelect?: DataGridOnRowSelect<T>
    rowSelectionPrimaryKey?: string
    enablePersistentRowSelection: boolean | undefined

    enableManualSorting: boolean | undefined
    enableManualFiltering: boolean | undefined
    enableManualPagination: boolean | undefined

    enableOptimisticUpdates?: boolean
    optimisticUpdatePrimaryKey?: string
    onRowEdit?: DataGridOnRowEdit<T>
    isDataMutating?: boolean

    initialState?: {
        sorting?: SortingState
        pagination?: PaginationState
        rowSelection?: RowSelectionState
        globalFilter?: string
        columnFilters?: ColumnFiltersState
        columnVisibility?: VisibilityState
    }

    state?: {
        sorting?: SortingState
        pagination?: PaginationState
        rowSelection?: RowSelectionState
        globalFilter?: string
        columnFilters?: ColumnFiltersState
        columnVisibility?: VisibilityState
    },

    onSortingChange?: OnChangeFn<SortingState>
    onPaginationChange?: OnChangeFn<PaginationState>
    onRowSelectionChange?: OnChangeFn<RowSelectionState>
    onGlobalFilterChange?: OnChangeFn<string>
    onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
    onColumnVisibilityChange?: OnChangeFn<VisibilityState>
}

export function useDataGrid<T extends Record<string, any>>(props: DataGridRefProps<T>) {

    const defaultValues: Required<DataGridRefProps<T>["state"]> = {
        globalFilter: "",
        sorting: [],
        pagination: { pageIndex: 0, pageSize: 5 },
        rowSelection: {},
        columnFilters: [],
        columnVisibility: {},
    }

    const {
        data: _actualData,
        rowCount,
        columns,
        initialState,
        state,

        onSortingChange,
        onPaginationChange,
        onRowSelectionChange,
        onGlobalFilterChange,
        onColumnFiltersChange,
        onColumnVisibilityChange,

        enableManualSorting = false,
        enableManualFiltering = false,
        enableManualPagination = false,
        enableRowSelection = false,
        enablePersistentRowSelection = false,
        enableOptimisticUpdates = false,

        ...rest
    } = props

    const [data, setData] = useState<T[]>(_actualData ?? [])

    React.useEffect(() => {
        if (_actualData) setData(_actualData)
    }, [_actualData])

    const [globalFilter, setGlobalFilter] = useState<string>(initialState?.globalFilter ?? defaultValues.globalFilter)
    const [rowSelection, setRowSelection] = useState<RowSelectionState>(initialState?.rowSelection ?? defaultValues.rowSelection)
    const [sorting, setSorting] = useState<SortingState>(initialState?.sorting ?? defaultValues.sorting)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialState?.columnFilters ?? defaultValues.columnFilters)
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialState?.columnVisibility ?? defaultValues.columnVisibility)
    const [pagination, setPagination] = useState<PaginationState>(initialState?.pagination ?? defaultValues.pagination)

    const pageCount = useMemo(() => Math.ceil(rowCount / pagination.pageSize) ?? -1, [rowCount, pagination.pageSize])

    const columnsWithSelection = useMemo<ColumnDef<T>[]>(() => [{
        id: "_select",
        size: 1,
        maxSize: 1,
        enableSorting: false,
        disableSortBy: true,
        disableGlobalFilter: true,
        header: ({ table }) => {
            return (
                <Checkbox
                    checked={table.getIsSomeRowsSelected() ? "indeterminate" : table.getIsAllRowsSelected()}
                    onChange={() => table.toggleAllRowsSelected()}
                />
            )
        },
        cell: ({ row }) => {
            return (
                <div className="px-1">
                    <Checkbox
                        key={row.id}
                        checked={row.getIsSomeSelected() ? "indeterminate" : row.getIsSelected()}
                        isDisabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                    />
                </div>
            )
        },
    }, ...columns], [columns])

    const table = useReactTable<T>({
        data: data,
        columns: enableRowSelection ? columnsWithSelection : columns,
        pageCount: pageCount,
        globalFilterFn: (row, columnId, filterValue) => {
            const safeValue: string = ((): string => {
                const value: any = row.getValue(columnId)
                return typeof value === "number" ? String(value) : value
            })()
            return safeValue?.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
        },
        state: {
            sorting: state?.sorting ?? sorting,
            pagination: state?.pagination ?? pagination,
            rowSelection: state?.rowSelection ?? rowSelection,
            globalFilter: state?.globalFilter ?? globalFilter,
            columnFilters: state?.columnFilters ?? columnFilters,
            columnVisibility: state?.columnVisibility ?? columnVisibility,
        },
        onSortingChange: onSortingChange ?? setSorting,
        onPaginationChange: onPaginationChange ?? setPagination,
        onRowSelectionChange: onRowSelectionChange ?? setRowSelection,
        onGlobalFilterChange: onGlobalFilterChange ?? setGlobalFilter,
        onColumnFiltersChange: onColumnFiltersChange ?? setColumnFilters,
        onColumnVisibilityChange: onColumnVisibilityChange ?? setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableManualSorting ? undefined : getSortedRowModel(),
        getFilteredRowModel: enableManualFiltering ? undefined : getFilteredRowModel(),
        filterFns: {
            dateRangeFilter: dataRangeFilter,
        },
        manualPagination: enableManualPagination,
        enableRowSelection: enableRowSelection,
    })

    const displayedRows = useMemo(() => {
        if (enableManualPagination) {
            return table.getRowModel().rows
        }
        return table.getRowModel().rows.slice(table.getState().pagination.pageIndex * pagination.pageSize, (table.getState().pagination.pageIndex + 1) * pagination.pageSize)
    }, [pagination.pageSize, table.getRowModel().rows, table.getState().pagination])

    return {
        table,
        displayedRows,
        setData,
        data,

        sorting,
        pagination,
        rowSelection,
        globalFilter,
        columnFilters,
        columnVisibility,
        enableManualSorting,
        enableManualFiltering,
        enableManualPagination,
        enableRowSelection,
        enablePersistentRowSelection,
        enableOptimisticUpdates,

        handleGlobalFilterChange: props.onGlobalFilterChange ?? setGlobalFilter,
        handleColumnFiltersChange: props.onColumnFiltersChange ?? setColumnFilters,

        ...rest,
    }

}

export type DataGridApi<T extends Record<string, any>> = ReturnType<typeof useDataGrid<T>>

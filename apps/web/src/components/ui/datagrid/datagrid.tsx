"use client"

import React, { useEffect, useMemo, useState } from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "@/components/ui/core"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from "@tanstack/react-table"

import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import { TextInput, TextInputProps } from "../text-input"
import { Checkbox } from "../checkbox"
import { useDataGridSize } from "./use-datagrid-table"
import _keys from "lodash/keys"
import { Select } from "@/components/ui/select"
import { NumberInput } from "@/components/ui/number-input"
import { LoadingOverlay } from "@/components/ui/loading-spinner"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DataGridAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-DataGrid__root",
    ]),
    paginationButton: cva([
        "relative inline-flex justify-center items-center h-10 w-10 text-xl border border-gray-200 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
        "disabled:bg-gray-100 disabled:text-gray-400 disabled:pointer-events-none"
    ])
})

/* -------------------------------------------------------------------------------------------------
 * DataGrid
 * -----------------------------------------------------------------------------------------------*/

export interface DataGridProps<T extends Record<string, any>> extends React.ComponentPropsWithoutRef<"div">,
    ComponentWithAnatomy<typeof DataGridAnatomy> {
    data: T[] | null | undefined
    children?: React.ReactNode
    columns: ColumnDef<T>[]
    /**
     * Manage responsiveness by hiding certain columns below a specific width.
     * The width is based on the table, not the window
     */
    hideColumns?: { below: number, hide: string[] }[]
    // DataGrid should know how many objects there are to paginate
    dataCount: number
    // Display loading spinner when data is loading
    isLoading: boolean
    // Display loading spinner when new data is coming in
    isFetching?: boolean
    /**
     * Enables and displays checkboxes for each row.
     * Use in conjunction with onItemSelected()
     */
    enableRowSelection: boolean
    // Returns selected objects
    onItemSelected?: (value: T[]) => void
    // Limit the number of rows per page
    itemsPerPage?: number
    /**
     * @default false
     * By default DataGrid expects the entirety of the data.
     * By setting this prop to `true`, DataGrid will allow you to manually filter and paginate data
     */
    withFetching?: boolean
}

export function DataGrid<T extends Record<string, any>>(props: DataGridProps<T>) {

    const {
        children,
        rootClassName,
        className,
        paginationButtonClassName,
        /**/
        withFetching = false,
        columns,
        data = [],
        dataCount,
        hideColumns = [],
        isLoading,
        isFetching,
        enableRowSelection,
        onItemSelected,
        itemsPerPage: _limit = 5,
        ...rest
    } = props

    /**
     * Selection checkboxes
     */
    const _columns = useMemo<ColumnDef<T>[]>(() => [{
        id: "select",
        size: 1,
        disableSortBy: true,
        disableGlobalFilter: true,
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsSomeRowsSelected() ? "indeterminate" : table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <div className="px-1">
                <Checkbox
                    checked={row.getIsSomeSelected() ? "indeterminate" : row.getIsSelected()}
                    isDisabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            </div>
        ),
    }, ...columns], [columns])

    /**
     * States
     */
        // Keep track of search input
    const [globalFilter, setGlobalFilter] = useState("")
    // Keep track of selected row
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState({})

    /**
     * Pagination
     */
        // Keep track of pages
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: _limit })
    // Pagination object
    const pagination = useMemo(() => ({ pageIndex, pageSize, }), [pageIndex, pageSize])
    // Calculate page count
    const pageCount = useMemo(() => Math.ceil(dataCount / pageSize) ?? -1, [dataCount, pageSize])

    /**
     * Table
     */
    const table = useReactTable({
        data: data ?? [],
        columns: enableRowSelection ? _columns : columns,
        pageCount: pageCount,
        globalFilterFn: (row, columnId, filterValue) => {
            const safeValue: string = ((): string => {
                const value: any = row.getValue(columnId)
                return typeof value === "number" ? String(value) : value
            })()
            return safeValue?.toLowerCase().includes(filterValue.toLowerCase())
        },
        state: {
            sorting,
            pagination,
            rowSelection,
            globalFilter,
            columnFilters,
            columnVisibility,
        },
        enableRowSelection: enableRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
    })

    /**
     * Responsively hide columns
     */
    const [tableRef, { width: tableWidth }] = useDataGridSize<HTMLDivElement>()
    useEffect(() => {
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

    /**
     * Item selection
     */
    useEffect(() => {
        const selectedIndexArr = _keys(table.getState().rowSelection).map(v => parseInt(v))
        onItemSelected && onItemSelected(data?.filter((v: any, i: number) => selectedIndexArr.includes(i)) as T[])
    }, [table.getState().rowSelection])

    return (
        <div>
            <div className="flex justify-between">
                <div className="block space-y-4 w-full">
                    {/* Search Box */}
                    <DataGridSearchInput value={globalFilter ?? ""} onChange={value => setGlobalFilter(String(value))}/>

                    <div className="flex w-full items-center gap-2 flex-wrap">
                        {table.getAllLeafColumns().map(column => {
                            if (column.getCanFilter() && (column.columnDef.meta as any)?.filter) {
                                // return <DataGridFilter
                                //     key={column.id}
                                //     filterValue={column.getFilterValue()}
                                //     filter={(column.columnDef.meta as any)?.filter as any}
                                //     setFilterValue={column.setFilterValue}
                                // />
                            }
                            return null
                        })}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div
                className="flex flex-col mt-4 overflow-y-hidden overflow-x-auto"
                ref={tableRef}
            >
                <div className="relative">
                    <div className="align-middle inline-block min-w-full relative">
                        <LoadingOverlay show={isLoading || (withFetching && isFetching)} className="absolute"/>
                        <table
                            className="w-full divide-y divide-gray-200 overflow-x-auto relative table-fixed"
                        >

                            {/*Head*/}

                            <thead className="border-b-2">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header, index) => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            scope="col"
                                            className={cn(
                                                "px-3 h-12 text-left text-sm font-bold",
                                                {
                                                    "px-3 sm:px-1 text-center": index === 0 && enableRowSelection,
                                                },
                                            )}
                                            style={{ width: header.getSize() }}
                                        >
                                            {((index !== 0 && enableRowSelection) || !enableRowSelection) ? <div
                                                className={cn(
                                                    "flex items-center justify-between",
                                                    {
                                                        "cursor-pointer": header.column.getCanSort(),
                                                    },
                                                )}
                                                // onClick={() => onSortData(column.id)}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        className="flex relative items-center"
                                                        {...{
                                                            onClick: header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext(),
                                                        )}
                                                        <span className="absolute flex items-center inset-y-0 top-1 -right-9">
                                                            {header.column.getIsSorted() === "asc" &&
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                     strokeLinejoin="round"
                                                                     className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 relative bottom-0.5">
                                                                    <polyline points="18 15 12 9 6 15"/>
                                                                </svg>
                                                            }
                                                            {header.column.getIsSorted() === "desc" &&
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                     strokeLinejoin="round"
                                                                     className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 relative bottom-0.5">
                                                                    <polyline points="6 9 12 15 18 9"/>
                                                                </svg>
                                                            }
                                                            {header.column.getIsSorted() === false &&
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                     strokeLinejoin="round"
                                                                     className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 relative bottom-0.5">
                                                                    <polyline points="6 9 12 15 18 9"/>
                                                                </svg>
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                            </div> : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                            </thead>

                            {/*Body*/}

                            {!isLoading && (
                                <tbody
                                    className="bg-white divide-y divide-gray-200 w-full"
                                >
                                {table.getRowModel().rows.slice(table.getState().pagination.pageIndex * pageSize, (table.getState().pagination.pageIndex + 1) * pageSize).map((row) => {
                                    return (
                                        <tr key={row.id} className="hover:bg-gray-50 truncate">
                                            {row.getVisibleCells().map((cell, index) => {

                                                return (
                                                    <td
                                                        key={cell.id}
                                                        className={cn(
                                                            "px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 truncate overflow-ellipsis",
                                                            {
                                                                "px-2 sm:px-0 text-center": index === 0 && enableRowSelection,
                                                            },
                                                        )}
                                                        style={{ width: cell.column.getSize(), maxWidth: cell.column.columnDef.maxSize }}
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </td>
                                                )

                                            })}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            )}
                        </table>
                        {((withFetching) && (!isLoading && table.getRowModel().rows.slice(table.getState().pagination.pageIndex * pageSize, (table.getState().pagination.pageIndex + 1) * pageSize).length === 0)) && <>
                            <div className="flex w-full text-3xl py-4 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" x2="9" y1="9" y2="15"/>
                                    <line x1="9" x2="15" y1="9" y2="15"/>
                                </svg>
                            </div>
                        </>}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row w-full items-center gap-2 justify-between border-t p-2 mt-2 overflow-x-auto max-w-full">

                    <div className="flex gap-1 flex-none">
                        <button
                            className={cn(DataGridAnatomy.paginationButton(), paginationButtonClassName)}
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {/*<BiChevronsLeft />*/}
                        </button>
                        <button
                            className={cn(DataGridAnatomy.paginationButton(), paginationButtonClassName)}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {/*<BiChevronLeft />*/}
                        </button>
                        <button
                            className={cn(DataGridAnatomy.paginationButton(), paginationButtonClassName)}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {/*<BiChevronRight />*/}
                        </button>
                        <button
                            className={cn(DataGridAnatomy.paginationButton(), paginationButtonClassName)}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            {/*<BiChevronsRight />*/}
                        </button>
                        <div className="flex flex-none items-center gap-1 ml-2">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                            </strong>
                        </div>
                    </div>

                    <div className="flex flex-none items-center gap-2">
                        {/*<BiBookmark className="text-4xl" />*/}
                        <span className="flex flex-none items-center gap-1">
                            <div className="w-[3rem]">
                                <NumberInput
                                    discrete
                                    defaultValue={table.getState().pagination.pageIndex + 1}
                                    min={1}
                                    max={pageCount}
                                    onChange={v => {
                                        const page = v ? v - 1 : 0
                                        table.setPageIndex(page)
                                    }}
                                />
                            </div>
                        </span>
                        <Select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            options={[Number(_limit), ...[5, 10, 20, 30, 40, 50].filter(n => n !== Number(_limit))].map(pageSize => ({
                                value: pageSize,
                                label: `${pageSize}`
                            }))}
                            className="w-[fit-content]"
                        />
                    </div>

                </div>

            </div>

            {/*<pre>{JSON.stringify(table.getState(), null, 2)}</pre>*/}
        </div>
    )

}

DataGrid.displayName = "DataGrid"

/* -------------------------------------------------------------------------------------------------
 * Helper
 * -----------------------------------------------------------------------------------------------*/

/**
 * Return
 * @example
 * const columns = useMemo(() => createDataGridColumns<Item>([
 *  ...
 * ]), [])
 * @param columns
 */
export function createDataGridColumns<T extends Record<string, any>>(columns: ColumnDef<T>[]) {
    return columns
}

/* -------------------------------------------------------------------------------------------------
 * DataGridSearchInput
 * -----------------------------------------------------------------------------------------------*/

interface DataGridSearchInputProps {
    value: string,
    onChange: (value: string) => void
    debounce?: number
}

function DataGridSearchInput(props: DataGridSearchInputProps & TextInputProps) {

    const { value: initialValue, onChange, debounce = 500, ...rest } = props

    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <TextInput
            {...rest}
            value={value}
            onChange={e => setValue(e.target.value)}
            leftIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-5 text-[--muted]">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
            </svg>}
        />
    )
}

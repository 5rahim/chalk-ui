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
import { useDataGridSize } from "./use-datagrid-size"
import _keys from "lodash/keys"
import { Select } from "@/components/ui/select"
import { NumberInput } from "@/components/ui/number-input"
import { LoadingOverlay } from "@/components/ui/loading-spinner"
import { Pagination } from "@/components/ui/pagination"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DataGridAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-DataGrid__root",
    ]),
    paginationButton: cva([
        "UI-DataGrid__paginationButton",
        "relative inline-flex justify-center items-center h-10 w-10 text-xl border border-[--border] font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
        "disabled:bg-gray-100 disabled:text-gray-400 disabled:pointer-events-none"
    ]),
    header: cva([
        "UI-DataGrid__header",
        "block space-y-4 w-full"
    ]),
    filterContainer: cva([
        "UI-DataGrid__filterContainer",
        "flex w-full items-center gap-2 flex-wrap"
    ]),
    tableWrapper: cva([
        "UI-DataGrid__tableWrapper",
        "flex flex-col overflow-y-hidden overflow-x-auto"
    ]),
    tableContainer: cva([
        "UI-DataGrid__tableContainer",
        "align-middle inline-block min-w-full relative"
    ]),
    table: cva([
        "UI-DataGrid__table",
        "w-full divide-y divide-[--border] overflow-x-auto relative table-fixed"
    ]),
    tableHead: cva([
        "UI-DataGrid__tableHead",
        "border-b border-[--border]"
    ]),
    th: cva([
        "UI-DataGrid__th",
        "px-3 h-12 text-left text-sm font-bold",
        "data-[rowselection=true]:px-3 data-[rowselection=true]:sm:px-1 data-[rowselection=true]:text-center"
    ]),
    titleChevronContainer: cva([
        "UI-DataGrid__titleChevronContainer",
        "absolute flex items-center inset-y-0 top-1 -right-9"
    ]),
    titleChevron: cva([
        "UI-DataGrid__titleChevron",
        "mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 relative bottom-0.5"
    ]),
    tableBody: cva([
        "UI-DataGrid__tableBody",
        "bg-[--paper] divide-y divide-[--border] w-full"
    ]),
    td: cva([
        "UI-DataGrid__td",
        "px-2 py-2 whitespace-nowrap text-sm font-medium text-[--text-color] truncate overflow-ellipsis",
        "data-[rowselection=true]:px-2 data-[rowselection=true]:sm:px-0 data-[rowselection=true]:text-center"
    ]),
    tr: cva([
        "UI-DataGrid__tr",
        "hover:bg-[--highlight] truncate"
    ]),
    footer: cva([
        "UI-DataGrid__footer",
        "flex flex-col sm:flex-row w-full items-center gap-2 justify-between p-2 mt-2 overflow-x-auto max-w-full"
    ]),
    footerPageDisplayContainer: cva([
        "UI-DataGrid__footerPageDisplayContainer",
        "flex flex-none items-center gap-1 ml-2 text-sm"
    ]),
    footerPaginationInputContainer: cva([
        "UI-DataGrid__footerPaginationInputContainer",
        "flex flex-none items-center gap-2"
    ]),
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
        headerClassName,
        filterContainerClassName,
        tableWrapperClassName,
        tableContainerClassName,
        tableHeadClassName,
        tableClassName,
        thClassName,
        titleChevronClassName,
        titleChevronContainerClassName,
        tableBodyClassName,
        trClassName,
        tdClassName,
        footerClassName,
        footerPageDisplayContainerClassName,
        footerPaginationInputContainerClassName,
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
        <div className={cn(DataGridAnatomy.root(), rootClassName)}>
            <div className={cn(DataGridAnatomy.header(), headerClassName)}>
                {/* Search Box */}
                <DataGridSearchInput value={globalFilter ?? ""} onChange={value => setGlobalFilter(String(value))}/>

                <div className={cn(DataGridAnatomy.filterContainer(), filterContainerClassName)}>
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

            {/* Table */}
            <div
                className={cn(DataGridAnatomy.tableWrapper(), tableWrapperClassName)}
                ref={tableRef}
            >
                <div className="relative">
                    <div className={cn(DataGridAnatomy.tableContainer(), tableContainerClassName)}>

                        <LoadingOverlay show={isLoading || (withFetching && isFetching)}/>

                        <table className={cn(DataGridAnatomy.table(), tableClassName)}>

                            {/*Head*/}

                            <thead className={cn(DataGridAnatomy.tableHead(), tableHeadClassName)}>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header, index) => (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            scope="col"
                                            className={cn(DataGridAnatomy.th(), thClassName)}
                                            data-rowselection={`${index === 0 && enableRowSelection}`}
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
                                                        <span className={cn(DataGridAnatomy.titleChevronContainer(), titleChevronContainerClassName)}>
                                                            {header.column.getIsSorted() === "asc" &&
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                     strokeLinejoin="round"
                                                                     className={cn(DataGridAnatomy.titleChevron(), titleChevronClassName)}>
                                                                    <polyline points="18 15 12 9 6 15"/>
                                                                </svg>
                                                            }
                                                            {header.column.getIsSorted() === "desc" &&
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                     strokeLinejoin="round"
                                                                     className={cn(DataGridAnatomy.titleChevron(), titleChevronClassName)}>
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
                                    className={cn(DataGridAnatomy.tableBody(), tableBodyClassName)}
                                >
                                {table.getRowModel().rows.slice(table.getState().pagination.pageIndex * pageSize, (table.getState().pagination.pageIndex + 1) * pageSize).map((row) => {
                                    return (
                                        <tr key={row.id} className={cn(DataGridAnatomy.tr(), trClassName)}>
                                            {row.getVisibleCells().map((cell, index) => {
                                                return (
                                                    <td
                                                        key={cell.id}
                                                        className={cn(DataGridAnatomy.td(), tdClassName)}
                                                        data-rowselection={index === 0 && enableRowSelection}
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

                <div className={cn(DataGridAnatomy.footer(), footerClassName)}>

                    <Pagination>
                        <Pagination.Trigger
                            direction={"left"}
                            isChevrons
                            onClick={() => table.setPageIndex(0)}
                            isDisabled={!table.getCanPreviousPage()}
                        />
                        <Pagination.Trigger
                            direction={"left"}
                            onClick={() => table.previousPage()}
                            isDisabled={!table.getCanPreviousPage()}
                        />
                        <Pagination.Trigger
                            direction={"right"}
                            onClick={() => table.nextPage()}
                            isDisabled={!table.getCanNextPage()}
                        />
                        <Pagination.Trigger
                            direction={"right"}
                            isChevrons
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            isDisabled={!table.getCanNextPage()}
                        />
                    </Pagination>

                    <div className={cn(DataGridAnatomy.footerPageDisplayContainer(), footerPageDisplayContainerClassName)}>
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                        </strong>
                    </div>

                    <div className={cn(DataGridAnatomy.footerPaginationInputContainer(), footerPaginationInputContainerClassName)}>
                        <NumberInput
                            discrete
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            min={1}
                            max={pageCount}
                            onChange={v => {
                                const page = v ? v - 1 : 0
                                table.setPageIndex(page)
                            }}
                            className={"inline-flex flex-none items-center w-[3rem]"}
                        />
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

            <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
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
                           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[--muted]">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
            </svg>}
        />
    )
}

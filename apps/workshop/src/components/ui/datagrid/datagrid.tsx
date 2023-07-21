"use client"

import React, { startTransition, useEffect, useMemo, useState } from "react"
import { cn, ComponentWithAnatomy, defineStyleAnatomy, UIIcons, useUILocaleConfig } from "../core"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import { cva } from "class-variance-authority"
import { TextInput, TextInputProps } from "../text-input"
import { Checkbox } from "../checkbox"
import { Select } from "../select"
import { NumberInput } from "../number-input"
import { LoadingSpinner } from "../loading-spinner"
import { Pagination } from "../pagination"
import { DataGridFilter } from "./datagrid-filter"
import { DropdownMenu } from "../dropdown-menu"
import { Button, IconButton } from "../button"
import { Tooltip } from "../tooltip"
import locales from "./locales.json"
import { useDataGridFiltering } from "./use-datagrid-filtering.ts"
import { useDataGridResponsiveness } from "./use-datagrid-responsiveness.ts"
import { useDataGridRowSelection } from "./use-datagrid-row-selection.ts"
import { useDataGridEditing } from "./use-datagrid-editing.ts"
import { DataGridCellInputField } from "./datagrid-cell-input-field.tsx"
import { Transition } from "@headlessui/react"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DataGridAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-DataGrid__root",
    ]),
    header: cva([
        "UI-DataGrid__header",
        "block space-y-4 w-full mb-4",
    ]),
    filterContainer: cva([
        "UI-DataGrid__filterContainer",
        "flex w-full items-center gap-4 flex-wrap",
    ]),
    tableWrapper: cva([
        "UI-DataGrid__tableWrapper",
        "flex flex-col overflow-x-auto",
    ]),
    tableContainer: cva([
        "UI-DataGrid__tableContainer",
        "align-middle inline-block min-w-full relative",
    ]),
    table: cva([
        "UI-DataGrid__table",
        "w-full divide-y divide-[--border] overflow-x-auto relative table-fixed",
    ]),
    tableHead: cva([
        "UI-DataGrid__tableHead",
        "border-b border-[--border]",
    ]),
    th: cva([
        "UI-DataGrid__th group/th",
        "px-3 h-12 text-left text-sm font-bold",
        "data-[row-selection=true]:px-3 data-[row-selection=true]:sm:px-1 data-[row-selection=true]:text-center",
    ]),
    titleChevronContainer: cva([
        "UI-DataGrid__titleChevronContainer",
        "absolute flex items-center inset-y-0 top-1 -right-9 group",
    ]),
    titleChevron: cva([
        "UI-DataGrid__titleChevron",
        "mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 relative bottom-0.5",
    ]),
    tableBody: cva([
        "UI-DataGrid__tableBody",
        "bg-[--paper] divide-y divide-[--border] w-full",
    ]),
    td: cva([
        "UI-DataGrid__td",
        "px-2 py-2 whitespace-nowrap text-base font-medium text-[--text-color]",
        "data-[row-selection=true]:px-2 data-[row-selection=true]:sm:px-0 data-[row-selection=true]:text-center",
        "data-[action-column=false]:truncate data-[action-column=false]:overflow-ellipsis",
        "data-[row-selected=true]:bg-brand-50 dark:data-[row-selected=true]:bg-gray-700",
        "data-[editing=true]:ring-1 ring-[--ring] ring-inset",
    ]),
    tr: cva([
        "UI-DataGrid__tr",
        "hover:bg-[--highlight] truncate",
    ]),
    footer: cva([
        "UI-DataGrid__footer",
        "flex flex-col sm:flex-row w-full items-center gap-2 justify-between p-2 mt-2 overflow-x-auto max-w-full",
    ]),
    footerPageDisplayContainer: cva([
        "UI-DataGrid__footerPageDisplayContainer",
        "flex flex-none items-center gap-1 ml-2 text-sm",
    ]),
    footerPaginationInputContainer: cva([
        "UI-DataGrid__footerPaginationInputContainer",
        "flex flex-none items-center gap-2",
    ]),
    filterDropdownButton: cva([
        "UI-DataGrid__filterDropdownButton",
        "flex gap-2 items-center bg-[--paper] border border-[--border] rounded-[--radius] py-1 px-2 cursor-pointer hover:bg-[--highlight]",
        "select-none focus-visible:ring-2 outline-none focus-visible:ring-[--ring]",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * DataGrid
 * -----------------------------------------------------------------------------------------------*/

export type DataGridFetchingHandlerParams = { offset: number, limit: number, globalFilterValue: string, filters: { id: string, value: unknown }[] }
export type DataGridFetchingHandler = {
    setParams: (params: Partial<DataGridFetchingHandlerParams>) => void
    getParams: () => DataGridFetchingHandlerParams
    getIsFiltering: () => boolean
}

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
    /**
     * DataGrid should know how many objects there are to paginate.
     * It can be fetched using an aggregation query via SSR.
     */
    rowCount: number
    // Display loading spinner when data is loading
    isLoading?: boolean
    /**
     * Enables and displays checkboxes for each row.
     * Use in conjunction with onItemSelected()
     */
    enableRowSelection?: boolean
    /**
     * Returns selected rows.
     *
     * /!\ You should avoid using it with `fetchingHandler` because you can only select visible rows
     */
    onItemSelected?: (value: T[]) => void
    // Limit the number of rows per page
    itemsPerPage?: number
    /**
     * @default false
     * By default DataGrid handles pagination and filtering on the client, so it expects all the data at once.
     * By using the fetching handler DataGrid will allow you to paginate and filter manually from the server.
     *
     * - Provide a "rowCount" prop so that DataGrid knows how many pages there are
     * - You should recalculate `rowCount`
     *
     * @example
     * // With dynamic rowCount
     * rowCount={fetchingHandler.getIsFiltering() ? (res.data?.rowCount ?? 0) : aggregationRes.count}
     */
    fetchingHandler?: DataGridFetchingHandler
    /**
     * Use in combination with `fetchingHandler`.
     * When it is false, the column filters will only be applied to visible rows
     *
     * - When it is true, the filters will not be applied, you can then manually filter the data using the returned values
     */
    enableManualFiltering?: boolean
    // Display loading spinner when new data is coming in
    isFetching?: boolean
    /**
     * Use in combination with the `withEditing` helper
     */
    onItemEdited?: (value: T) => void
    /**
     * Use in combination with the `withEditing` helper.
     * When this is true, DataGrid will block the
     */
    isItemMutating?: boolean
    /**
     * Use in combination with the `withEditing` helper
     */
    enableOptimisticUpdates?: boolean
    /**
     * Use in combination with the `withEditing` helper and `enableOptimisticUpdates`
     * The key that will be used to identify the row that will be updated
     * @example id
     */
    optimisticUpdatePrimaryKey?: string
}

export function DataGrid<T extends Record<string, any>>(props: DataGridProps<T>) {

    const { locale: lng } = useUILocaleConfig()

    const {
        children,
        rootClassName,
        className,
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
        filterDropdownButtonClassName,
        /**/
        columns,
        data = [],
        rowCount,
        hideColumns = [],
        isLoading = false,
        isFetching = false,
        enableRowSelection = false,
        onItemSelected,
        itemsPerPage: _limit = 5,
        /**/
        enableManualFiltering = false,
        fetchingHandler,
        onItemEdited,
        isItemMutating,
        enableOptimisticUpdates = false,
        optimisticUpdatePrimaryKey,
        ...rest
    } = props

    const withFetching = !!fetchingHandler
    const isInLoadingState = isLoading || (withFetching && isFetching)


    const [_data, setData] = useState(data ?? [])

    useEffect(() => {
        setData(data ?? [])
    }, [data])

    const _columns = useMemo<ColumnDef<T>[]>(() => [{
        id: "select",
        size: 0,
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

    const [globalFilter, setGlobalFilter] = useState("")
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState({})

    // Keep track of pages
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: _limit })
    // Pagination object
    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
    // Calculate page count
    const pageCount = useMemo(() => Math.ceil(rowCount / pageSize) ?? -1, [rowCount, pageSize])

    useEffect(() => {
        if (withFetching && fetchingHandler) {
            fetchingHandler.setParams({ offset: pageIndex, limit: pageSize, globalFilterValue: globalFilter })
        }
    }, [globalFilter, pageSize, pageIndex])

    const table = useReactTable({
        data: _data,
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
        getFilteredRowModel: (withFetching && enableManualFiltering) ? undefined : getFilteredRowModel(), // Control filtering
        manualPagination: withFetching,
    })

    const displayedRows = useMemo(() => {
        return withFetching ? table.getRowModel().rows : table.getRowModel().rows.slice(table.getState().pagination.pageIndex * pageSize, (table.getState().pagination.pageIndex + 1) * pageSize)
    }, [withFetching, pageSize, table.getRowModel().rows, table.getState().pagination])

    // Responsively hide columns
    const { tableRef } = useDataGridResponsiveness({ table, hideColumns })

    // Row selection
    const {
        selectedRowCount,
    } = useDataGridRowSelection({
        table,
        onSelection: onItemSelected,
        data,
    })

    // Filtering
    const {
        getFilterDefaultValue,
        unselectedFilterableColumns,
        selectedFilteredColumns,
        filterableColumns,
    } = useDataGridFiltering({
        table,
        columnFilters,
    })

    // Fetching
    useEffect(() => {
        fetchingHandler?.setParams({ filters: columnFilters })
    }, [columnFilters])

    // Editing
    const {
        onCellDoubleClick,
        getIsCellActivelyEditing,
        getIsCellEditable,
        getColumnEditingMeta,
        getIsCurrentlyEditing,
        cancelEditing,
        saveEdit,
        handleUpdateValue,
    } = useDataGridEditing({
        table,
        data: _data,
        rows: displayedRows,
        onSave: onItemEdited,
        isMutating: isItemMutating,
        enableOptimisticUpdates: enableOptimisticUpdates,
        optimisticUpdatePrimaryKey: optimisticUpdatePrimaryKey,
        onDataChange: setData,
    })


    return (
        <div className={cn(DataGridAnatomy.root(), rootClassName)}>
            <div className={cn(DataGridAnatomy.header(), headerClassName)}>

                <div className={cn(DataGridAnatomy.filterContainer(), filterContainerClassName)}>
                    {/* Search Box */}
                    <DataGridSearchInput value={globalFilter ?? ""} onChange={value => setGlobalFilter(String(value))}/>
                    {/* Filter dropdown */}
                    {(unselectedFilterableColumns.length > 0) && (
                        <DropdownMenu
                            trigger={
                                <button className={cn(DataGridAnatomy.filterDropdownButton(), filterDropdownButtonClassName)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor"
                                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                                    </svg>
                                    <span>{locales["filters"][lng]} ({unselectedFilterableColumns.length})</span>
                                </button>
                            }>
                            {/*Filter list*/}
                            {unselectedFilterableColumns.map(col => {
                                const defaultValue = getFilterDefaultValue(col)
                                const icon = (col.columnDef.meta as any)?.filter?.icon
                                return (
                                    <DropdownMenu.Item
                                        key={col.id}
                                        onClick={() => setColumnFilters(p => [...p, { id: col.id, value: defaultValue }])}
                                    >
                                        {icon && <span className={"text-lg"}>{icon}</span>}
                                        <span>{(col.columnDef.meta as any)?.filter?.name}</span>
                                    </DropdownMenu.Item>
                                )
                            })}
                        </DropdownMenu>
                    )}
                    {/*Remove filters button*/}
                    {unselectedFilterableColumns.length !== filterableColumns.length && (
                        <Tooltip
                            trigger={<IconButton icon={UIIcons.undo()} intent={"gray-outline"} size={"sm"} onClick={() => setColumnFilters([])}/>}>
                            {locales["remove-filters"][lng]}
                        </Tooltip>
                    )}
                    {/*Selected row count*/}
                    {(selectedRowCount > 0) && <div className={"text-sm"}>
                        {selectedRowCount} {locales[`row${selectedRowCount > 1 ? "s" : ""}-selected`][lng]}
                    </div>}
                </div>

                {/*Display filters*/}
                {(selectedFilteredColumns.length > 0) && <div className={cn(DataGridAnatomy.filterContainer(), filterContainerClassName)}>
                    {/*Display selected filters*/}
                    {table.getAllLeafColumns().filter(n => columnFilters.map(a => a.id).includes(n.id)).map(col => {
                        if (col.getCanFilter() && (col.columnDef.meta as any)?.filter) {
                            return (
                                <DataGridFilter
                                    key={col.id}
                                    column={col.columnDef}
                                    filterValue={col.getFilterValue()}
                                    setFilterValue={col.setFilterValue}
                                    filteringOptions={(col.columnDef.meta as any)?.filter as any}
                                    onRemove={() => setColumnFilters(p => [...p.filter(n => n.id !== col.id)])}
                                />
                            )
                        }
                        return undefined
                    })}
                </div>}

                {/*Manage editing*/}
                <Transition
                    appear
                    show={getIsCurrentlyEditing()}
                    className={"fixed top-2 left-0 right-0 flex justify-center z-20"}
                    enter="transition-all duration-150"
                    enterFrom="opacity-0 scale-50"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-75"
                >
                    <div className={"flex items-center gap-2 rounded-md p-4 bg-[--paper] border border-[--brand] shadow-sm z-20"}>
                        <span className={"font-semibold"}>Updating</span>
                        <Button size={"sm"} onClick={saveEdit} isDisabled={isItemMutating}>Save</Button>
                        <Button size={"sm"} onClick={cancelEditing} intent={"gray-outline"} isDisabled={isItemMutating}>Cancel</Button>
                    </div>
                </Transition>

            </div>

            {/* Table */}
            <div
                className={cn(DataGridAnatomy.tableWrapper(), tableWrapperClassName)}
                ref={tableRef}
            >
                <div className="relative">
                    <div className={cn(DataGridAnatomy.tableContainer(), tableContainerClassName)}>

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
                                            data-row-selection={`${index === 0 && enableRowSelection}`}
                                            style={{ width: header.getSize() }}
                                        >
                                            {((index !== 0 && enableRowSelection) || !enableRowSelection) ? <div
                                                className={cn(
                                                    "flex items-center justify-between",
                                                    {
                                                        "cursor-pointer": header.column.getCanSort(),
                                                    },
                                                )}
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
                                                            {(header.column.getIsSorted() === false && header.column.getCanSort()) &&
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                     strokeLinejoin="round"
                                                                     className={cn(
                                                                         DataGridAnatomy.titleChevron(),
                                                                         "w-4 h-4 opacity-0 transition-opacity group-hover/th:opacity-100",
                                                                         titleChevronClassName,
                                                                     )}>
                                                                    <path d="m7 15 5 5 5-5"/>
                                                                    <path d="m7 9 5-5 5 5"/>
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

                            {(!isLoading) && (
                                <tbody className={cn(DataGridAnatomy.tableBody(), tableBodyClassName)}>
                                {displayedRows.map((row) => {
                                    return (
                                        <tr key={row.id} className={cn(DataGridAnatomy.tr(), trClassName)}>
                                            {row.getVisibleCells().map((cell, index) => {
                                                return (
                                                    <td
                                                        key={cell.id}
                                                        className={cn(DataGridAnatomy.td(), tdClassName)}
                                                        data-row-selection={`${index === 0 && enableRowSelection}`}
                                                        data-action-column={`${cell.column.id === "actions"}`}
                                                        data-row-selected={cell.getContext().row.getIsSelected()}
                                                        data-editing={getIsCellActivelyEditing(cell.id)}
                                                        style={{ width: cell.column.getSize(), maxWidth: cell.column.columnDef.maxSize }}
                                                        onDoubleClick={() => startTransition(() => onCellDoubleClick(cell.id))}
                                                    >
                                                        {((!getIsCellEditable(cell.id) || !getIsCellActivelyEditing(cell.id))) && flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                        {getIsCellActivelyEditing(cell.id) && (
                                                            <DataGridCellInputField
                                                                cell={cell}
                                                                row={cell.row}
                                                                meta={getColumnEditingMeta(cell.column.id)!}
                                                                onValueUpdated={handleUpdateValue}
                                                            />
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

                        {isInLoadingState && <LoadingSpinner/>}

                        {(displayedRows.length === 0 && !isInLoadingState) && (
                            <div className={"w-full flex justify-center py-4"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="w-6 h-6">
                                    <path d="m2 2 20 20"/>
                                    <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"/>
                                    <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92"/>
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                <div className={cn(DataGridAnatomy.footer(), footerClassName)}>

                    <Pagination>
                        <Pagination.Trigger
                            direction={"left"}
                            isChevrons
                            onClick={() => table.setPageIndex(0)}
                            isDisabled={!table.getCanPreviousPage() || isInLoadingState}
                        />
                        <Pagination.Trigger
                            direction={"left"}
                            onClick={() => table.previousPage()}
                            isDisabled={!table.getCanPreviousPage() || isInLoadingState}
                        />
                        <Pagination.Trigger
                            direction={"right"}
                            onClick={() => table.nextPage()}
                            isDisabled={!table.getCanNextPage() || isInLoadingState}
                        />
                        <Pagination.Trigger
                            direction={"right"}
                            isChevrons
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            isDisabled={!table.getCanNextPage() || isInLoadingState}
                        />
                    </Pagination>

                    <div className={cn(DataGridAnatomy.footerPageDisplayContainer(), footerPageDisplayContainerClassName)}>
                        <div>{locales["page"][lng]}</div>
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
                            isDisabled={isInLoadingState}
                            size={"sm"}
                        />
                        <Select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            options={[Number(_limit), ...[5, 10, 20, 30, 40, 50].filter(n => n !== Number(_limit))].map(pageSize => ({
                                value: pageSize,
                                label: `${pageSize}`,
                            }))}
                            fieldClassName="w-auto"
                            className="w-auto pr-8"
                            isDisabled={isInLoadingState}
                            size={"sm"}
                        />
                    </div>

                </div>

            </div>

        </div>
    )

}

DataGrid.displayName = "DataGrid"


/* -------------------------------------------------------------------------------------------------
 * Server side
 * -----------------------------------------------------------------------------------------------*/

/**
 *
 * @param defaultProps
 *
 * Returns an object containing helper functions for manually paginating and filtering.
 *
 * @example
 * const fetchingHandler = useDataGridFetchingHandler()
 *
 * const res = useQuery({
 *     queryKey: ["data", fetchingHandler.getParams()],
 *     queryFn: () => fetchFromFakeServer(fetchingHandler.getParams()),
 *     keepPreviousData: true, refetchOnWindowFocus: false
 * })
 *
 * return (
 *     <DataGrid<any>
 *         enableManualFiltering={true}
 *         fetchingHandler={fetchingHandler}
 *         isFetching={dataQuery.isFetching}
 *     />
 * )
 */
export const useDataGridFetchingHandler = (defaultProps?: DataGridFetchingHandlerParams): DataGridFetchingHandler => {
    const _defaultValue = { offset: 0, limit: 0, globalFilterValue: "", filters: [] }

    const [params, setParams] = useState<DataGridFetchingHandlerParams>(defaultProps ?? _defaultValue)

    const isFiltering = params.globalFilterValue !== "" || params.filters.length > 0

    return {
        getParams: () => params,
        getIsFiltering: () => isFiltering,
        setParams: (props: Partial<DataGridFetchingHandlerParams>) => setParams(p => ({ ...p, ...props })),
    }
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
            size={"sm"}
            fieldClassName={"md:max-w-[15rem]"}
        />
    )
}

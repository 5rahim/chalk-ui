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
    RowSelectionState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import { cva } from "class-variance-authority"
import { TextInput, TextInputProps } from "../text-input"
import { Checkbox } from "../checkbox"
import { Select } from "../select"
import { NumberInput } from "../number-input"
import { Pagination } from "../pagination"
import { DataGridFilter } from "./datagrid-filter"
import { DropdownMenu } from "../dropdown-menu"
import { Button, IconButton } from "../button"
import { Tooltip } from "../tooltip"
import locales from "./locales.json"
import { dataRangeFilter, useDataGridFiltering } from "./use-datagrid-filtering"
import { useDataGridResponsiveness } from "./use-datagrid-responsiveness"
import { DataGridOnRowSelect, useDataGridRowSelection } from "./use-datagrid-row-selection"
import { DataGridOnRowEdit, useDataGridEditing } from "./use-datagrid-editing"
import { DataGridCellInputField } from "./datagrid-cell-input-field"
import { Transition } from "@headlessui/react"
import { getColumnHelperMeta, getValueFormatter } from "./helpers"
import { Skeleton } from "../skeleton"
import { DataGridServerSideModel } from "./datagrid-server-side-model.ts"

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
        "w-full divide-y divide-[--border] overflow-x-auto relative table-auto md:table-fixed",
    ]),
    tableHead: cva([
        "UI-DataGrid__tableHead",
        "border-b border-[--border]",
    ]),
    th: cva([
        "UI-DataGrid__th group/th",
        "px-3 h-12 text-left text-sm font-bold",
        "data-[is-selection-col=true]:px-3 data-[is-selection-col=true]:sm:px-1 data-[is-selection-col=true]:text-center",
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
        "px-2 py-2 w-full whitespace-nowrap text-base font-normal text-[--text-color]",
        "data-[is-selection-col=true]:px-2 data-[is-selection-col=true]:sm:px-0 data-[is-selection-col=true]:text-center",
        "data-[action-col=false]:truncate data-[action-col=false]:overflow-ellipsis",
        "data-[row-selected=true]:bg-brand-50 dark:data-[row-selected=true]:bg-gray-700",
        "data-[editing=true]:ring-1 data-[editing=true]:ring-[--ring] ring-inset",
        "data-[editable=true]:hover:bg-[--highlight] data-[editable=true]:focus:ring-2 data-[editable=true]:focus:ring-[--slate]",
        "focus:outline-none",
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
        "select-none focus-visible:ring-2 outline-none ring-[--ring]",
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
    /**
     * DataGrid should know how many objects there are to paginate.
     * It can be fetched using an aggregation query via SSR.
     */
    rowCount: number
    // Display skeleton when data is loading
    isLoading?: boolean
    // Limit the number of rows per page
    rowsPerPage?: number
    /* -------------------------------------------------------------------------------------------------
     * Row selection
     * -----------------------------------------------------------------------------------------------*/
    /**
     * Enables and displays checkboxes for each row.
     * Use in conjunction with onRowSelect()
     */
    enableRowSelection?: boolean
    /**
     * DataGrid will store the previously selected rows on the client when you handle the pagination on the server
     */
    enableServerSideRowSelection?: boolean
    /**
     * Returns selected rows.
     * /!\ You should avoid using it with `serverSideModel` because you can only select visible rows
     */
    onRowSelect?: DataGridOnRowSelect<T>
    /* -------------------------------------------------------------------------------------------------
     * SSR
     * -----------------------------------------------------------------------------------------------*/
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
     * rowCount={serverSideModel.getIsFiltering() ? (res.data?.rowCount ?? 0) : aggregationRes.count}
     */
    serverSideModel?: DataGridServerSideModel
    // Display loading spinner when new data is coming in
    isFetching?: boolean
    /* -------------------------------------------------------------------------------------------------
     * Filtering
     * -----------------------------------------------------------------------------------------------*/
    /**
     * Use in combination with `serverSideModel`.
     * When it is false, the column filters will only be applied to visible rows
     *
     * - When it is true, the filters will not be applied, you can then manually filter the data using the values from `serverSideModel`
     */
    enableServerSideFiltering?: boolean
    /* -------------------------------------------------------------------------------------------------
     * Sorting
     * -----------------------------------------------------------------------------------------------*/
    enableServerSideSorting?: boolean // TODO
    /* -------------------------------------------------------------------------------------------------
     * Pagination
     * -----------------------------------------------------------------------------------------------*/
    enableServerSidePagination?: boolean // TODO
    /* -------------------------------------------------------------------------------------------------
     * Editing
     * -----------------------------------------------------------------------------------------------*/
    /**
     * Use in combination with the `withEditing` helper
     */
    onRowEdit?: DataGridOnRowEdit<T>
    /**
     * Use in combination with the `withEditing` helper.
     * When this is true, DataGrid will block the
     */
    isDataMutating?: boolean
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
        columns,
        data: _actualData = [],
        isLoading = false,
        rowCount,
        hideColumns = [],
        rowsPerPage = 5,
        enableRowSelection = false,
        /** SSR **/
        enableServerSideRowSelection = false,
        enableServerSideFiltering = false,
        enableServerSidePagination = false,
        enableServerSideSorting = false,
        onRowSelect,
        isFetching = false,
        serverSideModel,
        onRowEdit,
        isDataMutating,
        enableOptimisticUpdates = false,
        optimisticUpdatePrimaryKey,
        ...rest
    } = props

    const isServerSideMode = !!serverSideModel
    const isInLoadingState = isLoading || (isServerSideMode && isFetching)

    // Since some DataGrid plugins can change the data, store it in a mutable state
    const [data, setData] = useState(_actualData ?? [])

    // Actualize the data when it changes outside DataGrid
    useEffect(() => {
        setData(_actualData ?? [])
    }, [_actualData])

    const columnsWithSelection = useMemo<ColumnDef<T>[]>(() => [{
        id: "_select",
        size: 1,
        maxSize: 1,
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
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    // Keep track of pages
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: rowsPerPage })
    // Pagination object
    const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])
    // Calculate page count
    const pageCount = useMemo(() => Math.ceil(rowCount / pageSize) ?? -1, [rowCount, pageSize])

    const table = useReactTable({
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
        getFilteredRowModel: (isServerSideMode && enableServerSideFiltering) ? undefined : getFilteredRowModel(),
        manualPagination: isServerSideMode && enableServerSideFiltering,
        filterFns: {
            dateRangeFilter: dataRangeFilter,
        },
    })

    const displayedRows = useMemo(() => {
        if (isServerSideMode && enableServerSidePagination) {
            return table.getRowModel().rows
        }
        return table.getRowModel().rows.slice(table.getState().pagination.pageIndex * pageSize, (table.getState().pagination.pageIndex + 1) * pageSize)
    }, [isServerSideMode, pageSize, table.getRowModel().rows, table.getState().pagination])

    // Responsively hide columns
    const { tableRef } = useDataGridResponsiveness({ table, hideColumns })

    // Row selection
    const {
        selectedRowCount,
    } = useDataGridRowSelection({
        table,
        data,
        displayedRows,
        isServerSideMode,
        enableServerSideRowSelection,
        onRowSelect: onRowSelect,
    })

    // Filtering
    const {
        getFilterDefaultValue,
        unselectedFilterableColumns,
        filteredColumns,
        filterableColumns,
    } = useDataGridFiltering({
        table,
        columnFilters,
    })

    useEffect(() => {
        if (serverSideModel && enableServerSideFiltering) {
            serverSideModel.setFilteringModel({ filters: columnFilters, globalFilterValue: globalFilter })
        }
    }, [columnFilters, globalFilter])

    useEffect(() => {
        if (serverSideModel && enableServerSidePagination) {
            serverSideModel.setPaginationModel({ pageIndex: pageIndex, limit: pageSize })
        }
    }, [pageSize, pageIndex])

    // Editing
    const {
        onCellDoubleClick,
        getIsCellActivelyEditing,
        getIsCellEditable,
        getIsCurrentlyEditing,
        getFirstCellBeingEdited,
        cancelEditing,
        saveEdit,
        handleUpdateValue,
    } = useDataGridEditing({
        table,
        data: data,
        rows: displayedRows,
        onRowEdit,
        isDataMutating,
        enableOptimisticUpdates,
        optimisticUpdatePrimaryKey,
        isServerSideMode,
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
                                // const icon = (col.columnDef.meta as any)?.filteringMeta?.icon
                                const icon = getColumnHelperMeta(col, "filteringMeta")?.icon
                                const name = getColumnHelperMeta(col, "filteringMeta")?.name
                                return (
                                    <DropdownMenu.Item
                                        key={col.id}
                                        onClick={() => setColumnFilters(p => [...p, { id: col.id, value: defaultValue }])}
                                    >
                                        {icon && <span className={"text-lg"}>{icon}</span>}
                                        <span>{name}</span>
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
                {(filteredColumns.length > 0) && <div className={cn(DataGridAnatomy.filterContainer(), filterContainerClassName)}>
                    {/*Display selected filters*/}
                    {filteredColumns.map(col => {
                        return (
                            <DataGridFilter
                                key={col.id}
                                column={col}
                                onRemove={() => setColumnFilters(filters => [...filters.filter(filter => filter.id !== col.id)])}
                            />
                        )
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
                        <span className={"font-semibold"}>{locales["updating"][lng]}</span>
                        <Button size={"sm"} onClick={saveEdit} isDisabled={isDataMutating}>{locales["save"][lng]}</Button>
                        <Button size={"sm"} onClick={cancelEditing} intent={"gray-outline"}
                                isDisabled={isDataMutating}>{locales["cancel"][lng]}</Button>
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
                                            data-is-selection-col={`${index === 0 && enableRowSelection}`}
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

                                                // If cell is editable and cell's row is being edited
                                                const isCurrentlyEditable = getIsCellEditable(cell.id) && !getIsCellActivelyEditing(cell.id)
                                                    && (!getIsCurrentlyEditing() || getFirstCellBeingEdited()?.rowId === cell.row.id)

                                                return (
                                                    <td
                                                        key={cell.id}
                                                        className={cn(DataGridAnatomy.td(), tdClassName)}
                                                        data-is-selection-col={`${index === 0 && enableRowSelection}`} // If cell is in the selection column
                                                        data-action-col={`${cell.column.id === "_actions"}`} // If cell is in the action column
                                                        data-row-selected={cell.getContext().row.getIsSelected()} // If cell's row is currently selected
                                                        data-editing={getIsCellActivelyEditing(cell.id)} // If cell is being edited
                                                        data-editable={isCurrentlyEditable} // If cell is editable
                                                        data-row-editing={getFirstCellBeingEdited()?.rowId === cell.row.id} // If cell's row is being edited
                                                        style={{ width: cell.column.getSize(), maxWidth: cell.column.columnDef.maxSize }}
                                                        onDoubleClick={() => startTransition(() => onCellDoubleClick(cell.id))}
                                                        onKeyUp={event => {
                                                            if (event.key === "Enter") startTransition(() => onCellDoubleClick(cell.id))
                                                        }}
                                                        tabIndex={isCurrentlyEditable ? 0 : undefined} // Is focusable if it can be edited
                                                    >
                                                        {((!getIsCellEditable(cell.id) || !getIsCellActivelyEditing(cell.id))) && flexRender(
                                                            cell.column.columnDef.cell,
                                                            {
                                                                ...cell.getContext(),
                                                                getValue: () => getValueFormatter(cell.column)(cell.getContext().getValue()),
                                                            },
                                                        )}
                                                        {getIsCellActivelyEditing(cell.id) && (
                                                            <DataGridCellInputField
                                                                cell={cell}
                                                                row={cell.row}
                                                                meta={getColumnHelperMeta(cell.column, "editingMeta")!}
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

                        {/*Skeleton*/}
                        {isInLoadingState && [...Array(Number(rowsPerPage)).keys()].map((i, idx) => (
                            <Skeleton key={idx} className={"rounded-none"}/>
                        ))}

                        {/*No rows*/}
                        {(displayedRows.length === 0 && !isInLoadingState && filteredColumns.length === 0) && (
                            <p className={"flex w-full justify-center py-4"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                    <path fill="#D1C4E9"
                                          d="M38 7H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 12H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm0 12H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z"/>
                                    <circle cx="38" cy="38" r="10" fill="#F44336"/>
                                    <g fill="#fff">
                                        <path d="m43.31 41.181l-2.12 2.122l-8.485-8.484l2.121-2.122z"/>
                                        <path d="m34.819 43.31l-2.122-2.12l8.484-8.485l2.122 2.121z"/>
                                    </g>
                                </svg>
                            </p>
                        )}

                        {/*No results with filters*/}
                        {(displayedRows.length === 0 && !isInLoadingState && filteredColumns.length > 0) && (
                            <div className={"w-full text-center py-4"}>
                                <p className={"flex w-full justify-center mb-4"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                        <path fill="#D1C4E9"
                                              d="M38 7H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 12H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zm0 12H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z"/>
                                        <circle cx="38" cy="38" r="10" fill="#F44336"/>
                                        <g fill="#fff">
                                            <path d="m43.31 41.181l-2.12 2.122l-8.485-8.484l2.121-2.122z"/>
                                            <path d="m34.819 43.31l-2.122-2.12l8.484-8.485l2.122 2.121z"/>
                                        </g>
                                    </svg>
                                </p>
                                <p>{locales["no-matching-result"][lng]}</p>
                            </div>
                        )}
                    </div>
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
                        options={[Number(rowsPerPage), ...[5, 10, 20, 30, 40, 50].filter(n => n !== Number(rowsPerPage))].map(pageSize => ({
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
    )

}

DataGrid.displayName = "DataGrid"

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

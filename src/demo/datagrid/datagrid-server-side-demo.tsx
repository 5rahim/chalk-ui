import { Badge } from "@/workshop/badge"
import { DataGrid, defineDataGridColumns } from "@/workshop/datagrid"
import { TextInput } from "@/workshop/text-input"
import { ColumnFiltersState, ColumnSort, PaginationState, SortingState } from "@tanstack/react-table"
import isEqual from "lodash/isEqual"
import React, { startTransition, useEffect, useMemo, useState } from "react"
import { BiFolder } from "react-icons/bi"
import { newProduct, Product, range } from "./datagrid-fake-api"

export const DatagridServerSideDemo = () => {

    const [globalFilter, setGlobalFilter] = useState<string>("")
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

    const { data, totalCount, isLoading } = useFakeQuery({
        sorting: sorting,
        filtering: { globalFilterValue: globalFilter, filters: columnFilters },
        pagination: { pageIndex: pagination.pageIndex, limit: pagination.pageSize },
    }, { enabled: true })

    const columns = useMemo(() => defineDataGridColumns<Product>(({ withFiltering, getFilterFn, withEditing, withValueFormatter }) => [
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.getValue(),
            size: 40,
            meta: {
                ...withEditing<string>({
                    field: (ctx) => (
                        <TextInput {...ctx} onChange={e => ctx.onChange(e.target.value ?? "")} intent="unstyled" size="sm" />
                    ),
                }),
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue<number>()),
            size: 10,
            meta: {},
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: info => info.getValue(),
            size: 20,
            filterFn: getFilterFn("radio"),
            meta: {
                ...withFiltering({
                    name: "Category",
                    type: "radio",
                    options: [{ value: "Electronics" }, { value: "Food" }, { value: "Drink" }],
                    icon: <BiFolder />,
                }),
            },
        },
        {
            accessorKey: "availability",
            header: "Availability",
            cell: info => info.renderValue(),
            size: 0,
            meta: {
                ...withValueFormatter<string>(value => {
                    if (value === "out_of_stock") return "Out of stock"
                    if (value === "in_stock") return "In stock"
                    return value
                }),
            },
        },
        {
            accessorKey: "visible",
            header: "Visible",
            cell: info => <Badge intent={info.getValue() ? "success" : "gray"}>{info.renderValue<string>()}</Badge>,
            size: 0,
            meta: {
                ...withValueFormatter<boolean, string>(value => {
                    return value ? "Visible" : "Hidden"
                }),
            },
        },
        {
            accessorKey: "random_date",
            header: "Date",
            cell: info => Intl.DateTimeFormat("us").format(info.getValue<Date>()),
            size: 30,
        },
    ]), [])

    return (
        <DataGrid<Product>
            enableManualPagination
            enableManualFiltering
            enableManualSorting
            enablePersistentRowSelection
            enableRowSelection
            rowSelectionPrimaryKey="id"
            enableOptimisticUpdates
            optimisticUpdatePrimaryKey="id"
            columns={columns}
            data={data}
            rowCount={totalCount}
            isLoading={isLoading}
            onRowSelect={data => {
                console.log("selection", data)
            }}
            onRowEdit={data => {
                console.log("editing", data)
            }}
            state={{
                globalFilter,
                sorting,
                columnFilters,
                pagination,
            }}
            onGlobalFilterChange={setGlobalFilter}
            onColumnFiltersChange={setColumnFilters}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
        />
    )

}

export default DatagridServerSideDemo

const _data = range(27).map(() => newProduct())

type DataGridServerSideModels = {
    pagination: { pageIndex: number, limit: number }
    filtering: { globalFilterValue: string, filters: { id: string, value: unknown }[] }
    sorting: ColumnSort[]
}


export async function fetchFakeData(_options: DataGridServerSideModels) {
    let products: Product[] = []
    const options = structuredClone(_options)
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 1000))
    // Filter by name
    products = _data.filter(n => options.filtering.globalFilterValue !== "" ? n.name.toLowerCase().trim()
        .includes(options.filtering.globalFilterValue.toLowerCase().trim()) : true)
    // Filter by other criteria
    options.filtering.filters.forEach(v => {
        // Filter by category
        if (v.id === "category" && typeof v.value === "string") {
            products = products.filter(n => n.category === v.value)
        }
    })
    return {
        rows: limitOffset(products, options.pagination.limit, options.pagination.pageIndex),
        rowCount: products.length, // Count after filtering
    }
}

function useFakeQuery(options: DataGridServerSideModels, { enabled }: { enabled?: boolean }) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Product[] | undefined>(undefined)
    const [totalCount, setTotalCount] = useState<number>(0)

    const [_options, setOptions] = useState(options)

    useEffect(() => {
        if (!isEqual(options, _options)) {
            setOptions(options)
        }
    }, [options])

    useEffect(() => {
        if (enabled) {
            setIsLoading(true);

            (async function () {
                const res = await fetchFakeData(_options)
                setTotalCount(res.rowCount)
                setData(res.rows)
                startTransition(() => setIsLoading(false))
            })()
        }
    }, [enabled, _options])

    return {
        data,
        totalCount,
        isLoading,
    }
}

export function limitOffset<T>(array: T[], limit: number, pageIndex: number): T[] {
    if (!array) return []

    const length = array.length

    const offset = limit * (pageIndex)

    if (offset > length - 1) {
        return []
    }
    const start = offset
    const end = offset + limit

    return array.slice(start, end)
}

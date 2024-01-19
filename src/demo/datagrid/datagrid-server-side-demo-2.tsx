import { Badge } from "@/workshop/badge"
import { DataGrid, defineDataGridColumns } from "@/workshop/datagrid"
import { TextInput } from "@/workshop/text-input"
import { ColumnFiltersState, ColumnSort, PaginationState, SortingState } from "@tanstack/react-table"
import _ from "lodash"
import React, { startTransition, useEffect, useMemo, useState } from "react"
import { BiBasket, BiCalendar, BiCheck, BiFolder, BiLowVision } from "react-icons/bi"
import { newProduct, Product, range } from "./datagrid-fake-api"

type DataGridServerSideTestProps = {
    children?: React.ReactNode
}

type DataGridPaginationModel = { pageIndex: number, limit: number }
type DataGridFilteringModel = { globalFilterValue: string, filters: { id: string, value: unknown }[] }
type DataGridSortingModel = ColumnSort[]

type DataGridServerSideModels = {
    pagination: DataGridPaginationModel
    filtering: DataGridFilteringModel
    sorting: DataGridSortingModel
}


export const DatagridServerSideDemo = (props: DataGridServerSideTestProps) => {

    const { children, ...rest } = props

    const [globalFilter, setGlobalFilter] = useState<string>("")
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

    const { data, totalCount, isLoading } = useFakeQuery({
        sorting: sorting,
        filtering: {
            globalFilterValue: globalFilter,
            filters: columnFilters,
        },
        pagination: {
            pageIndex: pagination.pageIndex,
            limit: pagination.pageSize,
        },
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
                        <TextInput {...ctx} onChange={e => ctx.onChange(e.target.value ?? "")} intent={"unstyled"} />
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
            filterFn: getFilterFn("checkbox"),
            meta: {
                ...withValueFormatter<string>(value => {
                    if (value === "out_of_stock") return "Out of stock"
                    if (value === "in_stock") return "In stock"
                    return value
                }),
                ...withFiltering({
                    name: "Availability",
                    type: "checkbox",
                    icon: <BiCheck />,
                    options: [
                        {
                            value: "out_of_stock",
                            label: <span className="flex items-center gap-2"><BiBasket className={"text-red-500"} /><span>Out of
                                                                                                                          stock</span></span>,
                        },
                        {
                            value: "in_stock",
                            label: <span className="flex items-center gap-2"><BiBasket className={"text-green-500"} /><span>In stock</span></span>,
                        },
                    ],
                    valueFormatter: (value) => {
                        if (value === "out_of_stock") return "Out of stock"
                        if (value === "in_stock") return "In stock"
                        return value
                    },
                }),
            },
        },
        {
            accessorKey: "visible",
            header: "Visible",
            cell: info => <Badge intent={info.getValue() ? "success" : "gray"}>{info.renderValue<string>()}</Badge>,
            size: 0,
            filterFn: getFilterFn("boolean"),
            meta: {
                ...withValueFormatter<boolean, string>(value => {
                    return value ? "Visible" : "Hidden"
                }),
                ...withFiltering({
                    name: "Visible",
                    type: "boolean",
                    icon: <BiLowVision />,
                }),
            },
        },
        {
            accessorKey: "random_date",
            header: "Date",
            cell: info => Intl.DateTimeFormat("us").format(info.getValue<Date>()),
            size: 30,
            filterFn: getFilterFn("date-range"),
            meta: {
                ...withFiltering({
                    type: "date-range",
                    icon: <BiCalendar />,
                    name: "Date",
                }),
            },
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

export async function fetchFakeData(_options: DataGridServerSideModels) {
    let products: Product[] = []
    const options = structuredClone(_options)
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 1000))
    // Filter by name
    products = _data.filter(n => options.filtering.globalFilterValue !== "" ? n.name.toLowerCase()
        .trim()
        .includes(options.filtering.globalFilterValue.toLowerCase().trim()) : true)
    // Filter by other criteria
    options.filtering.filters.map(v => {
        if (v.id === "category" && typeof v.value === "string") {
            products = products.filter(n => n.category === v.value)
        }
    })
    return {
        rows: limitOffset(products, options.pagination.limit, options.pagination.pageIndex),
        rowCount: products.length, // This is needed for pagination
    }
}

function useFakeQuery(options: DataGridServerSideModels, { enabled }: { enabled?: boolean }) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Product[] | undefined>(undefined)
    const [totalCount, setTotalCount] = useState<number>(0)

    const [_options, setOptions] = useState(options)

    useEffect(() => {
        if (!_.isEqual(options, _options)) {
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

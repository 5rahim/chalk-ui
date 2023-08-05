import React, {startTransition, useCallback, useEffect, useMemo, useState} from "react"
import {createDataGridColumns, DataGrid} from "../ui/datagrid"
import {Badge} from "../ui/badge"
import {DropdownMenu} from "../ui/dropdown-menu"
import {IconButton} from "../ui/button"
import {BiDotsHorizontal} from "@react-icons/all-files/bi/BiDotsHorizontal"
import {BiFolder} from "@react-icons/all-files/bi/BiFolder"
import {BiLowVision} from "@react-icons/all-files/bi/BiLowVision"
import {BiBasket} from "@react-icons/all-files/bi/BiBasket"
import {BiCheck} from "@react-icons/all-files/bi/BiCheck"
import {BiEditAlt} from "@react-icons/all-files/bi/BiEditAlt"
import {createTypesafeFormSchema} from "../ui/typesafe-form"
import {BiCalendar} from "@react-icons/all-files/bi/BiCalendar"
import {TextInput} from "../ui/text-input"
import {ColumnFiltersState, ColumnSort, PaginationState, SortingState} from "@tanstack/react-table"
import _ from "lodash"
import {newProduct, Product, range} from "./datagrid-fake-api.ts";

interface DataGridServerSideTestProps {
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

const schema = createTypesafeFormSchema(({ z }) => z.object({
    name: z.string().min(3),
    price: z.number().min(3),
    category: z.string().nullable(),
    availability: z.string(),
    visible: z.boolean(),
    random_date: z.date(),
}))

function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Product[] => {
        const len = lens[depth]!
        return range(len).map((d): Product => {
            return {
                ...newProduct(),
            }
        })
    }

    return makeDataLevel()
}

const _data = makeData(27)

export async function fetchData() {
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 500))
    return {
        rows: _data,
    }
}

export async function fakeMutation(object: Product) {
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 1000))
    let clone = structuredClone(_data)
    let index = clone.findIndex(p => p.id === object.id)
    if (clone[index]) {
        clone[index] = object
    }
    return {
        rows: clone,
    }
}

export function useFakeMutation(
    { onSuccess }: { onSuccess: (data: Product[] | undefined) => void },
) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Product[] | undefined>(undefined)

    const handleMutate = useCallback((object: Product) => {
        setIsLoading(true)

        async function execute() {
            const res = await fakeMutation(object)
            setIsLoading(false)
            setData(res.rows)
            onSuccess(res.rows)
        }

        execute()
    }, [])
    return {
        mutate: handleMutate,
        isLoading,
    }
}

export async function fetchFromFakeServer(_options: DataGridServerSideModels) {
    let a: Product[] = []
    const options = structuredClone(_options)
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 1000))
    // Filter by name
    a = _data.filter(n => options.filtering.globalFilterValue !== "" ? n.name.toLowerCase().trim().includes(options.filtering.globalFilterValue.toLowerCase().trim()) : true)
    // Filter by other criteria
    options.filtering.filters.map(v => {
        if (v.id === "category" && typeof v.value === "string") {
            a = a.filter(n => n.category === v.value)
        }
    })
    return {
        rows: limitOffset(a, options.pagination.limit, options.pagination.pageIndex),
        rowCount: a.length,
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
            setIsLoading(true)

            async function execute() {
                console.warn("Fetch executed")
                const res = await fetchFromFakeServer(_options)
                setTotalCount(res.rowCount)
                setData(res.rows)
                startTransition(() => setIsLoading(false))
            }

            execute().then()
        }
    }, [enabled, _options])

    return {
        data,
        totalCount,
        isLoading,
    }
}


export const DatagridServerSideTest: React.FC<DataGridServerSideTestProps> = (props) => {

    const {children, ...rest} = props

    const [globalFilter, setGlobalFilter] = useState<string>("")
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 5})

    const {data, totalCount, isLoading} = useFakeQuery({
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

    const columns = useMemo(() => createDataGridColumns<Product>(({ withFiltering, getFilterFn, withEditing, withValueFormatter }) => [
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.getValue(),
            size: 40,
            meta: {
                ...withEditing<string>({
                    field: (ctx) => (
                        <TextInput {...ctx} onChange={e => ctx.onChange(e.target.value ?? "")} intent={"unstyled"}/>
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
                    icon: <BiFolder/>,
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
                    icon: <BiCheck/>,
                    options: [
                        {
                            value: "out_of_stock",
                            label: <span className={"flex items-center gap-2"}><BiBasket className={"text-red-500"}/><span>Out of stock</span></span>,
                        },
                        {
                            value: "in_stock",
                            label: <span className={"flex items-center gap-2"}><BiBasket className={"text-green-500"}/><span>In stock</span></span>,
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
                    icon: <BiLowVision/>,
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
                    icon: <BiCalendar/>,
                    name: "Date",
                }),
            },
        },
        {
            id: "_actions",
            size: 10,
            enableSorting: false,
            enableGlobalFilter: false,
            cell: ({ row }) => {
                return (
                    <div className="flex justify-end w-full">
                        <DropdownMenu
                            trigger={<IconButton icon={<BiDotsHorizontal/>} intent={"gray-basic"} size={"sm"}/>}>
                            <DropdownMenu.Item><BiEditAlt/> Edit</DropdownMenu.Item>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]), [])

    const rowCount = useMemo(() => {
        return (globalFilter.length > 0 || columnFilters.length > 0) ? (totalCount) : _data.length
    }, [globalFilter, columnFilters, data])

    return (
        <>
            <DataGrid<Product>
                enableManualPagination
                enableManualFiltering
                enableManualSorting
                enablePersistentRowSelection
                enableRowSelection
                rowSelectionPrimaryKey={"id"}
                enableOptimisticUpdates
                optimisticUpdatePrimaryKey={"id"}
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
        </>
    )

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

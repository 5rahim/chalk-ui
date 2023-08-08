import React, { startTransition, useCallback, useEffect, useMemo, useState } from "react"
import { createDataGridColumns, DataGrid } from "../ui/datagrid"
import { createTypesafeFormSchema } from "../ui/typesafe-form"
import { TextInput } from "../ui/text-input"
import { ColumnSort, PaginationState } from "@tanstack/react-table"
import _ from "lodash"
import { makeData, Product } from "./datagrid-fake-api";

interface DataGridServerSideTestProps {
    children?: React.ReactNode
}

type DataGridPaginationModel = { pageIndex: number, limit: number }
type DataGridFilteringModel = { globalFilterValue: string, filters: { id: string, value: unknown }[] }
type DataGridSortingModel = ColumnSort[]

type DataGridServerSideModels = {
    pagination: DataGridPaginationModel
}

const schema = createTypesafeFormSchema(({ z }) => z.object({
    name: z.string().min(3),
    price: z.number().min(3),
    category: z.string().nullable(),
    availability: z.string(),
    visible: z.boolean(),
    random_date: z.date(),
}))


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
    a = _data
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


export const DatagridServerRowSelectionExample: React.FC<DataGridServerSideTestProps> = () => {

    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })

    const { data, totalCount, isLoading } = useFakeQuery({
        pagination: {
            pageIndex: pagination.pageIndex,
            limit: pagination.pageSize,
        },
    }, { enabled: true })

    const columns = useMemo(() => createDataGridColumns<Product>(({
                                                                      withFiltering,
                                                                      getFilterFn,
                                                                      withEditing,
                                                                      withValueFormatter
                                                                  }) => [
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.getValue(),
            size: 100,
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
            size: 100,
            meta: {},
        },
    ]), [])

    return (
        <>
            <DataGrid<Product>
                enableManualPagination
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
                    pagination,
                }}
                onPaginationChange={setPagination}
                enableRowSelection={true}
                enablePersistentRowSelection
                rowSelectionPrimaryKey={"id"}
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

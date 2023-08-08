import React, { useCallback, useEffect, useMemo, useState } from "react"
import { createDataGridColumns, DataGrid } from "@/components/ui/datagrid"
import { createTypesafeFormSchema } from "@/components/ui/typesafe-form"
import { makeData, Product } from "@/components/examples/datagrid-fake-api"
import { Badge } from "@/components/ui/badge"
import { TextInput } from "@/components/ui/text-input"

const schema = createTypesafeFormSchema(({ z }) => z.object({
    name: z.string().min(3),
    price: z.number().min(3),
    category: z.string().nullable(),
    availability: z.string(),
    visible: z.boolean(),
    random_date: z.date(),
}))

async function fetchFakeData() {
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 1000))
    return {
        rows: _data,
    }
}


const _data = makeData(10)

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

export function DataGridEditingOptimisticExample() {

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)

    const [editedData, setEditedData] = useState<any>(undefined)

    useEffect(() => {
        async function fetch() {
            const res = await fetchFakeData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    const { mutate, isLoading: isMutating } = useFakeMutation({
        onSuccess: data => {
            if (data) {
                setEditedData((prev: any) => ({ mutating: false, data: prev["data"] }))
                setClientData(data)
            }
        },
    })

    const columns = useMemo(() => createDataGridColumns<Product>((
        {
            withFiltering,
            getFilterFn,
            withValueFormatter,
            withEditing
        }) => [
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.getValue(),
            size: 40,
            meta: {
                ...withEditing({
                    zodType: schema.shape.name,
                    field: (ctx) => {
                        return (
                            <TextInput {...ctx} onChange={e => ctx.onChange(e.target.value ?? "")}
                                       intent={"unstyled"}/>
                        )
                    },
                }),
            }
        },
        {
            accessorKey: "price",
            header: () => "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.renderValue<number>()),
            size: 10,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: info => info.getValue(),
            size: 20,
        },
        {
            accessorKey: "availability",
            header: "Availability",
            cell: info => info.renderValue(),
            size: 20,
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
            size: 20,
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
            filterFn: getFilterFn("date-range"),
        },
    ]), [])

    return (
        <>
            {!!editedData && <pre>{JSON.stringify(editedData, null, 2)}</pre>}
            <DataGrid<Product>
                columns={columns}
                data={clientData}
                rowCount={clientData?.length ?? 0}
                isLoading={!clientData}
                isDataMutating={isMutating}
                onRowEdit={event => {
                    setEditedData({ mutating: true, data: event.data })
                    mutate(event.data)
                }}
                enableGlobalFilter={false}
                enableOptimisticUpdates
                optimisticUpdatePrimaryKey={"id"}
            />
        </>
    )

}

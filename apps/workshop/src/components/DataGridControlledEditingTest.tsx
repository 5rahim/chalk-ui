import React, {useCallback, useEffect, useMemo, useState} from "react"
import {faker} from "@faker-js/faker"
import {createDataGridColumns, DataGridWithApi, useDataGrid} from "./ui/datagrid"
import {createTypesafeFormSchema} from "./ui/typesafe-form"
import {TextInput} from "./ui/text-input"
import {NumberInput} from "./ui/number-input"

interface DataGridEditingTestProps {
    children?: React.ReactNode
}

const schema = createTypesafeFormSchema(({z}) => z.object({
    name: z.string().min(3),
    price: z.number().min(3),
    category: z.string().nullable(),
    availability: z.string(),
    visible: z.boolean(),
    random_date: z.date(),
}))

type Product = {
    id: string
    name: string
    image: string
    visible: boolean
    availability: "in_stock" | "out_of_stock"
    price: number
    category: string | null
    random_date: Date
}

const range = (len: number) => {
    const arr: any[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newProduct = (): Product => {
    return {
        id: crypto.randomUUID(),
        name: faker.commerce.productName(),
        image: faker.image.urlLoremFlickr({category: "food"}),
        visible: faker.datatype.boolean(),
        availability: faker.helpers.shuffle<Product["availability"]>([
            "in_stock",
            "out_of_stock",
        ])[0]!,
        price: faker.number.int({min: 5, max: 1500}),
        category: faker.helpers.shuffle<Product["category"]>([
            "Food",
            "Electronics",
            "Drink",
            null,
            null,
        ])[0]!,
        random_date: faker.date.anytime(),
    }
}

export function makeData(...lens: number[]) {
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

const _data = makeData(6)

export async function fetchData() {
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 1000))
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
    {onSuccess}: { onSuccess: (data: Product[] | undefined) => void },
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


export const DataGridControlledEditingTest: React.FC<DataGridEditingTestProps> = (props) => {

    const {children, ...rest} = props

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)

    useEffect(() => {
        async function fetch() {
            const res = await fetchData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    const columns = useMemo(() => createDataGridColumns<Product>((
        {
            withFiltering,
            getFilterFn,
            withEditing,
            withValueFormatter
        }) => [
        {
            accessorKey: "name",
            header: "Name",
            size: 10,
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
            header: () => "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue<number>()),
            size: 40,
            meta: {
                ...withEditing<number>({
                    field: (ctx) => (
                        <NumberInput {...ctx} step={1} discrete maxFractionDigits={0} intent={"unstyled"}/>
                    ),
                }),
            },
        },
    ]), [])

    const {mutate, isLoading: isMutating} = useFakeMutation({
        onSuccess: data => {
            if (data) {
                // setClientData(data)
                // tableApi.setData([])
            }
        },
    })

    const tableApi = useDataGrid({
        columns: columns,
        data: clientData,
        rowCount: _data.length,
        isLoading: !clientData,
        onRowEdit: (event) => {
            console.log("editing", event)
            mutate(event.data)
        },
    })

    return (
        <DataGridWithApi<Product>
            api={tableApi}
        />
    )

}

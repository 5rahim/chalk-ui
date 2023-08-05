import React, {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {createDataGridColumns, DataGridWithApi, useDataGrid} from "../ui/datagrid"
import {createTypesafeFormSchema} from "../ui/typesafe-form"
import {TextInput} from "../ui/text-input"
import {NumberInput} from "../ui/number-input"
import {newProduct, Product, range} from "./datagrid-fake-api.ts";

interface DataGridEditingTestProps {
    children?: React.ReactNode
}

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

export async function fakeNameVerification(value: string) {
    await new Promise(r => setTimeout(r, 1000))
    return {
        success: value.length > 3,
        error: "Name should contain at least 3 characters"
    }
}


export const DatagridEditingServerSideValidationTest: React.FC<DataGridEditingTestProps> = (props) => {

    const {children, ...rest} = props

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)

    const [isValidating, setIsValidation] = useState(false)

    const nameVerification = useRef(
        async (value: string) => {
            setIsValidation(true)
            const res = await fakeNameVerification(value)
            setIsValidation(false)
            return res.success
        }
    )

    const schema = createTypesafeFormSchema(({z}) => z.object({
        name: z.string().refine(value => nameVerification.current(value), {message: "Invalid name"}),
        price: z.number().min(3),
        category: z.string().nullable(),
        availability: z.string(),
        visible: z.boolean(),
        random_date: z.date(),
    }))

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
                ...withEditing({
                    zodType: schema.shape.name,
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
                setClientData(data)
                // tableApi.setData([])
            }
        },
    })

    const tableApi = useDataGrid({
        columns: columns,
        data: clientData,
        rowCount: _data.length,
        isLoading: !clientData,
        isDataMutating: isMutating || isValidating,
        onRowEdit: (event) => {
            console.log("editing", event)
            mutate(event.data)
        },
        validationSchema: schema
    })

    return (
        <DataGridWithApi<Product>
            api={tableApi}
        />
    )

}

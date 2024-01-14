import { toast } from "sonner"
import { DataGridWithApi, defineDataGridColumns, useDataGrid } from "@/workshop/datagrid"
import { defineSchema } from "@/workshop/form"
import { NumberInput } from "@/workshop/number-input"
import { TextInput } from "@/workshop/text-input"
import * as React from "react"
import { newProduct, Product, range } from "./datagrid-fake-api"

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
    { onSuccess }: { onSuccess: (data: Product[] | undefined) => void },
) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [data, setData] = React.useState<Product[] | undefined>(undefined)

    const handleMutate = React.useCallback((object: Product) => {
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
        error: "Name should contain at least 3 characters",
    }
}


export const DatagridEditingServerSideValidationDemo: React.FC<DataGridEditingTestProps> = (props) => {

    const { children, ...rest } = props

    const [clientData, setClientData] = React.useState<Product[] | undefined>(undefined)

    const [isValidating, setIsValidation] = React.useState(false)

    const nameVerification = React.useCallback(async (value: string) => {
        setIsValidation(true)
        const res = await fakeNameVerification(value)
        setIsValidation(false)
        return res.success
    }, [])

    const schema = defineSchema(({ z }) => z.object({
        name: z.string().refine(value => nameVerification(value), { message: "Invalid name" }),
        price: z.number().min(3),
        category: z.string().nullable(),
        availability: z.string(),
        visible: z.boolean(),
        random_date: z.date(),
    }))

    React.useEffect(() => {
        async function fetch() {
            const res = await fetchData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    const columns = React.useMemo(() => defineDataGridColumns<Product>((
        {
            withFiltering,
            getFilterFn,
            withEditing,
            withValueFormatter,
        }) => [
        {
            accessorKey: "name",
            header: "Name",
            size: 10,
            meta: {
                ...withEditing({
                    zodType: schema.shape.name, // Assign type using `zodType`
                    field: (ctx) => (
                        <TextInput {...ctx} onChange={e => ctx.onChange(e.target.value ?? "")} intent={"unstyled"} size="sm" />
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
                ...withEditing<number>({ // Assign type using generics
                    field: ({ onChange, ...ctx }) => (
                        <NumberInput
                            {...ctx}
                            onValueChange={onChange}
                            step={1}
                            hideControls
                            formatOptions={{
                                maximumFractionDigits: 0,
                            }}
                            intent={"unstyled"}
                            size="sm"
                        />
                    ),
                }),
            },
        },
    ]), [])

    const { mutate, isLoading: isMutating } = useFakeMutation({
        onSuccess: data => {
            if (data) {
                setClientData(data)
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
        onRowValidationError: (event) => {
            console.log("validation error", event)
            event.errors.forEach(error => {
                toast.error(error.path.join("."), {
                    description: error.message,
                    position: "top-center",
                })
            })
        },
        enableOptimisticUpdates: true,
        optimisticUpdatePrimaryKey: "id",
        validationSchema: schema,
    })

    return (
        <DataGridWithApi<Product>
            api={tableApi}
        />
    )

}

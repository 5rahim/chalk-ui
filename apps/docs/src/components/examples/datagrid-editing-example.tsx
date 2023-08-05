import React, {useCallback, useEffect, useMemo, useState} from "react"
import {createDataGridColumns, DataGrid} from "@/components/ui/datagrid"
import {createTypesafeFormSchema} from "@/components/ui/typesafe-form"
import {fetchFakeData, makeData, Product} from "@/components/examples/datagrid-fake-api"
import {BiFolder} from "@react-icons/all-files/bi/BiFolder"
import {BiCheck} from "@react-icons/all-files/bi/BiCheck"
import {BiBasket} from "@react-icons/all-files/bi/BiBasket"
import {BiLowVision} from "@react-icons/all-files/bi/BiLowVision"
import {BiDotsHorizontal} from "@react-icons/all-files/bi/BiDotsHorizontal"
import {BiEditAlt} from "@react-icons/all-files/bi/BiEditAlt"
import {Badge} from "@/components/ui/badge"
import {DropdownMenu} from "@/components/ui/dropdown-menu"
import {IconButton} from "@/components/ui/button"
import {TextInput} from "@/components/ui/text-input"
import {BiCalendar} from "@react-icons/all-files/bi/BiCalendar"

const schema = createTypesafeFormSchema(({z}) => z.object({
    name: z.string().min(3),
    price: z.number().min(3),
    category: z.string().nullable(),
    availability: z.string(),
    visible: z.boolean(),
    random_date: z.date(),
}))

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

export function DataGridEditingExample() {

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)

    const [editedData, setEditedData] = useState<any>(undefined)

    useEffect(() => {
        async function fetch() {
            const res = await fetchFakeData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    const {mutate, isLoading: isMutating} = useFakeMutation({
        onSuccess: data => {
            if (data) {
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
                    schema: schema,
                    key: "name",
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
            filterFn: getFilterFn("radio"),
            meta: {
                ...withFiltering({
                    name: "Category",
                    type: "radio",
                    options: [{value: "Electronics"}, {value: "Food"}],
                    icon: <BiFolder/>,
                }),
            },
        },
        {
            accessorKey: "availability",
            header: "Availability",
            cell: info => info.renderValue(),
            size: 20,
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
                            label: <span className={"flex items-center gap-2"}><BiBasket
                                className={"text-red-500"}/><span>Out of stock</span></span>,
                        },
                        {
                            value: "in_stock",
                            label: <span className={"flex items-center gap-2"}><BiBasket
                                className={"text-green-500"}/><span>In stock</span></span>,
                        },
                    ],
                }),
            },
        },
        {
            accessorKey: "visible",
            header: "Visible",
            cell: info => <Badge intent={info.getValue() ? "success" : "gray"}>{info.renderValue<string>()}</Badge>,
            size: 20,
            filterFn: getFilterFn("boolean"),
            meta: {
                ...withValueFormatter<boolean, string>(value => {
                    return value ? "Visible" : "Hidden"
                }),
                ...withFiltering({
                    name: "Visible",
                    type: "boolean",
                    icon: <BiLowVision/>,
                    valueFormatter: (value) => {        // Overrides `withValueFormatter`
                        return value ? "Yes" : "No"
                    },
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
            cell: ({row}) => {
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
                    setEditedData({data: event.data})
                    mutate(event.data)
                }}
                // enableOptimisticUpdates
                // optimisticUpdatePrimaryKey={"id"}
            />
        </>
    )

}

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { faker } from "@faker-js/faker"
import { createDataGridColumns, DataGrid } from "./ui/datagrid"
import { Badge } from "./ui/badge"
import { DropdownMenu } from "./ui/dropdown-menu"
import { IconButton } from "./ui/button"
import { BiDotsHorizontal } from "@react-icons/all-files/bi/BiDotsHorizontal"
import { BiFolder } from "@react-icons/all-files/bi/BiFolder"
import { BiLowVision } from "@react-icons/all-files/bi/BiLowVision"
import { BiBasket } from "@react-icons/all-files/bi/BiBasket"
import { BiCheck } from "@react-icons/all-files/bi/BiCheck"
import { BiEditAlt } from "@react-icons/all-files/bi/BiEditAlt"
import { createTypesafeFormSchema } from "./ui/typesafe-form"
import { TextInput } from "./ui/text-input"
import { NumberInput } from "./ui/number-input"
import { Select } from "./ui/select"
import { DatePicker } from "./ui/date-time"
import { getLocalTimeZone, parseAbsoluteToLocal } from "@internationalized/date"
import { BiCalendar } from "@react-icons/all-files/bi/BiCalendar"

interface DataGridEditingTestProps {
    children?: React.ReactNode
}

const schema = createTypesafeFormSchema(({ z }) => z.object({
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
        image: faker.image.urlLoremFlickr({ category: "food" }),
        visible: faker.datatype.boolean(),
        availability: faker.helpers.shuffle<Product["availability"]>([
            "in_stock",
            "out_of_stock",
        ])[0]!,
        price: faker.number.int({ min: 5, max: 1500 }),
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


export const DataGridEditingTest: React.FC<DataGridEditingTestProps> = (props) => {

    const { children, ...rest } = props

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)
    const { mutate, isLoading: isMutating } = useFakeMutation({
        onSuccess: data => {
            if (data) {
                setClientData(data)
            }
        },
    })

    useEffect(() => {
        async function fetch() {
            const res = await fetchData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    const columns = useMemo(() => createDataGridColumns<Product>(({ withFiltering, getFilterFn, withEditing, withValueFormatter }) => [
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.getValue(),
            size: 40,
            meta: {
                ...withEditing({
                    schema: schema,
                    key: "name",
                    field: (ctx) => (
                        <TextInput {...ctx} onChange={e => ctx.onChange(e.target.value ?? "")} intent={"unstyled"}/>
                    ),
                }),
            },
        },
        {
            accessorKey: "price",
            header: () => "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue() as number),
            footer: props => props.column.id,
            size: 10,
            meta: {
                ...withEditing({
                    schema: schema,
                    key: "price",
                    field: (ctx) => (
                        <NumberInput {...ctx} step={1} discrete maxFractionDigits={0} intent={"unstyled"}/>
                    ),
                }),
            },
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 20,
            filterFn: getFilterFn("radio"),
            meta: {
                ...withFiltering({
                    name: "Category",
                    type: "radio",
                    options: [{ value: "Electronics" }, { value: "Food" }, { value: "Drink" }],
                    icon: <BiFolder/>,
                }),
                ...withEditing({
                    schema: schema,
                    key: "category",
                    field: (ctx) => (
                        <Select
                            {...ctx}
                            value={ctx.value ?? ""}
                            onChange={e => ctx.onChange(e.target.value.length > 0 ? e.target.value : null)}
                            options={[{ value: "", label: "No category" }, { value: "Electronics" }, { value: "Food" }, { value: "Drink" }]}
                            intent={"unstyled"}
                        />
                    ),
                }),
            },
        },
        {
            accessorKey: "availability",
            header: "Availability",
            cell: info => info.getValue(),
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
                ...withEditing({
                    schema: schema,
                    key: "availability",
                    field: (ctx) => (
                        <Select
                            {...ctx}
                            value={ctx.value ?? ""}
                            onChange={e => ctx.onChange(e.target.value)}
                            options={[{ value: "in_stock", label: "In stock" }, { value: "out_of_stock", label: "Out of stock" }]}
                            intent={"unstyled"}
                        />
                    ),
                }),
            },
        },
        {
            accessorKey: "visible",
            header: "Visible",
            cell: info => <Badge intent={info.getValue() === "Visible" ? "success" : "gray"}>{info.getValue<string>()}</Badge>,
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
                ...withEditing({
                    schema: schema,
                    key: "visible",
                    field: (ctx) => (
                        <Select
                            {...ctx}
                            value={ctx.value ? "visible" : "hidden"}
                            onChange={e => ctx.onChange(e.target.value === "visible")}
                            options={[{ value: "visible", label: "Visible" }, { value: "hidden", label: "Hidden" }]}
                            intent={"unstyled"}
                        />
                    ),
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
                ...withEditing({
                    schema: schema,
                    key: "random_date",
                    field: (ctx) => {
                        return (
                            <DatePicker
                                value={parseAbsoluteToLocal(ctx.value.toISOString())}
                                onChange={value => ctx.onChange(value.toDate(getLocalTimeZone()))}
                                intent={"unstyled"}
                                locale={"us"}
                                hideTimeZone
                                granularity={"day"}
                            />
                        )
                    },
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
                        <DropdownMenu trigger={<IconButton icon={<BiDotsHorizontal/>} intent={"gray-basic"} size={"sm"}/>}>
                            <DropdownMenu.Item><BiEditAlt/> Edit</DropdownMenu.Item>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]), [])

    return (
        <>
            <DataGrid<Product>
                columns={columns}
                data={clientData}
                rowCount={_data.length}
                isLoading={!clientData}
                hideColumns={[
                    { below: 850, hide: ["availability", "price"] },
                    { below: 600, hide: ["_actions"] },
                    { below: 515, hide: ["category"] },
                    { below: 400, hide: ["visible", "random_date"] },
                ]}
                enableRowSelection
                rowSelectionPrimaryKey={"id"}
                onRowSelect={data => {
                    console.log("selection", data)
                }}
                isDataMutating={isMutating}
                enableOptimisticUpdates
                optimisticUpdatePrimaryKey={"id"}
                onRowEdit={data => {
                    console.log("editing", data)
                }}
            />
        </>
    )

}

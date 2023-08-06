import React, { useCallback, useEffect, useMemo, useState } from "react"
import { createDataGridColumns, DataGrid } from "../ui/datagrid"
import { Badge } from "../ui/badge"
import { DropdownMenu } from "../ui/dropdown-menu"
import { IconButton } from "../ui/button"
import { BiDotsHorizontal } from "@react-icons/all-files/bi/BiDotsHorizontal"
import { BiFolder } from "@react-icons/all-files/bi/BiFolder"
import { BiLowVision } from "@react-icons/all-files/bi/BiLowVision"
import { BiBasket } from "@react-icons/all-files/bi/BiBasket"
import { BiCheck } from "@react-icons/all-files/bi/BiCheck"
import { BiEditAlt } from "@react-icons/all-files/bi/BiEditAlt"
import { createTypesafeFormSchema } from "../ui/typesafe-form"
import { TextInput } from "../ui/text-input"
import { NumberInput } from "../ui/number-input"
import { Select } from "../ui/select"
import { DatePicker } from "../ui/date-time"
import { getLocalTimeZone, parseAbsoluteToLocal } from "@internationalized/date"
import { BiCalendar } from "@react-icons/all-files/bi/BiCalendar"
import { newProduct, Product, range } from "./datagrid-fake-api";

interface DataGridEditingTestProps {
    children?: React.ReactNode
    tableProps?: any
}

const schema = createTypesafeFormSchema(({z}) => z.object({
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
    let error: string | undefined = undefined
    let clone = structuredClone(_data)
    let index = clone.findIndex(p => p.id === object.id)

    if (clone[index]) {
        if (object.name.length === 0) {
            error = "Invalid name"
        }
        clone[index] = object
    }
    return {
        rows: clone,
        error: error,
    }
}

export function useFakeMutation(
    {onSuccess, onError}: {
        onSuccess: (data: Product[] | undefined) => void,
        onError: (message: string | undefined) => void
    },
) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Product[] | undefined>(undefined)

    const handleMutate = useCallback((object: Product) => {
        setIsLoading(true)

        async function execute() {
            const res = await fakeMutation(object)
            setIsLoading(false)
            setData(res.rows)
            if (!res.error) {
                onSuccess(res.rows)
            } else {
                onError(res.error)
            }
        }

        execute()
    }, [])
    return {
        mutate: handleMutate,
        isLoading,
    }
}


export const DatagridEditingTest: React.FC<DataGridEditingTestProps> = (props) => {

    const {children, tableProps, ...rest} = props

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)
    const {mutate, isLoading: isMutating} = useFakeMutation({
        onSuccess: data => {
            if (data) {
                setClientData(data)
            }
        },
        onError: message => {

        }
    })

    useEffect(() => {
        async function fetch() {
            const res = await fetchData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    useEffect(() => {
        console.log(isMutating)
    }, [isMutating])

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
            size: 40,
            meta: {
                ...withEditing({
                    zodType: schema.shape.name,
                    field: (ctx, {rowErrors, row}) => {
                        const error = rowErrors.find(n => n.key === "name" && n.rowId === row.id)
                        return (
                            <TextInput {...ctx} onChange={e => ctx.onChange(e.target.value ?? "")} intent={"unstyled"}/>
                        )
                    },
                }),
            },
        },
        {
            accessorKey: "price",
            header: () => "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue<number>()),
            size: 10,
            meta: {
                ...withEditing({
                    zodType: schema.shape.price,
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
            size: 20,
            filterFn: getFilterFn("radio"),
            meta: {
                ...withFiltering({
                    name: "Category",
                    type: "radio",
                    options: [{value: "Electronics"}, {value: "Food"}, {value: "Drink"}],
                    icon: <BiFolder/>,
                }),
                ...withEditing({
                    zodType: schema.shape.category,
                    field: (ctx) => (
                        <Select
                            {...ctx}
                            value={ctx.value ?? ""}
                            onChange={e => ctx.onChange(e.target.value.length > 0 ? e.target.value : null)}
                            options={[{
                                value: "",
                                label: "No category"
                            }, {value: "Electronics"}, {value: "Food"}, {value: "Drink"}]}
                            intent={"unstyled"}
                        />
                    ),
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
                            label: <span className={"flex items-center gap-2"}><BiBasket
                                className={"text-red-500"}/><span>Out of stock</span></span>,
                        },
                        {
                            value: "in_stock",
                            label: <span className={"flex items-center gap-2"}><BiBasket
                                className={"text-green-500"}/><span>In stock</span></span>,
                        },
                    ],
                    valueFormatter: (value) => {
                        if (value === "out_of_stock") return "Out of stock"
                        if (value === "in_stock") return "In stock"
                        return value
                    },
                }),
                ...withEditing({
                    zodType: schema.shape.availability,
                    field: (ctx) => (
                        <Select
                            {...ctx}
                            value={ctx.value ?? ""}
                            onChange={e => ctx.onChange(e.target.value)}
                            options={[{value: "in_stock", label: "In stock"}, {
                                value: "out_of_stock",
                                label: "Out of stock"
                            }]}
                            intent={"unstyled"}
                        />
                    ),
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
                ...withValueFormatter<boolean>(value => {
                    return value ? "Visible" : "Hidden"
                }),
                ...withFiltering({
                    name: "Visible",
                    type: "boolean",
                    icon: <BiLowVision/>,
                }),
                ...withEditing({
                    zodType: schema.shape.visible,
                    field: (ctx) => (
                        <Select
                            {...ctx}
                            value={ctx.value ? "visible" : "hidden"}
                            onChange={e => ctx.onChange(e.target.value === "visible")}
                            options={[{value: "visible", label: "Visible"}, {value: "hidden", label: "Hidden"}]}
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
                    zodType: schema.shape.random_date,
                    field: (ctx) => {
                        return (
                            <DatePicker
                                value={parseAbsoluteToLocal(ctx.value.toISOString())}
                                onChange={value => ctx.onChange(value.toDate(getLocalTimeZone()))}
                                intent={"unstyled"}
                                locale={"us"}
                                hideTimeZone
                                granularity={"day"}
                                ref={ctx.ref}
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
        <DataGrid<Product>
            columns={columns}
            data={clientData}
            rowCount={_data.length}
            isLoading={!clientData}
            enableRowSelection
            rowSelectionPrimaryKey={"id"}
            onRowSelect={event => {
                console.log("selection", event)
            }}
            isDataMutating={isMutating}
            // enableOptimisticUpdates
            // optimisticUpdatePrimaryKey={"id"}
            onRowEdit={event => {
                console.log("editing", event)
                mutate(event.data)
            }}
            onRowValidationError={event => {
                console.log("validation error", event.errors)
            }}
            validationSchema={schema}
            {...tableProps}
        />
    )

}

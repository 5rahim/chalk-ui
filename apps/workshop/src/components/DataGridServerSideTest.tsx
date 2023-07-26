import React, { startTransition, useCallback, useEffect, useMemo, useState } from "react"
import { faker } from "@faker-js/faker"
import { createDataGridColumns, DataGrid, DataGridServerSideModelProps, useDataGridServerSideModel } from "./ui/datagrid"
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
import { BiCalendar } from "@react-icons/all-files/bi/BiCalendar"
import { TextInput } from "./ui/text-input"

interface DataGridServerSideTestProps {
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

export async function fetchFromFakeServer(_options: DataGridServerSideModelProps) {
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

function useFakeQuery(options: DataGridServerSideModelProps, { enabled }: { enabled?: boolean }) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Product[] | undefined>(undefined)
    const [totalCount, setTotalCount] = useState<number>(0)

    useEffect(() => {
        if (enabled) {
            setIsLoading(true)

            async function execute() {
                console.warn("Fetch executed")
                const res = await fetchFromFakeServer(options)
                setTotalCount(res.rowCount)
                setData(res.rows)
                startTransition(() => setIsLoading(false))
            }

            execute().then()
        }
    }, [enabled, options.sorting, options.pagination, options.filtering])

    return {
        data,
        totalCount,
        isLoading,
    }
}


export const DataGridServerSideTest: React.FC<DataGridServerSideTestProps> = (props) => {

    const { children, ...rest } = props

    const serverSideModel = useDataGridServerSideModel({
        itemsPerPage: 5,
    })

    const { data, totalCount, isLoading } = useFakeQuery(serverSideModel.models, { enabled: serverSideModel.paginationModel.limit > 0 })

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
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue<number>()),
            footer: props => props.column.id,
            size: 10,
            meta: {},
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
            },
        },
        {
            accessorKey: "visible",
            header: "Visible",
            cell: info => <Badge intent={info.getValue() === "Visible" ? "success" : "gray"}>{info.getValue() as string}</Badge>,
            size: 0,
            filterFn: getFilterFn("boolean"),
            meta: {
                ...withValueFormatter<string | boolean>(value => {
                    if (value === "true") return "Yes"
                    if (value === "false") return "No"
                    if (value === true) return "Visible"
                    if (value === false) return "Hidden"
                    return ""
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
            cell: info => Intl.DateTimeFormat("us").format(info.getValue() as any),
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
                enableRowSelection
                enableServerSideFiltering // Done
                enableServerSidePagination // Done
                enableServerSideRowSelection // Done
                enableServerSideSorting
                columns={columns}
                data={data}
                serverSideModel={serverSideModel}
                rowCount={totalCount}
                isLoading={isLoading}
                hideColumns={[
                    { below: 850, hide: ["availability", "price"] },
                    { below: 600, hide: ["_actions"] },
                    { below: 515, hide: ["category"] },
                    { below: 400, hide: ["visible", "random_date"] },
                ]}
                onRowSelect={data => {
                    console.log("selection", data)
                }}
                enableOptimisticUpdates
                optimisticUpdatePrimaryKey={"id"}
                onRowEdit={data => {
                    // console.log("editing", data)
                }}
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

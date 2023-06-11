"use client"

import React, { useEffect, useMemo, useState } from "react"
import { faker } from "@faker-js/faker"
import { createDataGridColumns, DataGrid, DataGridFetchingHandlerParams, useDataGridFetchingHandler } from "@/components/ui/datagrid"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { IconButton } from "@/components/ui/button"
import { BiDotsHorizontal } from "@react-icons/all-files/bi/BiDotsHorizontal"
import { BiFolder } from "@react-icons/all-files/bi/BiFolder"
import { BiLowVision } from "@react-icons/all-files/bi/BiLowVision"
import { BiBasket } from "@react-icons/all-files/bi/BiBasket"
import { BiCheck } from "@react-icons/all-files/bi/BiCheck"
import { BiUser } from "@react-icons/all-files/bi/BiUser"
import { useQuery } from "@tanstack/react-query"

interface DataGridTestProps {
    children?: React.ReactNode
}

type Product = {
    id: string
    name: string
    image: string
    visible: boolean
    availability: "in_stock" | "out_of_stock"
    price: number
    category: string | null
}

const range = (len: number) => {
    const arr = []
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

const _data = makeData(30)

export async function fetchData() {
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 0))
    return {
        rows: _data,
    }
}

export async function fetchFromFakeServer(options: DataGridFetchingHandlerParams) {
    // Simulate some network latency
    let a = []
    await new Promise(r => setTimeout(r, 1000))
    a = _data.filter(n => options.globalFilterValue !== "" ? n.name.toLowerCase().trim().includes(options.globalFilterValue.toLowerCase().trim()) : true)
    console.log(a)
    return {
        rows: limitOffset(a, options.limit, options.offset),
        rowCount: a.length
    }
}


export const DataGridTest: React.FC<DataGridTestProps> = (props) => {

    const { children, ...rest } = props

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)


    useEffect(() => {
        async function fetch() {
            const res = await fetchData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    const columns = useMemo(() => createDataGridColumns<Product>(({ withFiltering }) => [
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.getValue(),
            size: 90,
            maxSize: 90,
        },
        {
            accessorKey: "price",
            header: () => "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue() as number),
            footer: props => props.column.id,
            size: 90,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: info => info.getValue(),
            footer: props => props.column.id,
            size: 90,
            ...withFiltering({
                name: "Category",
                type: "radio",
                options: [{ value: "Electronics" }, { value: "Food" }, { value: "-" }],
                icon: <BiFolder/>
            }),
        },
        {
            accessorKey: "availability",
            header: "Availability",
            cell: info => info.getValue(),
            size: 90,
            ...withFiltering({
                name: "Availability",
                type: "checkbox",
                icon: <BiCheck/>,
                options: [
                    {
                        value: "out_of_stock",
                        label: <span className={"flex items-center gap-2"}><BiBasket className={"text-red-500"}/><span>Out of stock</span></span>
                    },
                    {
                        value: "in_stock",
                        label: <span className={"flex items-center gap-2"}><BiBasket className={"text-green-500"}/><span>In stock</span></span>
                    },
                    {
                        value: "test",
                        label: <span className={"flex items-center gap-2"}><BiUser className={"text-green-500"}/><span>Test</span></span>
                    }
                ],
                valueFormatter: (value) => {
                    if (value === "out_of_stock") return "Out of stock"
                    if (value === "in_stock") return "In stock"
                    return value
                }
            })
        },
        {
            accessorKey: "visible",
            header: "Visible",
            cell: info => <Badge intent={info.getValue() ? "success" : "gray"}>{info.getValue() ? "Visible" : "Hidden"}</Badge>,
            size: 90,
            ...withFiltering({
                name: "Visible",
                type: "boolean",
                icon: <BiLowVision/>,
                valueFormatter: (value) => {
                    if (value === "true") return "Yes"
                    if (value === "false") return "No"
                    return ""
                }
            })
        },
        {
            id: "actions",
            size: 10,
            enableSorting: false,
            enableGlobalFilter: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu trigger={<IconButton icon={<BiDotsHorizontal/>} intent={"gray-basic"} size={"sm"}/>}>
                        <DropdownMenu.Item>Edit</DropdownMenu.Item>
                    </DropdownMenu>
                )
            },
        },
    ]), [])

    // Server

    const fetchingHandler = useDataGridFetchingHandler()

    const dataQuery = useQuery({
        queryKey: ["data", fetchingHandler.getParams()],
        queryFn: () => fetchFromFakeServer(fetchingHandler.getParams()),
        keepPreviousData: true, refetchOnWindowFocus: false
    })

    useEffect(() => {
        console.log(fetchingHandler.getParams())
    }, [fetchingHandler])

    return (
        <>
            <DataGrid<Product>
                withManualFiltering={true}
                fetchingHandler={fetchingHandler}
                isFetching={dataQuery.isFetching}
                columns={columns}
                data={dataQuery.data?.rows}
                rowCount={fetchingHandler.getIsFiltering() ? (dataQuery.data?.rowCount ?? 0) : _data.length}
                isLoading={dataQuery.isLoading}
                hideColumns={[
                    { below: 850, hide: ["availability", "price"] },
                    { below: 600, hide: ["action"] },
                    { below: 515, hide: ["category"] },
                    { below: 400, hide: ["visible"] },
                ]}
                enableRowSelection={true}
                onItemSelected={data => {
                    console.log(data)
                }}
            />
            <DataGrid<Product>
                columns={columns}
                data={clientData}
                rowCount={_data.length}
                isLoading={!clientData}
                hideColumns={[
                    { below: 850, hide: ["availability", "price"] },
                    { below: 600, hide: ["action"] },
                    { below: 515, hide: ["category"] },
                    { below: 400, hide: ["visible"] },
                ]}
                enableRowSelection={true}
                onItemSelected={data => {
                    console.log(data)
                }}
            />
        </>
    )

}


export function limitOffset<T>(array: T[], limit: number, offset: number): T[] {
    if (!array) return []

    const length = array.length

    if (!length) {
        return []
    }
    if (offset > length - 1) {
        return []
    }

    const start = Math.min(length - 1, offset)
    const end = Math.min(length, offset + limit)

    return array.slice(start, end)
}

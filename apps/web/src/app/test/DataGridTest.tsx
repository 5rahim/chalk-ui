"use client"

import React, { useEffect, useMemo, useState } from "react"
import { faker } from "@faker-js/faker"
import { createDataGridColumns, DataGrid } from "@/components/ui/datagrid"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { IconButton } from "@/components/ui/button"
import { BiDotsHorizontal } from "@react-icons/all-files/bi/BiDotsHorizontal"
import { BiFolder } from "@react-icons/all-files/bi/BiFolder"
import { BiLowVision } from "@react-icons/all-files/bi/BiLowVision"
import { BiBasket } from "@react-icons/all-files/bi/BiBasket"
import { BiCheck } from "@react-icons/all-files/bi/BiCheck"

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
    // console.log('slice', options.offset,
    //    ((options.offset/options.limit) + 1) * options.limit)
    return {
        rows: _data,
    }
}

export const DataGridTest: React.FC<DataGridTestProps> = (props) => {

    const { children, ...rest } = props

    const [data, setData] = useState<Product[] | undefined>(undefined)

    useEffect(() => {
        async function fetch() {
            const res = await fetchData()
            setData(res.rows)
        }

        fetch()
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

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
                type: "select",
                options: [{ value: "Electronics" }, { value: "Food" }],
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
                    }
                ],
                valueFormatter: (value) => {
                    if (value === "out_of_stock") return "Out of stock"
                    if (value === "in_stock") return "In stock"
                    return ""
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

    return (
        <>
            <DataGrid<Product>
                columns={columns}
                data={data}
                dataCount={_data.length}
                isLoading={!data}
                isFetching={undefined}
                hideColumns={[
                    { below: 850, hide: ["availability", "price"] },
                    { below: 600, hide: ["action"] },
                    { below: 515, hide: ["category"] },
                    { below: 400, hide: ["visible"] },
                ]}
                enableRowSelection={false}
                onItemSelected={data => {
                    console.log(data)
                }}
            />
        </>
    )

}

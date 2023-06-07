"use client"

import React, { useEffect, useMemo, useState } from "react"
import { faker } from "@faker-js/faker"
import { createDataGridColumns, DataGrid } from "@/components/ui/datagrid"
import { Badge } from "@/components/ui/badge"

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
    category_id: string | null
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
        category_id: faker.helpers.shuffle<Product["category_id"]>([
            "505e73f3-4047-4fc7-81bc-55198a1d4bf2",
            "a349ac9e-9851-4dba-9138-981ad693f72c",
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
    await new Promise(r => setTimeout(r, 1000))
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

    const columns = useMemo(() => createDataGridColumns<Product>([
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.getValue(),
            size: 90,
        },
        {
            accessorKey: "price",
            header: () => "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue() as number),
            footer: props => props.column.id,
            size: 90,
        },
        {
            accessorKey: "visible",
            header: "Visible",
            cell: info => <Badge intent={info.getValue() ? "success" : "gray"}>{info.getValue() ? "Visible" : "Hidden"}</Badge>,
            size: 90
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
                    { below: 515, hide: ["category_id"] },
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

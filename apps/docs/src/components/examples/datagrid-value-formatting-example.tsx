import React, { useEffect, useMemo, useState } from "react"
import { createDataGridColumns, DataGrid } from "@/components/ui/datagrid"
import { fetchFakeData } from "@/components/examples/datagrid-fake-api"
import { BiCheck } from "@react-icons/all-files/bi/BiCheck"
import { BiBasket } from "@react-icons/all-files/bi/BiBasket"
import { BiLowVision } from "@react-icons/all-files/bi/BiLowVision"
import { Badge } from "@/components/ui/badge"


export type Product = {
    id: string
    name: string
    image: string
    visible: boolean
    availability: "in_stock" | "out_of_stock"
    price: number
    category: string | null
}

export function DataGridValueFormattingExample() {

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)

    useEffect(() => {
        async function fetch() {
            const res = await fetchFakeData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    const columns = useMemo(() => createDataGridColumns<Product>(({ withFiltering, getFilterFn, withValueFormatter }) => [
        {
            accessorKey: "name",
            header: "Name",
            cell: info => info.getValue(),
            size: 40,
        },
        {
            accessorKey: "price",
            header: () => "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue() as number),
            size: 10,
        },
        {
            accessorKey: "availability",
            header: "Availability",
            cell: info => info.getValue(),
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
                            label: <span className={"flex items-center gap-2"}><BiBasket className={"text-red-500"}/><span>Out of stock</span></span>,
                        },
                        {
                            value: "in_stock",
                            label: <span className={"flex items-center gap-2"}><BiBasket className={"text-green-500"}/><span>In stock</span></span>,
                        },
                    ],
                }),
            },
        },
        {
            accessorKey: "visible",
            header: "Visible",
            cell: info => <Badge intent={info.getValue() === "Visible" ? "success" : "gray"}>{info.getValue<string>()}</Badge>,
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
                    // valueFormatter: (value) => {        // Overrides `withValueFormatter`
                    //     return value ? "Yes" : "No"
                    // },
                }),
            },
        },
    ]), [])

    return (
        <>
            <DataGrid<Product>
                columns={columns}
                data={clientData}
                rowCount={clientData?.length ?? 0}
                isLoading={!clientData}
            />
        </>
    )

}

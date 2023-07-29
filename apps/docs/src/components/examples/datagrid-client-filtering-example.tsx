import React, { useEffect, useMemo, useState } from "react"
import { createDataGridColumns, DataGrid } from "@/components/ui/datagrid"
import { fetchFakeData } from "@/components/examples/datagrid-fake-api"
import { BiFolder } from "@react-icons/all-files/bi/BiFolder"
import { BiCheck } from "@react-icons/all-files/bi/BiCheck"
import { BiBasket } from "@react-icons/all-files/bi/BiBasket"
import { BiLowVision } from "@react-icons/all-files/bi/BiLowVision"
import { BiDotsHorizontal } from "@react-icons/all-files/bi/BiDotsHorizontal"
import { BiEditAlt } from "@react-icons/all-files/bi/BiEditAlt"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { IconButton } from "@/components/ui/button"


export type Product = {
    id: string
    name: string
    image: string
    visible: boolean
    availability: "in_stock" | "out_of_stock"
    price: number
    category: string | null
}

export function DataGridClientFilteringExample() {

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
            accessorKey: "category",
            header: "Category",
            cell: info => info.getValue(),
            size: 20,
            filterFn: getFilterFn("radio"),
            meta: {
                ...withFiltering({
                    name: "Category",
                    type: "radio",
                    options: [{ value: "Electronics" }, { value: "Food" }],
                    icon: <BiFolder/>,
                }),
            },
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
                    valueFormatter: (value) => {        // Overrides `withValueFormatter`
                        return value ? "Yes" : "No"
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
                rowCount={clientData?.length ?? 0}
                isLoading={!clientData}
            />
        </>
    )

}

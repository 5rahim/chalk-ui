import React, { useEffect, useMemo, useState } from "react"
import { Badge } from "../../workshop/badge"
import { IconButton } from "../../workshop/button"
import { defineDataGridColumns, DataGrid, DataGridProps } from "../../workshop/datagrid"
import { DropdownMenu, DropdownMenuItem } from "../../workshop/dropdown-menu"
import { newProduct, Product, range } from "./datagrid-fake-api"
import { BiBasket, BiCalendar, BiCheck, BiDotsHorizontal, BiEditAlt, BiFolder, BiLowVision } from "react-icons/bi"

interface DataGridTestProps {
    tableProps?: Partial<DataGridProps<any>>
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

const _data = makeData(30)

export async function fetchData() {
    // Simulate some network latency
    await new Promise(r => setTimeout(r, 1000))
    return {
        rows: _data,
    }
}


export const DatagridDemo: React.FC<DataGridTestProps> = (props) => {

    const { tableProps } = props

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)

    useEffect(() => {
        async function fetch() {
            const res = await fetchData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    const columns = useMemo(() => defineDataGridColumns<Product>(({ withFiltering, getFilterFn, withValueFormatter }) => [
        {
            accessorKey: "name",
            header: "Name",
            size: 40,
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: info => info.renderValue(),
            size: 10,
            meta: {
                ...withValueFormatter<number>(value => {
                    return "$" + Intl.NumberFormat("en-US").format(value)
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
                    options: [{ value: "Electronics" }, { value: "Food" }],
                    icon: <BiFolder />,
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
                    icon: <BiCheck />,
                    options: [
                        {
                            value: "out_of_stock",
                            label: <span className={"flex items-center gap-2"}><BiBasket
                                className={"text-red-500"}
                            /><span>Out of stock</span></span>,
                        },
                        {
                            value: "in_stock",
                            label: <span className={"flex items-center gap-2"}><BiBasket
                                className={"text-green-500"}
                            /><span>In stock</span></span>,
                        },
                    ],
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
                    icon: <BiCalendar />,
                    name: "Date",
                }),
            },
        },
        {
            accessorKey: "visible",
            header: "Visible",
            cell: info => <Badge
                intent={info.getValue<boolean>() ? "success" : "gray"}
            >{info.renderValue<string>()}</Badge>,
            size: 0,
            filterFn: getFilterFn("boolean"),
            meta: {
                ...withValueFormatter<boolean>(value => {
                    return value ? "Visible" : "Hidden"
                }),
                ...withFiltering({
                    name: "Visible",
                    type: "boolean",
                    icon: <BiLowVision />,
                    valueFormatter: (value) => {
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
                        <DropdownMenu
                            trigger={<IconButton icon={<BiDotsHorizontal />} intent={"gray-basic"} size={"sm"} />}
                        >
                            <DropdownMenuItem><BiEditAlt /> Edit</DropdownMenuItem>
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
                enableRowSelection
                rowSelectionPrimaryKey={"id"}
                onRowSelect={data => {
                    console.log(data)
                }}
                {...tableProps as any}
            />
        </>
    )

}

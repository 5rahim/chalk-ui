import React, { useEffect, useMemo, useState } from "react"
import { createDataGridColumns, DataGrid } from "@/components/ui/datagrid"
import { fetchFakeData } from "@/components/examples/datagrid-fake-api"

export type Product = {
    id: string
    name: string
    image: string
    visible: boolean
    availability: "in_stock" | "out_of_stock"
    price: number
    category: string | null
}

export function DataGridMinimalExample() {

    const [clientData, setClientData] = useState<Product[] | undefined>(undefined)

    useEffect(() => {
        async function fetch() {
            const res = await fetchFakeData()
            setClientData(res.rows)
        }

        fetch()
    }, [])

    const columns = useMemo(() => createDataGridColumns<Product>(() => [
        {
            accessorKey: "name",
            header: "Name",
            size: 60,
        },
        {
            accessorKey: "price",
            header: () => "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue<number>()),
            size: 40,
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

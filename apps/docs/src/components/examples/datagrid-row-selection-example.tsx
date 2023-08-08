import React, { useEffect, useMemo, useState } from "react"
import { createDataGridColumns, DataGrid } from "@/components/ui/datagrid"
import { fetchFakeData, Product } from "@/components/examples/datagrid-fake-api"

export function DatagridRowSelectionExample() {

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
            size: 100,
        },
        {
            accessorKey: "price",
            header: () => "Price",
            cell: info => "$" + Intl.NumberFormat("en-US").format(info.getValue<number>()),
            size: 100,
        },
    ]), [])

    return (
        <>
            <DataGrid<Product>
                columns={columns}
                data={clientData}
                rowCount={clientData?.length ?? 0}
                isLoading={!clientData}
                enableRowSelection
            />
        </>
    )

}

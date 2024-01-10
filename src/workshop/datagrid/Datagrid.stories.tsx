import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { DatagridDemo } from "../../demo/datagrid/datagrid-demo"
import { DatagridEditingServerSideValidationDemo } from "../../demo/datagrid/datagrid-editing-server-side-validation-demo"
import { DatagridServerSideDemo } from "../../demo/datagrid/datagrid-server-side-demo"
import { Toaster } from "../toaster"

const meta = {
    title: "Advanced/DataGrid",
    component: DatagridDemo,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof DatagridDemo>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Responsive: Story = {
    render: () => <DatagridDemo
        tableProps={{
            hideColumns: [
                { below: 850, hide: ["availability", "price"] },
                { below: 600, hide: ["_actions"] },
                { below: 515, hide: ["category"] },
                { below: 400, hide: ["visible"] },
            ],
        }}
    />,
}

export const ServerSide: Story = {
    render: () => <DatagridServerSideDemo />,
}


export const ServerSideEditing: Story = {
    render: () => <>
        <DatagridEditingServerSideValidationDemo />
        <Toaster />
    </>,
}

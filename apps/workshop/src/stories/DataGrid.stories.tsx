import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { DataGridTest } from "../components/DataGridTest"
import { DataGridEditingTest } from "../components/DataGridEditingTest.tsx"

const meta = {
    title: "Advanced/DataGrid",
    component: DataGridTest,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof DataGridTest>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const NonResponsive: Story = {
    render: () => <DataGridTest tableProps={{
        tableClassName: "min-w-[1040px]",
        hideColumns: undefined,
    }}/>,
}

export const WithEditing: Story = {
    render: () => <DataGridEditingTest/>,
}

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { DataGridTest } from "../components/DataGridTest"

const meta = {
    title: "Advanced/DataGrid",
    component: DataGridTest,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof DataGridTest>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {}
}

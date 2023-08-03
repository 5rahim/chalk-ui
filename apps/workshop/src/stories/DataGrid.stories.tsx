import type {Meta, StoryObj} from "@storybook/react"
import React from "react"
import {DataGridTest} from "../components/DataGridTest"
import {DataGridEditingTest} from "../components/DataGridEditingTest"
import {DataGridServerSideTest} from "../components/DataGridServerSideTest"
import {DataGridWithApiTest} from "../components/DataGridWithApiTest"
import {DataGridControlledEditingTest} from "../components/DataGridControlledEditingTest";

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

export const Responsive: Story = {
    render: () => <DataGridTest tableProps={{
        hideColumns: [
            {below: 850, hide: ["availability", "price"]},
            {below: 600, hide: ["_actions"]},
            {below: 515, hide: ["category"]},
            {below: 400, hide: ["visible"]},
        ],
    }}/>,
}

export const Editing: Story = {
    render: () => <DataGridEditingTest/>,
}

export const ControlledEditing: Story = {
    render: () => <DataGridControlledEditingTest/>,
}


export const ServerSide: Story = {
    render: () => <DataGridServerSideTest/>,
}


export const WithApi: Story = {
    render: () => <DataGridWithApiTest/>,
}

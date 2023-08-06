import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { DatagridTest } from "../components/datagrid-test/datagrid-test"
import { DatagridEditingTest } from "../components/datagrid-test/datagrid-editing-test"
import { DatagridServerSideTest } from "../components/datagrid-test/datagrid-server-side-test"
import { DatagridWithApiTest } from "../components/datagrid-test/datagrid-with-api-test"
import {
    DatagridEditingServerSideValidationTest
} from "../components/datagrid-test/datagrid-editing-server-side-validation-test";

const meta = {
    title: "Advanced/DataGrid",
    component: DatagridTest,
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof DatagridTest>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Responsive: Story = {
    render: () => <DatagridTest tableProps={{
        hideColumns: [
            {below: 850, hide: ["availability", "price"]},
            {below: 600, hide: ["_actions"]},
            {below: 515, hide: ["category"]},
            {below: 400, hide: ["visible"]},
        ],
    }}/>,
}

export const Editing: Story = {
    render: () => <DatagridEditingTest/>,
}

export const EditingWithOptimisticUpdates: Story = {
    render: () => <DatagridEditingTest
        tableProps={{
            optimisticUpdatePrimaryKey: "id",
            enableOptimisticUpdates: true
        }}
    />,
}
// export const EditingWithOptimisticUpdatesError: Story = {
//     render: () => <DatagridEditingTest
//         tableProps={{
//             optimisticUpdatePrimaryKey: "id",
//             enableOptimisticUpdates: true,
//             validationSchema: undefined,
//         }}
//     />,
// }

export const EditingWithServerSideValidation: Story = {
    render: () => <DatagridEditingServerSideValidationTest/>,
}


export const ServerSide: Story = {
    render: () => <DatagridServerSideTest/>,
}


export const WithApi: Story = {
    render: () => <DatagridWithApiTest/>,
}

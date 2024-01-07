import type { Meta, StoryObj } from "@storybook/react"
import { DonutChart } from "."

const cities = [
    {
        name: "New York",
        sales: 9800,
    },
    {
        name: "London",
        sales: 4567,
    },
    {
        name: "Hong Kong",
        sales: 3908,
    },
    {
        name: "San Francisco",
        sales: 2400,
    },
    {
        name: "Singapore",
        sales: 1908,
    },
    {
        name: "Zurich",
        sales: 1398,
    },
]

const meta = {
    title: "Components/DataDisplay/DonutChart",
    component: DonutChart,
    tags: ["autodocs"],
    args: {
        className: "mt-6",
        data: cities,
        category: "sales",
        index: "name",
        valueFormatter: (number: number) => {
            return "$ " + Intl.NumberFormat("us").format(number).toString()
        },
        colors: ["slate", "violet", "indigo", "rose", "cyan", "amber"],
    },
} satisfies Meta<typeof DonutChart>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

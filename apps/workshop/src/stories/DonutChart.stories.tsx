import type { Meta, StoryObj } from "@storybook/react"
import { DonutChart, DonutChartProps } from "../components/ui/charts"

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
    title: "Components/Data Display/DonutChart",
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
        colors: ["slate", "violet", "indigo", "rose", "cyan", "amber"]
    },
} satisfies Meta<DonutChartProps>


export default meta
type Story = StoryObj<DonutChartProps>;

export const Basic: Story = {
    args: {}
}

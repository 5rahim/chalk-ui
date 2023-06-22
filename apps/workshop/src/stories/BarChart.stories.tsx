import type { Meta, StoryObj } from "@storybook/react"
import { BarChart, BarChartProps } from "../components/ui/charts"

const barChartData2 = [
    {
        topic: "Topic 1",
        "Group A": 890,
        "Group B": 338,
        "Group C": 538,
        "Group D": 396,
        "Group E": 138,
        "Group F": 436,
    },
    {
        topic: "Topic 2",
        "Group A": 289,
        "Group B": 233,
        "Group C": 253,
        "Group D": 333,
        "Group E": 133,
        "Group F": 533,
    },
]

const meta = {
    title: "Components/Data Display/BarChart",
    component: BarChart,
    tags: ["autodocs"],
    args: {
        className: "h-80 mt-6",
        data: barChartData2,
        index: "name",
        categories: [
            "Group A",
            "Group B",
            "Group C",
            "Group D",
            "Group E",
            "Group F",
        ],
        yAxisWidth: 48,
    },
} satisfies Meta<BarChartProps>


export default meta
type Story = StoryObj<BarChartProps>;

export const Basic: Story = {
    args: {}
}

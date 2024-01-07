import type { Meta, StoryObj } from "@storybook/react"
import { AreaChart } from "."

const areaChartData = [
    {
        date: "Jan 25",
        SemiAnalysis: 2890,
        "The Pragmatic Engineer": 2338,
    },
    {
        date: "Feb 25",
        SemiAnalysis: 2756,
        "The Pragmatic Engineer": 2103,
    },
    {
        date: "Mar 25",
        SemiAnalysis: 3325,
        "The Pragmatic Engineer": 2194,
    },
    {
        date: "Apr 25",
        SemiAnalysis: 2500,
        "The Pragmatic Engineer": 2108,
    },
    {
        date: "May 25",
        SemiAnalysis: 3475,
        "The Pragmatic Engineer": 1812,
    },
    {
        date: "Jun 25",
        SemiAnalysis: 3129,
        "The Pragmatic Engineer": 1726,
    },
]

const meta = {
    title: "Components/DataDisplay/AreaChart",
    component: AreaChart,
    tags: ["autodocs"],
    args: {
        className: "h-80 mt-4",
        data: areaChartData,
        index: "date",
        categories: ["SemiAnalysis", "The Pragmatic Engineer"],
        colors: ["brand", "orange"],
        valueFormatter: (number: number) => {
            return "$ " + Intl.NumberFormat("us").format(number).toString()
        },
    },
} satisfies Meta<typeof AreaChart>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

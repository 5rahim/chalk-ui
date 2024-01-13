import type { Meta, StoryObj } from "@storybook/react"
import { BiBarChart, BiLineChart, BiMouseAlt } from "react-icons/bi"
import { Stats } from "@/workshop/stats"

const meta = {
    title: "Components/Data Display/Stats",
    component: Stats,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <Stats {...args} />
        )
    },
    args: {
        items: [
            {
                icon: <BiBarChart />,
                name: "Total Subscribers",
                value: "71,897",
                unit: "70,946",
                change: "12%",
                trend: "up",
            },
            {
                icon: <BiLineChart />,
                name: "Avg. Open Rate",
                value: "56.16%",
                unit: "58.14%",
                change: "2.02%",
                trend: "down",
            },
            {
                icon: <BiMouseAlt />,
                name: "Avg. Click Rate",
                value: "24.57%",
            },
        ],
        className: "border border-[--border]",
    },
} satisfies Meta<typeof Stats>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

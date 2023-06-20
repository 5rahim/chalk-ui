import type { Meta, StoryObj } from "@storybook/react"
import { Stats, StatsProps } from "../components/ui/stats"

const meta = {
    title: "Components/Data Display/Stats",
    component: Stats,
    tags: ["autodocs"],
    args: {
        items: [
            { name: "Total Subscribers", value: "71,897", unit: "70,946", change: "12%", trend: "up" },
            { name: "Avg. Open Rate", value: "56.16%", unit: "58.14%", change: "2.02%", trend: "down" },
            { name: "Avg. Click Rate", value: "24.57%" },
        ],
        className: "border-b border-[--border]"
    },
    parameters: {
        layout: "fullscreen",
    }
} satisfies Meta<typeof Stats>


export default meta
type Story = StoryObj<StatsProps>;

export const Primary: Story = {
    args: {}
}

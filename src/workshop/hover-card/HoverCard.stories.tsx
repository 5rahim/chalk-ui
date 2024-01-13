import type { Meta, StoryObj } from "@storybook/react"
import { HoverCard } from "@/workshop/hover-card"

const meta = {
    title: "Components/Overlays/HoverCard",
    component: HoverCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: (args) => {
        return (
            <HoverCard {...args}>
                Lorem ipsum dolor sit amet
            </HoverCard>
        )
    },
    args: {
        trigger: <span>Hover this</span>,
    },
} satisfies Meta<typeof HoverCard>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

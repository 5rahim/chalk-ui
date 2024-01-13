import { Tooltip } from "@/workshop/tooltip"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Overlays/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: (args) => {
        return (
            <Tooltip {...args}>
                Lorem ipsum dolor sit amet
            </Tooltip>
        )
    },
    args: {
        trigger: <span>Hover this</span>,
    },
} satisfies Meta<typeof Tooltip>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

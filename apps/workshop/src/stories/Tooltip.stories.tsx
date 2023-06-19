import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip, TooltipProps } from "../components/ui/tooltip"

const meta = {
    title: "Components/Overlays/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <Tooltip trigger={
                <span>Open tooltip</span>
            }>
                Lorem ipsum dolor sit amet
            </Tooltip>
        )
    },
    args: {},
} satisfies Meta<typeof Tooltip>


export default meta
type Story = StoryObj<Omit<TooltipProps, "trigger">>;

export const Primary: Story = {
    args: {}
}

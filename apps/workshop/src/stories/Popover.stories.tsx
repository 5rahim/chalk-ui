import type { Meta, StoryObj } from "@storybook/react"
import { Popover, PopoverProps } from "../components/ui/popover"
import { Button } from "../components/ui/button"

const meta = {
    title: "Components/Overlays/Popover",
    component: Popover,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <Popover trigger={
                <Button>Open</Button>
            }>
                Lorem ipsum dolor sit amet
            </Popover>
        )
    },
    args: {},
} satisfies Meta<typeof Popover>


export default meta
type Story = StoryObj<Omit<PopoverProps, "trigger">>;

export const Basic: Story = {
    args: {}
}

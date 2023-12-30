import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../button/button"
import { Popover, PopoverContent, PopoverProps } from "../popover/popover"

const meta = {
    title: "Components/Overlays/Popover",
    component: Popover,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: (args) => {
        return (
            <Popover
                {...args}
            >
                <PopoverContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                </PopoverContent>
            </Popover>
        )
    },
    args: {
        modal: false,
        trigger: <Button>Open</Button>,
    },
} satisfies Meta<typeof Popover>


export default meta
type Story = StoryObj<Omit<PopoverProps, "trigger">>;

export const Basic: Story = {
    args: {},
}

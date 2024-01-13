import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/workshop/button"
import { Popover, PopoverProps } from "@/workshop/popover"

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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
            </Popover>
        )
    },
    args: {
        modal: false,
        trigger: <Button>Open</Button>,
        align: "center",
        sideOffset: 4,
    },
    argTypes: {
        align: {
            control: {
                type: "radio",
                options: ["center", "start", "end"],
            },
        },
        side: {
            control: {
                type: "radio",
                options: ["top", "right", "bottom", "left"],
            },
        },
        sideOffset: {
            control: {
                type: "number",
                min: 0,
                max: 100,
            },
        },
    },
} satisfies Meta<typeof Popover>


export default meta
type Story = StoryObj<PopoverProps>;

export const Basic: Story = {
    args: {},
}

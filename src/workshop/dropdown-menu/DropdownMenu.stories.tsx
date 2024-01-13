import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Button } from "@/workshop/button"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
} from "@/workshop/dropdown-menu"

const meta = {
    title: "Components/Overlays/DropdownMenu",
    component: DropdownMenu,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {

        return (
            <DropdownMenu
                {...args}
            >
                <DropdownMenuLabel>Group</DropdownMenuLabel>
                <DropdownMenuItem>Item 1</DropdownMenuItem>
                <DropdownMenuItem>Item 2</DropdownMenuItem>
                <DropdownMenuItem>Item 3</DropdownMenuItem>

                <DropdownMenuSub
                    triggerContent="More"
                >
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Item 2</DropdownMenuItem>
                    <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuSub>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Item 4
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>

            </DropdownMenu>
        )
    },
    args: {
        trigger: <Button>Open</Button>,
    },
} satisfies Meta<typeof DropdownMenu>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

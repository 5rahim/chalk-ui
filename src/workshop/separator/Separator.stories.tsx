import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Separator } from "."

const meta = {
    title: "Components/Data Display/Separator",
    component: Separator,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        return (
            <div>
                <div className="space-y-1">
                    <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                    <p className="text-sm text-muted-foreground">
                        An open-source UI component library.
                    </p>
                </div>
                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                    <div>Blog</div>
                    <Separator orientation="vertical" />
                    <div>Docs</div>
                    <Separator orientation="vertical" />
                    <div>Source</div>
                </div>
            </div>
        )
    },
    args: {},
} satisfies Meta<typeof Separator>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

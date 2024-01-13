import type { Meta, StoryObj } from "@storybook/react"
import { ScrollArea, ScrollAreaProps } from "@/workshop/scroll-area"

const meta = {
    title: "Components/Data Display/ScrollArea",
    component: ScrollArea,
    render: function Render() {
        return (
            <div className="w-[300px] border rounded-md">
                <ScrollArea className="h-[400px] w-full p-4">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="h-[30px] border-b">
                            ScrollArea
                        </div>
                    ))}
                </ScrollArea>
            </div>
        )
    },
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        type: "hover",
    },
    argTypes: {
        type: {
            control: {
                type: "radio",
                options: ["auto", "always", "scroll", "hover"],
            },
        },
    },
} satisfies Meta<ScrollAreaProps>

type Story = StoryObj<typeof ScrollArea>

export const Basic: Story = {
    args: {},
}

export default meta

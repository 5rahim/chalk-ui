import { Skeleton } from "@/workshop/skeleton"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Overlays/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <div className="w-full space-y-2">
                <Skeleton {...args} />
                <Skeleton {...args} />
            </div>
        )
    },
    args: {
        className: "h-4",
    },
} satisfies Meta<typeof Skeleton>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

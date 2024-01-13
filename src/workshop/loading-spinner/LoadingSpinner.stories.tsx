import type { Meta, StoryObj } from "@storybook/react"
import { LoadingSpinner } from "@/workshop/loading-spinner"

const meta = {
    title: "Components/Overlays/LoadingSpinner",
    component: LoadingSpinner,
    tags: ["autodocs"],
    render: function Render(args) {
        return (
            <LoadingSpinner
                {...args}
            />
        )
    },
    args: {},
} satisfies Meta<typeof LoadingSpinner>

export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

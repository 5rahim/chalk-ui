import type { Meta, StoryObj } from "@storybook/react"
import { ProgressBar } from "@/workshop/progress-bar"

const meta = {
    title: "Components/Data Display/ProgressBar",
    component: ProgressBar,
    tags: ["autodocs"],
    args: {
        value: 50,
    },
} satisfies Meta<typeof ProgressBar>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Indeterminate: Story = {
    args: {
        isIndeterminate: true,
    },
}

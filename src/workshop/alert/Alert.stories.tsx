import type { Meta, StoryObj } from "@storybook/react"
import { Alert } from "."

const meta = {
    title: "Components/Data Display/Alert",
    component: Alert,
    tags: ["autodocs"],
    args: {
        intent: "info",
        title: "Alert",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae deserunt facilis.",
        onClose: () => {},
    },
} satisfies Meta<typeof Alert>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

import { Avatar } from "../avatar/avatar"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Data Display/Avatar",
    component: Avatar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        src: "https://pbs.twimg.com/media/FgLUzIUWIAA8NDo.jpg",
        fallback: undefined,
    },
} satisfies Meta<typeof Avatar>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Fallback: Story = {
    args: {
        src: undefined,
        fallback: <span className="font-bold text-white">ZB</span>,
        fallbackClass: "bg-indigo-500",
    },
}

export const NoFallback: Story = {
    args: {
        src: undefined,
    },
}

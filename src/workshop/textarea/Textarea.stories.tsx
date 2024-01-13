import { Textarea } from "@/workshop/textarea"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Forms/Textarea",
    component: Textarea,
    tags: ["autodocs"],
    args: {
        label: "Label",
        size: "md",
        error: "",
        help: "",
        leftAddon: "",
        rightAddon: "",
        disabled: false,
        readonly: false,
        required: false,
        leftIcon: undefined,
        rightIcon: undefined,
    },
} satisfies Meta<typeof Textarea>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}
export const Disabled: Story = {
    args: {
        disabled: true,
    },
}
export const Readonly: Story = {
    args: {
        readonly: true,
    },
}

export const Error: Story = {
    args: {
        error: "Oops!",
    },
}

export const Help: Story = {
    args: {
        help: "Help text",
    },
}

export const Large: Story = {
    args: {
        size: "lg",
    },
}

export const LeftAddon: Story = {
    args: {
        leftAddon: "Addon",
    },
}

export const RightAddon: Story = {
    args: {
        rightAddon: "Addon",
    },
}


export const LeftIcon: Story = {
    args: {
        leftIcon: <span>@</span>,
    },
}

export const RightIcon: Story = {
    args: {
        rightIcon: <span>@</span>,
    },
}

export const IconWithAddon: Story = {
    args: {
        leftAddon: "Addon",
        leftIcon: <span>@</span>,
    },
}

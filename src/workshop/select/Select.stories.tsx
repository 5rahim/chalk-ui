import { useArgs } from "@storybook/preview-api"
import * as React from "react"
import { Select } from "../select"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Forms/Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()

        return (
            <div className="min-[900px]:w-[800px] w-full">
                <Select
                    {...args}
                    value={value}
                    onValueChange={(value) => updateArgs({ value })}
                />
            </div>
        )
    },
    args: {
        label: "Label",
        size: "md",
        error: "",
        help: "",
        leftAddon: "",
        rightAddon: "",
        placeholder: "Select a country...",
        disabled: false,
        readonly: false,
        required: false,
        leftIcon: undefined,
        rightIcon: undefined,
        options: [
            { value: "us", label: "United States" },
            { value: "ci", label: "Côte d'Ivoire" },
            { value: "ca", label: "Canada" },
            { value: "jp", label: "Japan" },
            { value: "br", label: "Brazil" },
        ],
        value: undefined,
    },
} satisfies Meta<typeof Select>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Placeholder: Story = {
    args: {
        placeholder: "Select a country...",
    },
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

export const IconWithAddonR: Story = {
    args: {
        rightAddon: "Addon",
        rightIcon: <span>@</span>,
    },
}

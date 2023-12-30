import { Meta, StoryObj } from "@storybook/react"
import { Checkbox, CheckboxProps } from "../checkbox/checkbox"

const meta = {
    title: "Components/Forms/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        label: "Label",
    },
} satisfies Meta<CheckboxProps>


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
        checked: true,
    },
}


export const Large: Story = {
    args: {
        size: "lg",
    },
}

export const Help: Story = {
    args: {
        help: "Help text",
    },
}

export const Error: Story = {
    args: {
        error: "Oops!",
    },
}

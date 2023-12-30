import { CheckboxGroup } from "../checkbox/checkbox-group"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Forms/CheckboxGroup",
    component: CheckboxGroup,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        label: "Label",
        options: [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3" },
            { value: "4", label: "Option 4" },
        ],
        onChange: value => console.log(value),
    },
} satisfies Meta<typeof CheckboxGroup>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Error: Story = {
    args: {
        error: "Error",
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}


export const DisabledOption: Story = {
    args: {
        value: ["4"],
        options: [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3", disabled: true },
            { value: "4", label: "Option 4", disabled: true },
            { value: "5", label: "Option 5", readonly: true },
        ],
    },
}

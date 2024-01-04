import { useArgs } from "@storybook/preview-api"
import { Meta, StoryObj } from "@storybook/react"
import { Checkbox, CheckboxProps } from "../checkbox/checkbox"

const meta = {
    title: "Components/Forms/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <Checkbox
                {...args}
                value={value}
                onValueChange={(value) => updateArgs({ value })}
            />
        )
    },
    tags: ["autodocs"],
    args: {
        label: "Label",
        value: true,
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
        value: true,
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

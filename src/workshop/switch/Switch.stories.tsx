import { useArgs } from "@storybook/preview-api"
import { Switch } from "../switch/switch"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Forms/Switch",
    component: Switch,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <Switch
                {...args}
                value={value}
                onChange={(value) => updateArgs({ value })}
            />
        )
    },
    args: {
        label: "Label",
        value: true,
    },
} satisfies Meta<typeof Switch>


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
        value: true,
        readonly: true,
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

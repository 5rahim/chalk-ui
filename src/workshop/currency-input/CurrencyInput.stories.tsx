import { useArgs } from "@storybook/preview-api"
import { CurrencyInput } from "../currency-input"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Forms/CurrencyInput",
    component: CurrencyInput,
    tags: ["autodocs"],
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <CurrencyInput
                {...args}
                value={value}
                onValueChange={(value, name, values) => {
                    console.log("value", value, name, values)
                    updateArgs({ value })
                }}
            />
        )
    },
    args: {
        label: "Label",
        prefix: "$",
        value: 1234.56,
        intlConfig: { locale: "en-US", currency: "USD" },
    },
} satisfies Meta<typeof CurrencyInput>


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

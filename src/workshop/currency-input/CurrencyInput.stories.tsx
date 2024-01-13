import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Button } from "@/workshop/button"
import { CurrencyInput } from "@/workshop/currency-input"

const meta = {
    title: "Components/Forms/CurrencyInput",
    component: CurrencyInput,
    tags: ["autodocs"],
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <>
                <CurrencyInput
                    {...args}
                    value={value}
                    onValueChange={(value, name, values) => {
                        console.log("value", value, name, values)
                        updateArgs({ value })
                    }}
                />
                <Button
                    className="absolute top-0 right-0"
                    size="sm"
                    intent="gray-outline"
                    onClick={() => {updateArgs({ value: undefined })}}
                >Empty</Button>
            </>
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

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: "50",
        required: true,
        name: "price",
        label: "Price",
    },
    render: function (args) {
        return (
            <form
                action="https://run.mocky.io/v3/7bbf8cd5-9e99-46fb-bfd1-725b7bab59fe"
                method="get"
                onSubmit={e => {
                    e.preventDefault()
                    const data = new FormData(e.currentTarget)
                    for (let [key, value] of data.entries()) {
                        console.log(key, value)
                    }
                }}
                className="min-[900px]:w-[800px] w-full"
            >
                <CurrencyInput
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}


import { useArgs } from "@storybook/preview-api"
import * as React from "react"
import { Switch } from "@/workshop/switch/switch"
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
                onValueChange={(value) => updateArgs({ value })}
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

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: true,
        required: true,
        name: "show",
        label: "Show",
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
                <Switch
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}


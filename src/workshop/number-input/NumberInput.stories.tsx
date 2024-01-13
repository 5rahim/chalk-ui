import { Button } from "@/workshop/button"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { NumberInput } from "@/workshop/number-input"

const meta = {
    title: "Components/Forms/NumberInput",
    component: NumberInput,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <div className="min-[900px]:w-[800px] w-full">
                <NumberInput
                    {...args}
                    value={value}
                    onValueChange={(value) => updateArgs({ value })}
                />
                <Button
                    className="absolute top-0 right-0"
                    size="sm"
                    intent="gray-outline"
                    onClick={() => {updateArgs({ value: undefined })}}
                >Empty</Button>
            </div>
        )
    },
    args: {
        label: "Label",
        value: 20,
        min: 0,
        max: 50,
        step: 2,
        formatOptions: {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        },
        allowMouseWheel: true,
        hideControls: false,
        locale: "fr-FR",
    },
} satisfies Meta<typeof NumberInput>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Discrete: Story = {
    args: {
        hideControls: true,
    },
}

export const RightAddon: Story = {
    args: {
        rightAddon: ".00",
    },
}

export const RightIcon: Story = {
    args: {
        rightIcon: "%",
    },
}

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: 10,
        required: true,
        name: "number",
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
                <NumberInput
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}

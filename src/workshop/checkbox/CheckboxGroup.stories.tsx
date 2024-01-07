import { Button } from "../button"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { CheckboxGroup } from "../checkbox/checkbox-group"

const meta = {
    title: "Components/Forms/CheckboxGroup",
    component: CheckboxGroup,
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <>
                <CheckboxGroup
                    {...args}
                    value={value}
                    onValueChange={(value) => updateArgs({ value })}
                />
                <Button
                    className="absolute top-0 right-0"
                    size="sm"
                    intent="gray-outline"
                    onClick={() => {updateArgs({ value: [] })}}
                >Empty</Button>
            </>
        )
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

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: ["3"],
        required: true,
        name: "option",
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
                <CheckboxGroup
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}

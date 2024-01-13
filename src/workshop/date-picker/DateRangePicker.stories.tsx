import { Button } from "@/workshop/button"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { fr } from "date-fns/locale"
import * as React from "react"
import { DateRangePicker } from "@/workshop/date-picker"

const meta = {
    title: "Components/Forms/DateRangePicker",
    component: DateRangePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <div className="min-[900px]:w-[800px] w-full">
                <DateRangePicker
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
    },
} satisfies Meta<typeof DateRangePicker>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Locale: Story = {
    args: {
        locale: fr,
    },
}

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: {
            from: new Date(),
            to: new Date(),
        },
        required: true,
        name: "Birthday",
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
                <DateRangePicker
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}

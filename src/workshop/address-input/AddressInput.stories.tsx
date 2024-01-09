import { useArgs } from "@storybook/preview-api"
import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { AddressInput } from "../address-input"
import { Button } from "../button"

const meta = {
    title: "Components/Forms/AddressInput",
    component: AddressInput,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {

        const [{ value }, updateArgs] = useArgs()

        return (
            <div className="min-[900px]:w-[800px] w-full">
                <AddressInput
                    {...args}
                    value={value}
                    onValueChange={(value) => updateArgs({ value })}
                />
                <Button
                    className="absolute top-0 right-0"
                    size="sm"
                    intent="gray-outline"
                    onClick={() => {updateArgs({ value: { label: "", value: null } })}}
                >Empty</Button>
            </div>
        )
    },
    args: {
        label: "Address",
        apiKey: process.env.STORYBOOK_GOOGLE_MAPS_API_KEY,
    },
} satisfies Meta<typeof AddressInput>


export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
    args: {},
}


export const ControlledDefaultValue: Story = {
    args: {
        value: { value: null, label: "Abidjan, Côte d'Ivoire" },
    },
}

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: { value: null, label: "Abidjan, Côte d'Ivoire" },
        required: true,
        name: "address",
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
                <AddressInput
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}

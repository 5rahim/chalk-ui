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
        apiKey: process.env.STORYBOOK_GOOGLE_MAPS_API_KEY,
    },
} satisfies Meta<typeof AddressInput>


export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
    args: {},
}


export const DefaultValue: Story = {
    args: {
        value: { value: null, label: "Abidjan, Côte d'Ivoire" },
    },
}

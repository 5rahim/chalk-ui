import { useArgs } from "@storybook/preview-api"
import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Autocomplete } from "../autocomplete/autocomplete"

const options = [
    { value: "us", label: "United States" },
    { value: "ci", label: "Côte d'Ivoire" },
    { value: "ca", label: "Canada" },
    { value: "jp", label: "Japan" },
    { value: "br", label: "Brazil" },
]

const meta = {
    title: "Components/Forms/Autocomplete",
    component: Autocomplete,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {

        const [{ value }, updateArgs] = useArgs()

        return (
            <div className="min-[900px]:w-[800px] min-w-full">
                <Autocomplete
                    {...args}
                    value={value}
                    onChange={(value) => {
                        console.log("value", value)
                        updateArgs({ value })
                    }}
                />
            </div>
        )
    },
    args: {
        options: options,
        label: "Label",
        placeholder: "Enter a framework...",
        emptyMessage: "No framework found",
        value: undefined,
    },
} satisfies Meta<typeof Autocomplete>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const EmptyList: Story = {
    args: {
        options: [],
    },
}

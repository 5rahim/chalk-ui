import { Button } from "@/workshop/button"
import { useArgs } from "@storybook/preview-api"
import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Autocomplete } from "@/workshop/autocomplete/autocomplete"

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
                    onValueChange={(value) => {
                        console.log("value", value)
                        updateArgs({ value })
                    }}
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
        options: options,
        label: "Label",
        placeholder: "Enter a country...",
        value: undefined,
    },
} satisfies Meta<typeof Autocomplete>


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

export const IsFetching: Story = {
    args: {
        isFetching: true,
    },
}

export const ShowEmptyMessage: Story = {
    args: {
        emptyMessage: "No country found",
    },
}

export const EmptyList: Story = {
    args: {
        options: [],
    },
}

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: { value: "jp", label: "Japan" },
        required: true,
        name: "country",
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
                <Autocomplete
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}

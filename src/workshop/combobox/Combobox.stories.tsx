import { useArgs } from "@storybook/preview-api"
import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { BiMapPin } from "react-icons/bi"
import { Button } from "@/workshop/button"
import { Combobox } from "@/workshop/combobox"

const meta = {
    title: "Components/Forms/Combobox",
    component: Combobox,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {

        const [{ value }, updateArgs] = useArgs()

        return (
            <div className="min-[900px]:w-[800px] w-full">
                <Combobox
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
            </div>
        )
    },
    args: {
        options: [
            {
                value: "us",
                textValue: "United States",
                label: <div className="flex gap-2 items-center font-semibold"><BiMapPin /> United States</div>,
            },
            { value: "ci", textValue: "Côte d'Ivoire", label: "Côte d'Ivoire" },
            { value: "jp", textValue: "Japan", label: "Japan" },
            { value: "br", textValue: "Brazil", label: "Brazil" },
            { value: "uk", textValue: "United Kingdom", label: "United Kingdom" },
            { value: "sn", textValue: "Senegal", label: "Senegal" },
            { value: "fr", textValue: "France", label: "France" },
            { value: "de", textValue: "Germany", label: "Germany" },
            { value: "ng", textValue: "Nigeria", label: "Nigeria" },
            { value: "ca", textValue: "Canada", label: "Canada" },
            { value: "gh", textValue: "Ghana", label: "Ghana" },
            { value: "za", textValue: "South Africa", label: "South Africa" },
        ],
        label: "Label",
        placeholder: "Select a country...",
        emptyMessage: "No country found",
        value: ["ci"],
    },
} satisfies Meta<typeof Combobox>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Multiple: Story = {
    args: {
        multiple: true,
    },
}

export const WithoutTextValue: Story = {
    args: {
        options: [
            { value: "us", label: <div className="flex gap-2 items-center font-semibold"><BiMapPin /> United States</div> },
            { value: "ci", label: "Côte d'Ivoire" },
            { value: "jp", label: "Japan" },
            { value: "br", label: "Brazil" },
            { value: "uk", label: "United Kingdom" },
            { value: "sn", label: "Senegal" },
            { value: "fr", label: "France" },
            { value: "de", label: "Germany" },
            { value: "ng", label: "Nigeria" },
            { value: "ca", label: "Canada" },
            { value: "gh", label: "Ghana" },
            { value: "za", label: "South Africa" },
        ],
        help: "The search function will rely on the 'value' property if 'textValue' is not provided.",
    },
}


export const MultipleWithouttextValue: Story = {
    args: {
        multiple: true,
        options: [
            {
                value: "ussssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
                label: <div className="flex gap-2 items-center font-semibold"><BiMapPin /> United States</div>,
            },
            { value: "ci", label: "Côte d'Ivoire" },
            { value: "jp", label: "Japan" },
            { value: "br", label: "Brazil" },
            { value: "uk", label: "United Kingdom" },
            { value: "sn", label: "Senegal" },
            { value: "fr", label: "France" },
            { value: "de", label: "Germany" },
            { value: "ng", label: "Nigeria" },
            { value: "ca", label: "Canada" },
            { value: "gh", label: "Ghana" },
            { value: "za", label: "South Africa" },
        ],
        help: "The 'value' property will be displayed if 'textValue' is not provided.",
    },
}

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: ["ci"],
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
                <Combobox
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}

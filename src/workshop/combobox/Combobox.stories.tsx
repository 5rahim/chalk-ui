import { useArgs } from "@storybook/preview-api"
import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { BiMapPin } from "react-icons/bi"
import { Combobox } from "../combobox/combobox"

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
            <div className="min-[900px]:w-[800px] min-w-full">
                <Combobox
                    {...args}
                    value={value}
                    onChange={(value) => updateArgs({ value })}
                />
            </div>
        )
    },
    args: {
        options: [
            {
                value: "us",
                comparisonValue: "United States",
                label: <div className="flex gap-2 items-center font-semibold"><BiMapPin /> United States</div>,
            },
            { value: "ci", comparisonValue: "Côte d'Ivoire", label: "Côte d'Ivoire" },
            { value: "jp", comparisonValue: "Japan", label: "Japan" },
            { value: "br", comparisonValue: "Brazil", label: "Brazil" },
            { value: "uk", comparisonValue: "United Kingdom", label: "United Kingdom" },
            { value: "sn", comparisonValue: "Senegal", label: "Senegal" },
            { value: "fr", comparisonValue: "France", label: "France" },
            { value: "de", comparisonValue: "Germany", label: "Germany" },
            { value: "ng", comparisonValue: "Nigeria", label: "Nigeria" },
            { value: "ca", comparisonValue: "Canada", label: "Canada" },
            { value: "gh", comparisonValue: "Ghana", label: "Ghana" },
            { value: "za", comparisonValue: "South Africa", label: "South Africa" },
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

export const WithoutComparisonValue: Story = {
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
    },
}


export const MultipleWithoutComparisonValue: Story = {
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
    },
}

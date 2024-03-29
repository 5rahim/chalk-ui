import { cn } from "@/workshop/core/styling"
import { Button } from "@/workshop/button"
import * as React from "react"
import { useArgs } from "@storybook/preview-api"
import { BiCheck } from "react-icons/bi"
import { RadioGroup } from "@/workshop/radio-group"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Forms/RadioGroup",
    component: RadioGroup,
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <div className="min-[900px]:w-[400px] w-full">
                <RadioGroup
                    {...args}
                    value={value}
                    onValueChange={(value) => updateArgs({ value })}
                />
                <Button
                    className="absolute top-0 right-0"
                    size="sm"
                    intent="gray-outline"
                    onClick={() => {updateArgs({ value: "" })}}
                >Empty</Button>
            </div>
        )
    },
    tags: ["autodocs"],
    args: {
        label: "Label",
        value: undefined,
        options: [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3" },
            { value: "4", label: "Option 4" },
        ],
    },
} satisfies Meta<typeof RadioGroup>


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
        value: "5",
        options: [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3", disabled: true },
            { value: "4", label: "Option 4", disabled: true },
            { value: "5", label: "Option 5", readonly: true },
        ],
    },
}


export const Cards: Story = {
    args: {
        stackClass: "flex flex-col gap-2",
        itemContainerClass: cn(
            "cursor-pointer border-2 transition border-transparent rounded-[--radius] p-4 w-full",
            "bg-gray-50 dark:bg-gray-900",
            "data-[state=checked]:bg-white data-[state=checked]:border-[--border]",
            "dark:data-[state=checked]:bg-gray-800",
            "focus:ring-2 ring-[--ring] ring-offset-1 ring-offset-[--background] focus-within:ring-2 transition",
            "data-[state=checked]:border-2 data-[state=checked]:border-[--brand] data-[state=checked]:ring-offset-0",
        ),
        itemClass: cn(
            "border-transparent absolute top-2 right-2 bg-transparent dark:bg-transparent dark:data-[state=unchecked]:bg-transparent",
            "data-[state=unchecked]:bg-transparent data-[state=unchecked]:hover:bg-transparent dark:data-[state=unchecked]:hover:bg-transparent",
            "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent",
        ),
        itemIndicatorClass: "",
        itemLabelClass: "font-semibold",
        itemCheckIcon: <BiCheck className="text-white text-lg" />,
    },
}

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: undefined,
        required: false,
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
                <RadioGroup
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}


import { useArgs } from "@storybook/preview-api"
import { PhoneInput } from "../phone-input"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Forms/PhoneInput",
    component: PhoneInput,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <div className="min-[900px]:w-[800px] w-full">
                <PhoneInput
                    {...args}
                    value={value}
                    onValueChange={(value) => {
                        console.log("value", value)
                        updateArgs({ value })
                    }}
                />
            </div>
        )
    },
    args: {
        label: "Label",
        value: "+1 234 567 8900",
        // defaultCountry: "US",
    },
} satisfies Meta<typeof PhoneInput>


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

export const Error: Story = {
    args: {
        error: "Oops!",
    },
}


export const LeftAddon: Story = {
    args: {
        leftAddon: "Addon",
    },
}

import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { PhoneInput } from "@/workshop/phone-input"

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
        value: "+1 (240) 567 9999",
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

export const Uncontrolled: Story = {
    args: {
        value: undefined,
        defaultValue: "+1 (240) 567 9999",
        required: true,
        name: "phone",
        label: "Phone number",
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
                <PhoneInput
                    {...args}
                />
                <button type="submit">Submit</button>
            </form>
        )
    },
}


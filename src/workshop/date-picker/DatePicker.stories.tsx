import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { fr } from "date-fns/locale"
import { DatePicker } from "../date-picker"

const meta = {
    title: "Components/Forms/DatePicker",
    component: DatePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <div className="min-[900px]:w-[800px] w-full">
                <DatePicker
                    {...args}
                    // value={value}
                    // onValueChange={(value) => updateArgs({ value })}
                />
            </div>
        )
    },
    args: {
        label: "Label",
        // value: true,
    },
} satisfies Meta<typeof DatePicker>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}


export const HideYearSelector: Story = {
    args: {
        hideYearSelector: true,
    },
}

export const Locale: Story = {
    args: {
        locale: fr,
    },
}

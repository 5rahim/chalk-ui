import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { fr } from "date-fns/locale"
import { DateRangePicker } from "../date-picker"

const meta = {
    title: "Components/Forms/DateRangePicker",
    component: DateRangePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <div className="min-[900px]:w-[800px] w-full">
                <DateRangePicker
                    {...args}
                    value={value}
                    onValueChange={(value) => updateArgs({ value })}
                />
            </div>
        )
    },
    args: {
        label: "Label",
    },
} satisfies Meta<typeof DateRangePicker>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Locale: Story = {
    args: {
        locale: fr,
    },
}

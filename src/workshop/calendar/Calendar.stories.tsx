import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "../calendar"


const meta = {
    title: "Components/Forms/Calendar",
    component: Calendar,
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <div className="min-[900px]:w-[800px] w-full">
                <Calendar
                    {...args}
                    selected={value}
                    mode="single"
                    onSelect={(value) => {
                        console.log("value", value)
                        updateArgs({ value })
                    }}
                />
            </div>
        )
    },
    tags: ["autodocs"],
    args: {
        selected: new Date(),
        mode: "single",
    },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {},
}

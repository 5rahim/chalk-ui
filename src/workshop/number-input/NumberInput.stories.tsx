import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { NumberInput } from "../number-input"

const meta = {
    title: "Components/Forms/NumberInput",
    component: NumberInput,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs()
        return (
            <div className="min-[900px]:w-[800px] w-full">
                <NumberInput
                    {...args}
                    value={value}
                    onValueChange={(value) => updateArgs({ value })}
                />
            </div>
        )
    },
    args: {
        label: "Label",
        value: 20,
        min: 0,
        max: 50,
        step: 2,
        allowMouseWheel: true,
        hideControls: false,
    },
} satisfies Meta<typeof NumberInput>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Discrete: Story = {
    args: {
        hideControls: true,
    },
}

export const RightAddon: Story = {
    args: {
        rightAddon: ".00",
    },
}
export const RightIcon: Story = {
    args: {
        rightIcon: "%",
    },
}

import type { Meta, StoryObj } from "@storybook/react"
import { NumberInput } from "../components/ui/number-input"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/NumberInput",
   component: NumberInput,
   tags: ["autodocs"],
   args: {
      label: "Label",
      defaultValue: 20,
      value: 20,
      min: 0,
      max: 50,
      minFractionDigits: 0,
      maxFractionDigits: 4,
      precision: 2,
      step: 2,
      allowMouseWheel: true,
      discrete: false,
   },
} satisfies Meta<typeof NumberInput>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Discrete: Story = {
   args: {
      discrete: true,
   },
}

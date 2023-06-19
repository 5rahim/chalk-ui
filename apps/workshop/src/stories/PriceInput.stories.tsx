import type { Meta, StoryObj } from "@storybook/react"
import { PriceInput } from "../components/ui/price-input"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/PriceInput",
   component: PriceInput,
   tags: ["autodocs"],
   args: {
      label: "Label",
      defaultValue: 20000,
      currency: "USD",
   },
} satisfies Meta<typeof PriceInput>


export default meta
type Story = StoryObj<typeof meta>;

export const Base: Story = {
   args: {},
}

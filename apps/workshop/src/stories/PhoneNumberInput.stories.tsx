import { PhoneNumberInput } from "../components/ui/phone-number-input"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/PhoneNumberInput",
   component: PhoneNumberInput,
   tags: ["autodocs"],
   args: {
      label: "Label",
   },
} satisfies Meta<typeof PhoneNumberInput>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const IconWithAddon: Story = {
   args: {
      leftAddon: "Addon",
      leftIcon: <span>@</span>,
   },
}

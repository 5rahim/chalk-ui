import { Checkbox } from "../components/ui/checkbox"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/Checkbox",
   component: Checkbox,
   tags: ["autodocs"],
   args: {
      label: "Label",
   },
} satisfies Meta<typeof Checkbox>


export default meta
type Story = StoryObj<typeof meta>;

export const Base: Story = {
   args: {},
}

export const Disabled: Story = {
   args: {
      isDisabled: true,
   },
}

export const Large: Story = {
   args: {
      size: "lg",
   },
}


export const Help: Story = {
   args: {
      help: "Help text",
   },
}


export const Error: Story = {
   args: {
      error: "Oops!",
   },
}


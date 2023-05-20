import { Select } from "ui"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/Select",
   component: Select,
   tags: ["autodocs"],
   args: {
      label: "Label",
      options: [
         { value: "1", label: "Option 1" },
         { value: "2", label: "Option 2" },
         { value: "3", label: "Option 3" },
         { value: "4", label: "Option 4" },
      ],
   },
} satisfies Meta<typeof Select>


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

export const Error: Story = {
   args: {
      error: "Oops!",
   },
}

export const Help: Story = {
   args: {
      help: "Help text",
   },
}

export const Large: Story = {
   args: {
      size: "lg",
   },
}

export const LeftAddon: Story = {
   args: {
      leftAddon: "Addon",
   },
}

export const RightAddon: Story = {
   args: {
      rightAddon: "Addon",
   },
}


export const LeftIcon: Story = {
   args: {
      leftIcon: <span>@</span>,
   },
}

export const RightIcon: Story = {
   args: {
      rightIcon: <span>@</span>,
   },
}

export const IconWithAddon: Story = {
   args: {
      leftAddon: "Addon",
      leftIcon: <span>@</span>,
   },
}

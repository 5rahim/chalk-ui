import { NumberInput } from "ui"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/NumberInput",
   component: NumberInput,
   tags: ["autodocs"],
   args: {
      label: "Label",
   },
} satisfies Meta<typeof NumberInput>


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

export const Discrete: Story = {
   args: {
      discrete: true,
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


export const IconWithAddon: Story = {
   args: {
      leftAddon: "Addon",
      leftIcon: <span>@</span>,
   },
}

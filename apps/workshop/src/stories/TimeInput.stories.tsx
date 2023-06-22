import { TimeInput } from "../components/ui/date-time"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/TimeInput",
   component: TimeInput,
   tags: ["autodocs"],
   args: {
      label: "Label",
      size: "md",
      error: "",
      help: "",
      leftAddon: "",
      rightAddon: "",
      isDisabled: false,
      isRequired: false,
      leftIcon: undefined,
      rightIcon: undefined,
   },
} satisfies Meta<typeof TimeInput>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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

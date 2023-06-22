import { Switch } from "../components/ui/switch"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/Switch",
   component: Switch,
   tags: ["autodocs"],
   args: {
      label: "Label",
   },
} satisfies Meta<typeof Switch>


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


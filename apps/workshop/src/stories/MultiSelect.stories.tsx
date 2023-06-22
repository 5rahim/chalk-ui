import type { Meta, StoryObj } from "@storybook/react"
import { MultiSelect } from "../components/ui/multi-select"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/MultiSelect",
   component: MultiSelect,
   tags: ["autodocs"],
   args: {
      label: "Label",
      discrete: false,
      max: 2,
      value: ["1"],
      defaultValue: ["1"],
      options: [
         { value: "1", label: "Option 1" },
         { value: "2", label: "Option 2" },
         { value: "3", label: "Option 3" },
         { value: "4", label: "Option 4" },
      ],
   },
} satisfies Meta<typeof MultiSelect>


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

export const IconWithAddon: Story = {
   args: {
      leftAddon: "Addon",
      leftIcon: <span>@</span>,
   },
}

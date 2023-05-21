import type { Meta, StoryObj } from "@storybook/react"
import { Alert } from "ui"

const meta = {
   title: "Components/Data Display/Alert",
   component: Alert,
   tags: ["autodocs"],
   args: {
      intent: "info",
      title: "Alert",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae deserunt facilis.",
      onClose: () => {},
   },
   argTypes: {
      intent: {
         options: ["info", "warning", "alert", "success", "info-basic", "warning-basic", "alert-basic", "success-basic"],
         control: { type: "radio" },
      },
   },
} satisfies Meta<typeof Alert>


export default meta
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
   args: {},
}

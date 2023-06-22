import { CheckboxGroup } from "../components/ui/checkbox"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/CheckboxGroup",
   component: CheckboxGroup,
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
} satisfies Meta<typeof CheckboxGroup>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
   args: {}
}

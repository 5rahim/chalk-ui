import type { Meta, StoryObj } from "@storybook/react"
import { Combobox } from "../components/ui/combobox"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/Combobox",
   component: Combobox,
   tags: ["autodocs"],
   args: {
      label: "Label",
      placeholder: "Placeholder",
      noOptionsMessage: "Nothing",
      allowCustomValue: false,
      withFiltering: true,
      returnValueOrLabel: "label",
      options: [
         { value: "1", label: "Option 1" },
         { value: "2", label: "Option 2" },
         { value: "3", label: "Option 3" },
         { value: "4", label: "Option 4" },
      ],
   },
} satisfies Meta<typeof Combobox>


export default meta
type Story = StoryObj<typeof meta>;

export const Base: Story = {
   args: {},
}

export const Suggestions: Story = {
   args: {
      label: "Country",
      placeholder: "Enter your country",
      options: [
         { value: "us", label: "United States" },
         { value: "ci", label: "Côte d'Ivoire" },
         { value: "jp", label: "Japan" },
         { value: "br", label: "Brazil" },
      ],
      withFiltering: true,
      allowCustomValue: true,
      returnValueOrLabel: "label",
      noOptionsMessage: undefined,
   },
}

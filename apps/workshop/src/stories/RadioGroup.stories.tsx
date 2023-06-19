import { RadioGroup } from "../components/ui/radio-group"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Forms/RadioGroup",
   component: RadioGroup,
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
} satisfies Meta<typeof RadioGroup>


export default meta
type Story = StoryObj<typeof meta>;

export const Base: Story = {}

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
      label: "Label",
      help: "Help text",
   },
}


export const Error: Story = {
   args: {
      label: "Label",
      error: "Oops!",
   },
}

export const Cards: Story = {
   args: {
      defaultValue: "1",
      fieldClassName: "w-full",
      fieldLabelClassName: "text-md",
      stackClassName: "flex flex-col md:flex-row gap-2 space-y-0",
      radioContainerClassName: "block w-full p-4 cursor-pointer dark:bg-gray-900 transition border border-[--border] rounded-[--radius] data-checked:ring-2 data-checked:ring-[--ring]",
      radioControlClassName: "absolute right-2 top-2 h-5 w-5 text-xs",
      radioLabelClassName: "font-semibold flex-none flex",
      radioHelpClassName: "text-sm",
   }
}


export const SegmentedControl: Story = {
   args: {
      defaultValue: "1",
      fieldClassName: "!w-fit",
      fieldLabelClassName: "text-md",
      stackClassName: "flex flex-row gap-2 p-1 bg-gray-50 dark:bg-gray-800 rounded-[--radius] w-fit space-y-0",
      radioContainerClassName: "block w-fit py-1 px-3 cursor-pointer border border-transparent transition rounded-[--radius] data-checked:bg-white dark:data-checked:bg-gray-700 data-checked:border-[--border] data-checked:shadow-sm text-[--muted] data-checked:text-[--text-color]",
      radioControlClassName: "hidden",
      radioLabelClassName: "font-semibold flex-none",
      radioHelpClassName: "text-base",
   }
}

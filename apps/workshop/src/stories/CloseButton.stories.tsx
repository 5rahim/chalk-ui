import type { Meta, StoryObj } from "@storybook/react"
import { CloseButton } from "../components/ui/button"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: "Components/Forms/CloseButton",
    component: CloseButton,
    tags: ["autodocs"],
    args: {
        intent: "gray-outline"
    },
} satisfies Meta<typeof CloseButton>


export default meta
type Story = StoryObj<typeof meta>;

export const Small: Story = {
   args: {},
}

export const Medium: Story = {
   args: {
      size: "md",
   },
}
export const Large: Story = {
   args: {
      size: "lg",
   },
}

export const XLarge: Story = {
   args: {
      size: "xl",
   },
}

export const Colors: Story = {
   render: () => (
      <div className="flex flex-row gap-2 flex-wrap">
         <CloseButton intent="primary">CloseButton</CloseButton>
         <CloseButton intent="primary-subtle">CloseButton</CloseButton>
         <CloseButton intent="primary-outline">CloseButton</CloseButton>
         <CloseButton intent="primary-link">CloseButton</CloseButton>

          <CloseButton intent="alert">CloseButton</CloseButton>
         <CloseButton intent="alert-subtle">CloseButton</CloseButton>
         <CloseButton intent="alert-outline">CloseButton</CloseButton>
         <CloseButton intent="alert-link">CloseButton</CloseButton>

          <CloseButton intent="success">CloseButton</CloseButton>
         <CloseButton intent="success-subtle">CloseButton</CloseButton>
         <CloseButton intent="success-outline">CloseButton</CloseButton>
         <CloseButton intent="success-link">CloseButton</CloseButton>

          <CloseButton intent="warning">CloseButton</CloseButton>
         <CloseButton intent="warning-subtle">CloseButton</CloseButton>
         <CloseButton intent="warning-outline">CloseButton</CloseButton>
         <CloseButton intent="warning-link">CloseButton</CloseButton>

          <CloseButton intent="gray">CloseButton</CloseButton>
         <CloseButton intent="gray-subtle">CloseButton</CloseButton>
         <CloseButton intent="gray-outline">CloseButton</CloseButton>
         <CloseButton intent="gray-link">CloseButton</CloseButton>

          <CloseButton intent="white">CloseButton</CloseButton>
         <CloseButton intent="white-subtle">CloseButton</CloseButton>
         <CloseButton intent="white-outline">CloseButton</CloseButton>
         <CloseButton intent="white-link">CloseButton</CloseButton>
      </div>
   ),
}

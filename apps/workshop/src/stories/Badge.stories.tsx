import { Badge } from "../components/ui/badge"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Data Display/Badge",
   component: Badge,
   tags: ["autodocs"],
} satisfies Meta<typeof Badge>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        children: "Badge",
    },
}
export const Large: Story = {
    args: {
        size: "lg",
        children: "Badge",
    },
}

export const XLarge: Story = {
   args: {
      size: "xl",
      children: "Badge",
   },
}
export const Small: Story = {
   args: {
      size: "sm",
      children: "Badge",
   },
}

export const Colors: Story = {
   render: () => (
      <div className="flex flex-row gap-2 flex-wrap">
         <Badge intent="primary">Badge</Badge>
         <Badge intent="primary-solid">Badge</Badge>

          <Badge intent="alert">Badge</Badge>
         <Badge intent="alert-solid">Badge</Badge>

          <Badge intent="success">Badge</Badge>
         <Badge intent="success-solid">Badge</Badge>

          <Badge intent="warning">Badge</Badge>
         <Badge intent="warning-solid">Badge</Badge>

          <Badge intent="gray">Badge</Badge>
         <Badge intent="gray-solid">Badge</Badge>

          <Badge intent="blue">Badge</Badge>
         <Badge intent="blue-solid">Badge</Badge>

          <Badge intent="white">Badge</Badge>
         <Badge intent="white-solid">Badge</Badge>
      </div>
   ),
}

export const Tag: Story = {
   args: {
      tag: true,
      children: "Badge",
   },
}
export const ClosableTag: Story = {
   args: {
      tag: true,
      isClosable: true,
      children: "Badge",
   },
}

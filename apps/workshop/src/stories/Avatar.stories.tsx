import { Avatar } from "ui"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Data Display/Avatar",
   component: Avatar,
   tags: ["autodocs"],
   args: {
      src: "https://pbs.twimg.com/media/FgLUzIUWIAA8NDo.jpg",
      size: "md",
      placeholder: undefined,
   },
   argTypes: {
      placeholder: { type: "string" },
      size: {
         options: ["sm", "md", "lg", "xl", "2xl"],
         control: { type: "radio" },
      },
   },
} satisfies Meta<typeof Avatar>


export default meta
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
   args: {},
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
export const Small: Story = {
   args: {
      size: "sm",
   },
}

export const Fallback: Story = {
   args: {
      src: "https://rahim.app",
   },
}


export const Placeholder: Story = {
   args: {
      src: undefined,
      placeholder: "ZB",
   },
}

export const CustomPlaceholder: Story = {
   args: {
      src: undefined,
      placeholder: "ZB",
      placeholderClassName: "bg-red-500",
   },
}

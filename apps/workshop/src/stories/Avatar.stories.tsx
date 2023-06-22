import { Avatar } from "../components/ui/avatar"
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
} satisfies Meta<typeof Avatar>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
   args: {},
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

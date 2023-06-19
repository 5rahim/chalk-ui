import { Avatar, AvatarShowcase } from "../components/ui/avatar"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Data Display/AvatarShowcase",
   component: AvatarShowcase,
   tags: ["autodocs"],
   args: {
      avatar: <Avatar src="https://pbs.twimg.com/media/FgLUzIUWIAA8NDo.jpg" />,
      name: "Luffy",
      description: "King of the Pirates",
   },
} satisfies Meta<typeof AvatarShowcase>


export default meta
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
   args: {},
}

export const Small: Story = {
   args: {
      avatar: <Avatar src="https://pbs.twimg.com/media/FgLUzIUWIAA8NDo.jpg" size="sm" />,
      description: undefined,
   },
}


export const Pill: Story = {
   args: {
      avatar: <Avatar src="https://pbs.twimg.com/media/FgLUzIUWIAA8NDo.jpg" size="sm" />,
      description: undefined,
      containerClassName: "inline-flex py-1 px-1 rounded-full bg-gray-100 dark:bg-gray-800",
      nameClassName: "mr-3",
   },
}

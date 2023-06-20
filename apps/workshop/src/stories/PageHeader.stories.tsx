import { PageHeader } from "../components/ui/page-header"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../components/ui/button"
import { Avatar } from "../components/ui/avatar"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Layout/PageHeader",
   component: PageHeader,
   tags: ["autodocs"],
   args: {
      title: "Categories",
      action: undefined,
      description: undefined,
      size: "xl",
   },
   argTypes: {
      size: {
         options: ["sm", "md", "lg", "xl"],
         control: { type: "radio" },
      },
      description: {
         type: "string",
      },
   },
} satisfies Meta<typeof PageHeader>


export default meta
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
   args: {},
}

export const WithImage: Story = {
   args: {
      image: <Avatar src="https://pbs.twimg.com/media/FgLUzIUWIAA8NDo.jpg" size="lg" />,
      title: "One Piece",
      description: "Manga by Oda Eiichiro",
   },
}


export const WithActions: Story = {
   args: {
      image: <Avatar src="https://pbs.twimg.com/media/FgLUzIUWIAA8NDo.jpg" size="lg" />,
      title: "One Piece",
      description: "Manga by Oda Eiichiro",
      action: <><Button intent="gray-outline">Action</Button> <Button>Action</Button></>,
   },
}


import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Button, Drawer } from "ui"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Overlays/Drawer",
   component: (args) => {
      const [open, setOpen] = useState(false)
      
      return <>
         <Button onClick={() => setOpen(true)}>Open</Button>
         <Drawer isOpen={open} onClose={() => setOpen(false)} {...args} />
      </>
   },
   args: {
      title: "Drawer title",
      children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis labore quae quas sequi tempora vel voluptas. Dolore, enim ex harum labore molestiae nam nesciunt qui totam ullam voluptatibus voluptatum?",
      withCloseButton: true,
      placement: "right",
   },
   argTypes: {
      placement: {
         options: ["left", "right", "top", "bottom"],
         control: { type: "radio" },
      },
   },
   tags: ["autodocs"],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>;

export const Base: Story = {
   args: {},
}

export const WithCloseButton: Story = {
   args: {
      withCloseButton: true,
   },
}

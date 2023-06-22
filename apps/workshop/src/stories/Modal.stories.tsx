import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Modal } from "../components/ui/modal"
import { Button } from "../components/ui/button"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Overlays/Modal",
   component: (args) => {
      const [open, setOpen] = useState(false)

      return <>
         <Button onClick={() => setOpen(true)}>Open</Button>
         <Modal {...args} isOpen={open} onClose={() => setOpen(false)}/>
      </>
   },
   args: {
      title: "Modal title",
      children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis labore quae quas sequi tempora vel voluptas. Dolore, enim ex harum labore molestiae nam nesciunt qui totam ullam voluptatibus voluptatum?",
      size: "md",
      className: "",
      panelClassName: "",
      titleClassName: "",
      closeButtonClassName: "",
      outsideContainerClassName: "",
      bodyClassName: "",
      backdropClassName: "",
      isClosable: true,
      mobilePlacement: "bottom",
      closeButtonIntent: "gray-outline",
   },
   tags: ["autodocs"],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>;

export const Basic: any = {
   args: {},
}

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Drawer } from "../components/ui/modal"
import { Button } from "../components/ui/button"

const meta = {
    title: "Components/Overlays/Drawer",
    tags: ["autodocs"],
    component: (args) => {
        const [open, setOpen] = useState(false)

        return <>
            <Button onClick={() => setOpen(true)}>Open</Button>
            <Drawer {...args} isOpen={open} onClose={() => setOpen(false)}/>
        </>
    },
    args: {
        title: "Drawer title",
        children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis labore quae quas sequi tempora vel voluptas. Dolore, enim ex harum labore molestiae nam nesciunt qui totam ullam voluptatibus voluptatum?",
        isClosable: false,
        placement: "right",
        className: "",
        size: "md",
        closeButtonClassName: "",
        panelClassName: "",
        titleClassName: "",
        headerClassName: "",
        bodyClassName: "",
        containerClassName: "",
        closeButtonIntent: "gray-outline",
    },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>;

export const Base: any = {
    args: {},
}

export const isClosable: any = {
    args: {
        isClosable: true,
    },
}

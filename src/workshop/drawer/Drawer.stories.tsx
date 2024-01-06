import { TextInput } from "../text-input"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../button"
import { Drawer } from "../drawer"

const meta = {
    title: "Components/Overlays/Drawer",
    component: Drawer,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ open }, updateArgs] = useArgs()
        return (
            <div className="">
                <Button onClick={() => updateArgs({ open: true })}>Open</Button>
                <Drawer
                    open={open}
                    onOpenChange={n => updateArgs({ open: n })}
                    {...args}
                />
            </div>
        )
    },
    args: {
        title: "Edit profile",
        description: "Edit your profile information",
        open: false,
        footer: <Button intent="success-subtle">Save changes</Button>,
        children: <div className="py-4">
            <TextInput label="Username" />
        </div>,
    },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
    args: {},
}

export const AllowOutsideInteraction: Story = {
    args: {
        allowOutsideInteraction: true,
    },
}

export const WithTrigger: Story = {
    render: function Render({ open, ...args }) {
        return (<div className="">
            <Drawer
                {...args}
                trigger={<Button>Open</Button>}
            />
        </div>)
    },
}


export const Unclosable: Story = {
    args: {
        hideCloseButton: true,
        onOpenChange: () => {},
    },
}

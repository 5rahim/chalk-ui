import { TextInput } from "../text-input"
import { useArgs } from "@storybook/preview-api"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../button"
import { Modal } from "../modal"

const meta = {
    title: "Components/Overlays/Modal",
    component: Modal,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        const [{ open }, updateArgs] = useArgs()
        return (
            <div className="">
                <Button onClick={() => updateArgs({ open: true })}>Open</Button>
                <Modal
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
        children: <div className="">
            <TextInput label="Username" />
        </div>,
    },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
    args: {},
}

export const WithTrigger: Story = {
    render: function Render({ open, ...args }) {
        return (<div className="">
            <Modal
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

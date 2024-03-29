import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"
import { Toaster } from "@/workshop/toaster"
import { Button } from "@/workshop/button"

const meta = {
    title: "Components/Overlays/Toaster",
    component: Toaster,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: (args) => {
        return (
            <div>
                <Button
                    onClick={() =>
                        toast("Event has been created", {
                            description: "Go to your settings to change your email preferences.",
                            action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                            },
                        })
                    }
                >
                    Show Toast
                </Button>
                <Toaster {...args} />
            </div>
        )
    },
    args: {},
} satisfies Meta<typeof Toaster>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Success: Story = {
    render: (args) => {
        return (
            <div>
                <Button
                    onClick={() =>
                        toast.success("Event has been created", {
                            description: "Go to your settings to change your email preferences.",
                            position: "top-center",
                        })
                    }
                >
                    Show Toast
                </Button>
                <Toaster {...args} />
            </div>
        )
    },
}


export const Warning: Story = {
    render: (args) => {
        return (
            <div>
                <Button
                    onClick={() =>
                        toast.warning("Event has been trashed", {
                            description: "Go to your settings to change your email preferences.",
                            position: "top-center",
                        })
                    }
                >
                    Show Toast
                </Button>
                <Toaster {...args} />
            </div>
        )
    },
}

export const Error: Story = {
    render: (args) => {
        return (
            <div>
                <Button
                    onClick={() =>
                        toast.error("Event could not be created", {
                            description: "Go to your settings to change your email preferences.",
                            position: "top-center",
                        })
                    }
                >
                    Show Toast
                </Button>
                <Toaster {...args} />
            </div>
        )
    },
}


export const Info: Story = {
    render: (args) => {
        return (
            <div>
                <Button
                    onClick={() =>
                        toast.info("Download has started", {
                            description: "Go to your settings to change your email preferences.",
                            position: "top-center",
                        })
                    }
                >
                    Show Toast
                </Button>
                <Toaster {...args} />
            </div>
        )
    },
}

export const CloseButton: Story = {
    render: (args) => {
        return (
            <div>
                <Button
                    onClick={() =>
                        toast.info("Download has started", {
                            description: "Go to your settings to change your email preferences.",
                            position: "top-center",
                            action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                            },
                        })
                    }
                >
                    Show Toast
                </Button>
                <Toaster closeButton {...args} />
            </div>
        )
    },
}

import type { Meta, StoryObj } from "@storybook/react"
import { BiSolidSun } from "react-icons/bi"
import { IconButton } from "../button/icon-button"

const meta = {
    title: "Components/Forms/IconButton",
    component: IconButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        icon: <BiSolidSun />,
    },
    argTypes: {
        intent: {
            options: ["primary", "primary-subtle", "primary-outline", "primary-link", "primary-basic",
                "warning", "warning-subtle", "warning-outline", "warning-link", "warning-basic",
                "alert", "alert-subtle", "alert-outline", "alert-link", "alert-basic",
                "success", "success-subtle", "success-outline", "success-link", "success-basic",
                "gray", "gray-subtle", "gray-outline", "gray-link", "gray-basic",
                "white", "white-subtle", "white-outline", "white-link", "white-basic",
            ],
            control: "select",
        },
    },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {},
}
export const Loading: Story = {
    args: {
        loading: true,
    },
}
export const Disabled: Story = {
    args: {
        disabled: true,
    },
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

export const White: Story = {
    render: (props) => (
        <div className="flex flex-row gap-2 flex-wrap">

            <div className="bg-[#121212] p-4 space-x-2">
                <IconButton intent="white" {...props} />
                <IconButton intent="white-subtle" {...props} />
                <IconButton intent="white-outline" {...props} />
                <IconButton intent="white-basic" {...props} />
                <IconButton intent="white-link" {...props} />
            </div>
        </div>
    ),
}

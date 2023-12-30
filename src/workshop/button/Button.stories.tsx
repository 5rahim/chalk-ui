import type { Meta, StoryObj } from "@storybook/react"
import { BiAdjust } from "react-icons/bi"
import { Button } from "../button/button"


const meta = {
    title: "Components/Forms/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        children: "Button",
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
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        children: "Button",
    },
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

export const WithIcon: Story = {
    args: {
        leftIcon: <BiAdjust />,
    },
}

export const White: Story = {
    render: (props) => (
        <div className="flex flex-row gap-2 flex-wrap">

            <div className="bg-[#121212] p-4 space-x-2">
                <Button intent="white" {...props} />
                <Button intent="white-subtle" {...props} />
                <Button intent="white-outline" {...props} />
                <Button intent="white-basic" {...props} />
                <Button intent="white-link" {...props} />
            </div>
        </div>
    ),
}

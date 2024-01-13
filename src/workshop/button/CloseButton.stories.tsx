import type { Meta, StoryObj } from "@storybook/react"
import { CloseButton } from "@/workshop/button"

const meta = {
    title: "Components/Forms/CloseButton",
    component: CloseButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {},
} satisfies Meta<typeof CloseButton>


export default meta
type Story = StoryObj<typeof meta>;

export const Small: Story = {
    args: {},
}

export const Medium: Story = {
    args: {
        size: "md",
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

export const Colors: Story = {
    render: (props) => (
        <div className="flex flex-row gap-2 flex-wrap">
            <CloseButton intent="primary" {...props} />
            <CloseButton intent="primary-subtle" {...props} />
            <CloseButton intent="primary-outline" {...props} />
            <CloseButton intent="primary-basic" {...props} />
            <CloseButton intent="primary-link" {...props} />

            <CloseButton intent="alert" {...props} />
            <CloseButton intent="alert-subtle" {...props} />
            <CloseButton intent="alert-outline" {...props} />
            <CloseButton intent="alert-basic" {...props} />
            <CloseButton intent="alert-link" {...props} />

            <CloseButton intent="success" {...props} />
            <CloseButton intent="success-subtle" {...props} />
            <CloseButton intent="success-outline" {...props} />
            <CloseButton intent="success-basic" {...props} />
            <CloseButton intent="success-link" {...props} />

            <CloseButton intent="warning" {...props} />
            <CloseButton intent="warning-subtle" {...props} />
            <CloseButton intent="warning-outline" {...props} />
            <CloseButton intent="warning-basic" {...props} />
            <CloseButton intent="warning-link" {...props} />

            <CloseButton intent="gray" {...props} />
            <CloseButton intent="gray-subtle" {...props} />
            <CloseButton intent="gray-outline" {...props} />
            <CloseButton intent="gray-basic" {...props} />
            <CloseButton intent="gray-link" {...props} />

            <CloseButton intent="white" {...props} />
            <CloseButton intent="white-subtle" {...props} />
            <CloseButton intent="white-outline" {...props} />
            <CloseButton intent="white-basic" {...props} />
            <CloseButton intent="white-link" {...props} />
        </div>
    ),
}

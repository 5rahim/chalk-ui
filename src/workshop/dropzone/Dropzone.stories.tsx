import type { Meta, StoryObj } from "@storybook/react"
import { Dropzone } from "./dropzone"

const meta = {
    title: "Components/Forms/Dropzone",
    component: Dropzone,
    tags: ["autodocs"],
    render: function Render(args) {
        return (
            <Dropzone
                {...args}
            />
        )
    },
    args: {},
} satisfies Meta<typeof Dropzone>


export default meta
type Story = StoryObj<typeof Dropzone>;

export const Image: Story = {
    args: {
        label: "Profile picture",
        accept: { "image/*": [".png", ".jpeg", ".jpg"] },
    },
}

export const WithImagePreview: Story = {
    args: {
        label: "Images",
        accept: { "image/*": [".png", ".jpeg", ".jpg"] },
        withImagePreview: true,
        multiple: true,
    },
}

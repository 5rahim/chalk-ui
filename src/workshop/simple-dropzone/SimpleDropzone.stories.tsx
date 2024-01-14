import type { Meta, StoryObj } from "@storybook/react"
import { SimpleDropzone } from ""

const meta = {
    title: "Components/Forms/SimpleDropzone",
    component: SimpleDropzone,
    tags: ["autodocs"],
    render: function Render(args) {
        return (
            <SimpleDropzone
                {...args}
            />
        )
    },
    args: {},
} satisfies Meta<typeof SimpleDropzone>


export default meta
type Story = StoryObj<typeof SimpleDropzone>;

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

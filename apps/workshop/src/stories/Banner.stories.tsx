import type { Meta, StoryObj } from "@storybook/react"
import { Banner, BannerProps } from "../components/ui/banner"

const meta = {
    title: "Components/Data Display/Banner",
    component: Banner,
    tags: ["autodocs"],
    args: {
        children: "We just launched our new product!"
    },
    parameters: {
        layout: "fullscreen",
    }
} satisfies Meta<typeof Banner>


export default meta
type Story = StoryObj<BannerProps>;

export const Basic: Story = {
    args: {}
}

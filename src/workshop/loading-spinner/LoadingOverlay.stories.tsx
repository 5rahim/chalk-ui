import type { Meta, StoryObj } from "@storybook/react"
import { LoadingOverlay } from "@/workshop/loading-spinner"

const meta = {
    title: "Components/Overlays/LoadingOverlay",
    component: LoadingOverlay,
    tags: ["autodocs"],
    render: function Render(args) {
        return (
            <div className="relative">
                <LoadingOverlay
                    {...args}
                />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet at atque dolorem eos est incidunt iure laudantium magnam, nihil nobis
                officiis optio quas quia quibusdam quo sequi sunt voluptas. Non?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet at atque dolorem eos est incidunt iure laudantium magnam, nihil nobis
                officiis optio quas quia quibusdam quo sequi sunt voluptas. Non?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet at atque dolorem eos est incidunt iure laudantium magnam, nihil nobis
                officiis optio quas quia quibusdam quo sequi sunt voluptas. Non?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet at atque dolorem eos est incidunt iure laudantium magnam, nihil nobis
                officiis optio quas quia quibusdam quo sequi sunt voluptas. Non?
            </div>
        )
    },
    args: {},
} satisfies Meta<typeof LoadingOverlay>

export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

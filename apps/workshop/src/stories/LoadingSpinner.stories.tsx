import type { Meta, StoryObj } from "@storybook/react"
import { LoadingSpinner } from "../components/ui/loading-spinner"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
   title: "Components/Overlays/LoadingSpinner",
   component: LoadingSpinner,
   tags: ["autodocs"],
} satisfies Meta<typeof LoadingSpinner>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

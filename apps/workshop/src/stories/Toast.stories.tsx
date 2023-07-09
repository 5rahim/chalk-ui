import type { Meta, StoryObj } from "@storybook/react"
import { Toast, ToastProps } from "../components/ui/toast"
import { Button } from "../components/ui/button"
import toast from "react-hot-toast"

const meta = {
    title: "Components/Overlays/Toast",
    component: Toast,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <div className={"space-x-1"}>
                <Button onClick={() => toast.success("Success")}>Success</Button>
                <Button onClick={() => toast.error("Error")}>Error</Button>
                <Button onClick={() => toast.loading("Loading")}>Loading</Button>
            </div>
        )
    },
    args: {},
} satisfies Meta<typeof Toast>


export default meta
type Story = StoryObj<Omit<ToastProps, "trigger">>;

export const Basic: Story = {
    args: {}
}

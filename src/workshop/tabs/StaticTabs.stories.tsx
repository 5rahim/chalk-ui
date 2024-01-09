import type { Meta, StoryObj } from "@storybook/react"
import { BiReceipt } from "react-icons/bi"
import { StaticTabs } from "../tabs"

const meta = {
    title: "Components/Navigation/StaticTabs",
    component: StaticTabs,
    tags: ["autodocs"],
    args: {
        items: [
            { name: "My Account", href: "#", isCurrent: false },
            { name: "Company", href: "#", isCurrent: false },
            { name: "Team Members", href: "#", isCurrent: true },
            { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
        ],
        className: "",
        triggerClass: "",
        iconClass: "",
    },
} satisfies Meta<typeof StaticTabs>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

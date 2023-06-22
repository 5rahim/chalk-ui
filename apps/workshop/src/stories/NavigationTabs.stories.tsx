import type { Meta, StoryObj } from "@storybook/react"
import { NavigationTabs, NavigationTabsProps } from "../components/ui/tabs"
import { BiReceipt } from "@react-icons/all-files/bi/BiReceipt"

const meta = {
    title: "Components/Navigation/NavigationTabs",
    component: NavigationTabs,
    tags: ["autodocs"],
    args: {
        items: [
            { name: "My Account", href: "#", icon: null, isCurrent: false },
            { name: "Company", href: "#", icon: null, isCurrent: false },
            { name: "Team Members", href: "#", icon: null, isCurrent: true },
            { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
        ],
        className: "",
        navClassName: "",
        tabClassName: "",
        iconClassName: "",
    },
} satisfies Meta<NavigationTabsProps>


export default meta
type Story = StoryObj<NavigationTabsProps>;

export const Basic: Story = {
    args: {}
}

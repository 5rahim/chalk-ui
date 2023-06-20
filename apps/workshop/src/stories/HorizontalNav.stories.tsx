import type { Meta, StoryObj } from "@storybook/react"
import { HorizontalNav, HorizontalNavProps } from "../components/ui/horizontal-nav"
import { VerticalNav } from "../components/ui/vertical-nav"
import { BiReceipt } from "@react-icons/all-files/bi/BiReceipt"
import { BiUser } from "@react-icons/all-files/bi/BiUser"
import { BiGroup } from "@react-icons/all-files/bi/BiGroup"
import { BiBarChart } from "@react-icons/all-files/bi/BiBarChart"
import { Badge } from "../components/ui/badge"

const meta = {
    title: "Components/Navigation/HorizontalNav",
    component: HorizontalNav,
    tags: ["autodocs"],
    args: {
        items: [
            {
                name: "My Account", icon: BiUser, isCurrent: true,
                content: <VerticalNav
                    items={[
                        { name: "My Account", href: "#", icon: BiUser, isCurrent: false },
                        { name: "Company", href: "#", icon: BiBarChart, isCurrent: true },
                        { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
                    ]}
                />
            },
            { name: "Company", href: "#", icon: BiBarChart, isCurrent: false },
            {
                name: "Team Members",
                href: "#",
                icon: BiGroup,
                isCurrent: false,
                addon: <Badge className="ml-2" intent="gray-solid" size="sm">5</Badge>
            },
            { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
        ],
    },
} satisfies Meta<HorizontalNavProps>


export default meta
type Story = StoryObj<HorizontalNavProps>;

export const Primary: Story = {
    args: {}
}

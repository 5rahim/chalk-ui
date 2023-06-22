import type { Meta, StoryObj } from "@storybook/react"
import { VerticalNav, VerticalNavProps } from "../components/ui/vertical-nav"
import { BiReceipt } from "@react-icons/all-files/bi/BiReceipt"
import { BiUser } from "@react-icons/all-files/bi/BiUser"
import { BiGroup } from "@react-icons/all-files/bi/BiGroup"
import { BiBarChart } from "@react-icons/all-files/bi/BiBarChart"
import { Badge } from "../components/ui/badge"

const meta = {
    title: "Components/Navigation/VerticalNav",
    component: VerticalNav,
    tags: ["autodocs"],
    args: {
        items: [
            {
                name: "My Account", href: "#", icon: BiUser, isCurrent: false,
                content: <VerticalNav items={[
                    { name: "Information", href: "#", isCurrent: false },
                    { name: "Security", href: "#", isCurrent: false },
                ]}/>
            },
            { name: "Company", href: "#", icon: BiBarChart, isCurrent: false },
            {
                name: "Team Members",
                href: "#",
                icon: BiGroup,
                isCurrent: true,
                addon: <Badge className="ml-2" intent="gray-solid">5</Badge>
            },
            { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
        ],
    },
} satisfies Meta<VerticalNavProps>


export default meta
type Story = StoryObj<VerticalNavProps>;

export const Basic: Story = {
    args: {}
}

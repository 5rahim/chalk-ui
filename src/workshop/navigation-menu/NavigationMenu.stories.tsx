import type { Meta, StoryObj } from "@storybook/react"
import { BiBarChart, BiGroup, BiReceipt, BiUser } from "react-icons/bi"
import { Badge } from "../badge"
import { NavigationMenu } from "../navigation-menu"
import { VerticalMenu } from "../vertical-menu"

const meta = {
    title: "Components/Navigation/NavigationMenu",
    component: NavigationMenu,
    tags: ["autodocs"],
    args: {
        items: [
            {
                name: "My Account", iconType: BiUser, isCurrent: true,
                subContent: <VerticalMenu
                    items={[
                        { name: "My Account", href: "#", iconType: BiUser },
                        { name: "Company", href: "#", iconType: BiBarChart, isCurrent: true },
                        { name: "Billing", href: "#", iconType: BiReceipt },
                    ]}
                />,
            },
            {
                name: "Account", iconType: BiUser,
                subContent: <VerticalMenu
                    items={[
                        { name: "My Account", href: "#", iconType: BiUser },
                        { name: "Company", href: "#", iconType: BiBarChart },
                        { name: "Billing", href: "#", iconType: BiReceipt },
                    ]}
                />,
            },
            { name: "Company", href: "#", iconType: BiBarChart },
            {
                name: "Team Members",
                href: "#",
                iconType: BiGroup,
                addon: <Badge size="sm" className="absolute right-0 top-1" intent="alert-solid">5</Badge>,
            },
            { name: "Billing", href: "#", iconType: BiReceipt },
        ],
    },
} satisfies Meta<typeof NavigationMenu>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

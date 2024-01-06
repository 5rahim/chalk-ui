import type { Meta, StoryObj } from "@storybook/react"
import { BiBarChart, BiCog, BiGroup, BiReceipt, BiUser } from "react-icons/bi"
import { Badge } from "../badge"
import { VerticalNav, VerticalNavProps } from "../vertical-nav"

const meta = {
    title: "Components/Navigation/VerticalNav",
    parameters: {
        layout: "centered",
    },
    component: VerticalNav,
    tags: ["autodocs"],
    render: function Render(args) {
        return (
            <div className="sm:w-[300px] w-full">
                <VerticalNav {...args} />
            </div>
        )
    },
    args: {
        items: [
            {
                name: "My Account", href: "#", icon: BiUser,
                content: <VerticalNav
                    size="sm"
                    items={[
                        { name: "Information", href: "#", icon: BiUser },
                        { name: "Security", href: "#", icon: BiCog },
                    ]}
                />,
            },
            { name: "Company", href: "#", icon: BiBarChart },
            {
                name: "Team Members",
                href: "#",
                icon: BiGroup,
                isCurrent: true,
                addon: <Badge className="absolute right-2" intent="alert-solid">5</Badge>,
            },
            { name: "Billing", href: "#", icon: BiReceipt },
        ],
    },
} satisfies Meta<VerticalNavProps>


export default meta
type Story = StoryObj<VerticalNavProps>;

export const Basic: Story = {
    args: {},
}

export const Small: Story = {
    args: {
        size: "sm",
    },
}

export const IconsOnly: Story = {
    args: {
        iconsOnly: true,
        items: [
            {
                name: "My Account", href: "#", icon: BiUser,
                content: <VerticalNav
                    iconsOnly
                    items={[
                        { name: "Information", href: "#", icon: BiUser },
                        { name: "Security", href: "#", icon: BiCog },
                    ]}
                />,
            },
            { name: "Company", href: "#", icon: BiBarChart },
            {
                name: "Team Members",
                href: "#",
                icon: BiGroup,
                isCurrent: true,
                addon: <Badge size="sm" className="ml-2 absolute right-1 top-1" intent="alert-solid">5</Badge>,
            },
            { name: "Billing", href: "#", icon: BiReceipt },
        ],
    },
    render: function Render(args) {
        return (
            <div className="sm:w-[50px] w-full">
                <VerticalNav {...args} />
            </div>
        )
    },
}

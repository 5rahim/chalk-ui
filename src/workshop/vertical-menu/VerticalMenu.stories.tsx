import type { Meta, StoryObj } from "@storybook/react"
import { BiBarChart, BiCog, BiGroup, BiReceipt, BiUser } from "react-icons/bi"
import { Badge } from "@/workshop/badge"
import { VerticalMenu, VerticalMenuProps } from "@/workshop/vertical-menu"

const meta = {
    title: "Components/Navigation/VerticalMenu",
    parameters: {
        layout: "centered",
    },
    component: VerticalMenu,
    tags: ["autodocs"],
    render: function Render(args) {
        return (
            <div className="sm:w-[300px] w-full">
                <VerticalMenu {...args} />
            </div>
        )
    },
    args: {
        items: [
            {
                name: "My Account", href: "#", iconType: BiUser,
                subContent: <VerticalMenu
                    size="sm"
                    items={[
                        { name: "Information", href: "#", iconType: BiUser },
                        { name: "Security", href: "#", iconType: BiCog },
                    ]}
                />,
            },
            { name: "Company", href: "#", iconType: BiBarChart },
            {
                name: "Team Members",
                href: "#",
                iconType: BiGroup,
                isCurrent: true,
                addon: <Badge size="sm" className="absolute right-2" intent="alert-solid">5</Badge>,
            },
            { name: "Billing", href: "#", iconType: BiReceipt },
        ],
    },
} satisfies Meta<VerticalMenuProps>


export default meta
type Story = StoryObj<typeof meta>

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
                name: "My Account", href: "#", iconType: BiUser,
                subContent: <VerticalMenu
                    iconsOnly
                    items={[
                        { name: "Information", href: "#", iconType: BiUser },
                        { name: "Security", href: "#", iconType: BiCog },
                    ]}
                />,
            },
            { name: "Company", href: "#", iconType: BiBarChart },
            {
                name: "Team Members",
                href: "#",
                iconType: BiGroup,
                isCurrent: true,
                addon: <Badge size="sm" className="ml-2 absolute right-1 top-1" intent="alert-solid">5</Badge>,
            },
            { name: "Billing", href: "#", iconType: BiReceipt },
        ],
    },
    render: function Render(args) {
        return (
            <div className="sm:w-[50px] w-full">
                <VerticalMenu {...args} />
            </div>
        )
    },
}

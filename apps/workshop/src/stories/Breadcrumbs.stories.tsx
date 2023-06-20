import type { Meta, StoryObj } from "@storybook/react"
import { Breadcrumbs, BreadcrumbsProps } from "../components/ui/breadcrumbs"
import { BiStore } from "@react-icons/all-files/bi/BiStore"

const meta = {
    title: "Components/Navigation/Breadcrumbs",
    component: Breadcrumbs,
    tags: ["autodocs"],
    args: {
        items: [
            { name: "Projects", href: "#", isCurrent: false },
            { name: "Team members", href: "#", isCurrent: true },
        ],
    },
} satisfies Meta<BreadcrumbsProps>


export default meta
type Story = StoryObj<BreadcrumbsProps>;

export const Primary: Story = {
    args: {}
}

export const withCustomHomeIcon: Story = {
    args: {
        homeIcon: <BiStore className={"text-xl"}/>
    }
}

export const withNoHomeButton: Story = {
    args: {
        showHomeButton: false
    }
}

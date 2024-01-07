import type { Meta, StoryObj } from "@storybook/react"
import { BiStore } from "react-icons/bi"
import { Breadcrumbs } from "."

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
} satisfies Meta<typeof Breadcrumbs>


export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
    args: {},
}

export const withCustomHomeIcon: Story = {
    args: {
        homeIcon: <BiStore className={"text-xl"} />,
    },
}

export const withNoHomeButton: Story = {
    args: {
        showHomeButton: false,
    },
}

import type { Meta, StoryObj } from "@storybook/react"
import { Navbar, NavbarProps } from "../components/ui/navbar"
import { HorizontalNav } from "../components/ui/horizontal-nav"
import { DropdownMenu } from "../components/ui/dropdown-menu"
import { Avatar, AvatarShowcase } from "../components/ui/avatar"
import React from "react"
import { DemoNavigationItems } from "../components/demo.tsx"

const meta = {
    title: "Components/Navigation/Navbar",
    component: Navbar,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <Navbar {...args}>
                <Navbar.Layout>
                    <Navbar.Navigation>
                        <div className="font-black uppercase">Logo</div>
                        <HorizontalNav
                            switchToDrawerBelow={"lg"}
                            items={DemoNavigationItems}
                        />
                    </Navbar.Navigation>
                    <DropdownMenu
                        trigger={<AvatarShowcase
                            avatar={<Avatar size="sm"/>} name={"John Doe"}
                            className="cursor-pointer p-1 sm:pr-3 rounded-full hover:bg-[--highlight]"
                            nameClassName={"text-sm font-semibold text-[--muted] group-hover:text-[--text-color]"}
                            detailsContainerClassName={"hidden sm:block"}
                        />}
                        mobilePlacement={"top"}
                    >
                        <DropdownMenu.Item>My account</DropdownMenu.Item>
                        <DropdownMenu.Item>Sign out</DropdownMenu.Item>
                    </DropdownMenu>
                </Navbar.Layout>
            </Navbar>
        )
    },
    args: {},
    parameters: {
        layout: "fullscreen"
    }
} satisfies Meta<NavbarProps>


export default meta
type Story = StoryObj<NavbarProps>;

export const Basic: Story = {
    args: {}
}

export const Color: Story = {
    render: (args) => {
        return (
            <Navbar {...args} navClassName="bg-violet-900 text-white border-none">
                <Navbar.Layout>
                    <Navbar.Navigation>
                        <div className="font-black uppercase">Logo</div>
                        <HorizontalNav
                            switchToDrawerBelow={"lg"}
                            items={DemoNavigationItems}
                            itemClassName={"text-white hover:text-white data-[selected=true]:text-white data-[selected=true]:bg-violet-950 hover:bg-violet-950"}
                        />
                    </Navbar.Navigation>
                    <DropdownMenu
                        trigger={<AvatarShowcase
                            avatar={<Avatar size="xs"/>} name={"John Doe"}
                            className="cursor-pointer p-1 sm:pr-3 rounded-full hover:bg-[--highlight]"
                            nameClassName={"text-sm font-semibold text-white opacity-70 group-hover/container:opacity-100"}
                            detailsContainerClassName={"hidden sm:block"}
                        />}
                        mobilePlacement={"top"}
                    >
                        <DropdownMenu.Item>My account</DropdownMenu.Item>
                        <DropdownMenu.Item>Sign out</DropdownMenu.Item>
                    </DropdownMenu>
                </Navbar.Layout>
            </Navbar>
        )
    }
}

"use client"
import { Avatar } from "@/workshop/avatar"
import { DropdownMenu, DropdownMenuItem } from "@/workshop/dropdown-menu"
import { NavigationMenu } from "@/workshop/navigation-menu"
import Image from "next/image"
import React from "react"
import { BiHome } from "react-icons/bi"

export function Navbar() {

    const items = React.useMemo(() => ([
        {
            name: "Home",
            isCurrent: false,
            href: "#",
        },
        {
            name: "Products",
            isCurrent: false,
            href: "#",
        },
        {
            name: "Subscriptions",
            isCurrent: false,
            href: "#",
        },
        {
            name: "Settings",
            isCurrent: true,
            href: "#",
        }
    ]), [])

    return (
        <div className="h-16 border-b w-full px-4 flex justify-between">
            <div className="font-bold h-full flex items-center order-2 md:order-1">
                <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            </div>
            <div className="h-full flex items-center order-1 md:order-2">
                <NavigationMenu
                    items={items}
                    mobileDrawerHeader={<div>
                        <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="mx-auto" />
                    </div>}
                />
            </div>
            <div className="flex items-center h-full order-3">
                <DropdownMenu
                    trigger={<Avatar src="/images/wano-luffy.jpg" size="sm" className="cursor-pointer" />}
                >
                    <DropdownMenuItem>My account</DropdownMenuItem>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenu>
            </div>
        </div>
    )
}

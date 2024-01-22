"use client"
import { SearchBar } from "@/app/examples/dashboard/components/search-bar"
import { AppSidebarTrigger, useAppSidebarContext } from "@/workshop/app-layout"
import { Avatar } from "@/workshop/avatar"
import { IconButton } from "@/workshop/button"
import { DropdownMenu, DropdownMenuItem } from "@/workshop/dropdown-menu"
import { StaticTabs } from "@/workshop/tabs"
import { Tooltip } from "@/workshop/tooltip"
import React from "react"
import { BiArrowToLeft, BiDockLeft, BiReceipt } from "react-icons/bi"


export function DashboardHeader() {

    const ctx = useAppSidebarContext()

    return (
        <div>
            <div className="w-full h-16 border-b flex items-center justify-between px-2">
                <div className="flex items-center h-full">
                    <AppSidebarTrigger />
                    {/*Sidebar collapsable toggle*/}
                    {!ctx.isBelowBreakpoint && <div className="mr-2">
                        <Tooltip
                            trigger={<IconButton
                                intent="gray-subtle"
                                size="sm"
                                icon={ctx.size === "slim" ? <BiDockLeft /> : <BiArrowToLeft />}
                                onClick={() => ctx.setSize(ctx.size !== "slim" ? "slim" : "md")}
                            />}
                        >
                            {ctx.size === "slim" ? "Expand sidebar" : "Collapse sidebar"}
                        </Tooltip>
                    </div>}
                    {/*Show title when sidebar is collapsed*/}
                    {(ctx.size === "slim" || ctx.isBelowBreakpoint) && <h3 className="px-4 font-bold">Dashboard</h3>}
                    <SearchBar />
                </div>
                <div className="flex items-center h-full">
                    <DropdownMenu
                        trigger={<Avatar src="/images/wano-luffy.jpg" size="sm" className="cursor-pointer" />}
                    >
                        <DropdownMenuItem>My account</DropdownMenuItem>
                        <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenu>
                </div>
            </div>
            <StaticTabs
                className="border-b px-4 py-2"
                items={[
                    { name: "All", href: "#", isCurrent: false },
                    { name: "Shops", href: "#", isCurrent: true },
                    { name: "Subscriptions", href: "#", isCurrent: false },
                    { name: "Transactions", href: "#", iconType: BiReceipt, isCurrent: false },
                ]}
            />
        </div>
    )
}

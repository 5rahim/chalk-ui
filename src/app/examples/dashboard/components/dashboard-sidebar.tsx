"use client"

import { AppSidebar, useAppSidebarContext } from "@/workshop/app-layout"
import { Badge } from "@/workshop/badge"
import { cn } from "@/workshop/core/styling"
import { VerticalMenu } from "@/workshop/vertical-menu"
import React from "react"
import { BiBarChart, BiBriefcase, BiCalendarAlt, BiHome, BiMessageAlt, BiReceipt } from "react-icons/bi"

type DashboardSidebarProps = {
    children?: React.ReactNode
}

export function DashboardSidebar(props: DashboardSidebarProps) {

    const {
        children,
        ...rest
    } = props

    const ctx = useAppSidebarContext()
    const isCollapsed = ctx.size === "slim" && !ctx.isBelowBreakpoint

    // Replace with usePathname() hook
    const currentPathname = "/analytics/shops"

    const isCurrent = (href: string) => {
        return currentPathname === href
    }
    const isCurrentContainer = (href: string) => {
        return currentPathname.startsWith(href)
    }

    const items = React.useMemo(() => ([
        {
            name: "Overview",
            isCurrent: isCurrent("/overview"),
            href: "#",
            iconType: BiHome,
        },
        {
            name: "Analytics",
            isCurrent: isCurrentContainer("/analytics"),
            iconType: BiBarChart,
            subContent: <VerticalMenu
                iconsOnly={isCollapsed}
                items={[
                    { name: "Company", href: "#", iconType: BiBriefcase, isCurrent: isCurrent("/analytics/company") },
                    { name: "Shops", href: "#", iconType: BiReceipt, isCurrent: isCurrent("/analytics/shops") },
                ]}
            />,
        },
        {
            name: "Message",
            href: "#",
            isCurrent: isCurrent("/messages"),
            iconType: BiMessageAlt,
            addon: <Badge
                intent="gray"
                className={cn("absolute", isCollapsed ? "top-0 right-0" : "right-2")}
                size="sm"
            >
                5
            </Badge>,
        },
        {
            name: "Calendar",
            href: "#",
            isCurrent: isCurrent("/calendar"),
            iconType: BiCalendarAlt,
        },
    ]), [isCollapsed])

    return (
        <AppSidebar className="p-4">
            {!isCollapsed && <div className="font-bold text-2xl mb-4">Dashboard</div>}
            <VerticalMenu
                iconsOnly={isCollapsed}
                items={items}
            />
        </AppSidebar>
    )
}

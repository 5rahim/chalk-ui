"use client"
import { NavigationMenu } from "@/workshop/navigation-menu"
import { usePathname } from "next/navigation"
import React from "react"

type ExamplesNavProps = {
    children?: React.ReactNode
}

export function ExamplesNav(props: ExamplesNavProps) {

    const {
        children,
        ...rest
    } = props

    const pathname = usePathname()

    const items = React.useMemo(() => ([
        { name: "Dashboard", isCurrent: pathname === "/examples/dashboard", href: "/examples/dashboard" },
    ]), [pathname])

    return (
        <div className="flex h-16 items-center lg:justify-center">
            <NavigationMenu items={items} />
        </div>
    )
}

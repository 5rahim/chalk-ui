"use client"
import { Button } from "@/workshop/button"
import { NavigationMenu } from "@/workshop/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { BiLinkExternal } from "react-icons/bi"

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
        { name: "Settings", isCurrent: pathname === "/examples/settings", href: "/examples/settings" },
        { name: "Authentication", isCurrent: pathname === "/examples/authentication", href: "/examples/authentication" },
    ]), [pathname])

    return (
        <div>
            <div className="flex h-16 items-center lg:justify-center">
                <NavigationMenu
                    className="border bg-[--background] rounded-full shadow-sm overflow-hidden"
                    itemClass="rounded-none"
                    items={items}
                />
            </div>
            <Link href={`https://github.com/5rahim/chalk-ui/tree/main/src/app${pathname}`} target="_blank">
                <Button rightIcon={<BiLinkExternal />} size="sm" intent="gray-link">Code</Button>
            </Link>
        </div>
    )
}

import { VerticalMenu } from "@/workshop/vertical-menu"
import { usePathname, useRouter } from "next/navigation"
import React from "react"

type DocsVerticalMenuProps = {
    children?: React.ReactNode
}

export function DocsVerticalMenu(props: DocsVerticalMenuProps) {

    const {
        children,
        ...rest
    } = props

    const pathname = usePathname()

    return (
        <VerticalMenu
            items={[
                {
                    name: "Button",
                    href: "/docs/components/button",
                    isCurrent: pathname === "/docs/components/button",
                },
            ]}
        />
    )
}

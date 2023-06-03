"use client"

import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "@/components/ui/core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const VerticalNavAnatomy = defineStyleAnatomy({
    nav: cva([
        "UI-VerticalNav__nav",
        "block space-y-1"
    ]),
    tab: cva([
        "UI-VerticalNav__tab",
        "group flex flex-none truncate items-center px-3 py-2 text-sm font-[600] rounded-md transition",
        "hover:bg-[--highlight]",
        "focus-visible:ring-2 ring-[--ring] outline-none",
        "text-[--muted]",
        "data-[current=true]:text-[--brand]"
    ]),
    icon: cva([
        "UI-VerticalNav__icon",
        "flex-shrink-0 -ml-1 mr-3 h-6 w-6",
        "text-[--muted] data-[current=true]:text-[--brand]"
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * VerticalNav
 * -----------------------------------------------------------------------------------------------*/

export interface VerticalNavProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof VerticalNavAnatomy> {
    children?: React.ReactNode
    items: {
        name: string,
        href: string | null | undefined,
        icon?: ((props: any) => JSX.Element) | null | undefined,
        isCurrent: boolean
    }[]
}

export const VerticalNav: React.FC<VerticalNavProps> = React.forwardRef<HTMLDivElement, VerticalNavProps>((props, ref) => {

    const {
        children,
        navClassName,
        className,
        items,
        ...rest
    } = props

    return (
        <nav
            ref={ref}
            className={cn(VerticalNavAnatomy.nav(), navClassName, className)}
            {...rest}
        >
            {items.map((tab: any) => (
                <a
                    key={tab.name}
                    href={tab.href}
                    className={cn(
                        VerticalNavAnatomy.tab(),
                    )}
                    aria-current={tab.isCurrent ? "page" : undefined}
                    data-current={tab.isCurrent}
                >
                    {tab.icon && <tab.icon
                        className={cn(
                            VerticalNavAnatomy.icon()
                        )}
                        aria-hidden="true"
                        data-current={tab.isCurrent}
                    />}
                    <span>{tab.name}</span>
                </a>
            ))}
        </nav>
    )

})

VerticalNav.displayName = "VerticalNav"

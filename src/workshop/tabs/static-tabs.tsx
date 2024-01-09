import { cva } from "class-variance-authority"
import Link from "next/link"
import * as React from "react"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const StaticTabsAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-StaticTabs__root",
        "flex w-full overflow-hidden overflow-x-auto",
    ]),
    trigger: cva([
        "UI-StaticTabs__trigger",
        "group/staticTabs__trigger inline-flex flex-none shrink-0 basis-auto items-center py-4 px-2 font-medium text-sm transition outline-none min-w-0 justify-center",
        "focus-visible:bg-[--highlight]",
        "text-[--muted]",
        "hover:text-[--text-color]",
        "data-[selected=true]:border-[--brand] data-[selected=true]:font-semibold data-[selected=true]:text-[--brand]",
    ]),
    icon: cva([
        "UI-StaticTabs__icon",
        "-ml-0.5 mr-2 h-4 w-4",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * StaticTabs
 * -----------------------------------------------------------------------------------------------*/

export interface StaticTabsProps extends React.ComponentPropsWithRef<"nav">,
    ComponentAnatomy<typeof StaticTabsAnatomy> {
    items: {
        name: string,
        href: string | null | undefined,
        icon?: React.ElementType,
        isCurrent: boolean
    }[]
}

export const StaticTabs = React.forwardRef<HTMLElement, StaticTabsProps>((props, ref) => {

    const {
        children,
        className,
        triggerClass,
        iconClass,
        items,
        ...rest
    } = props

    return (
        <nav
            ref={ref}
            className={cn(StaticTabsAnatomy.root(), className)}
            role="navigation"
            {...rest}
        >
            {items.map((tab) => (
                <Link
                    key={tab.name}
                    href={tab.href ?? "#"}
                    className={cn(
                        StaticTabsAnatomy.trigger(),
                        triggerClass,
                    )}
                    aria-current={tab.isCurrent ? "page" : undefined}
                    data-selected={tab.isCurrent}
                >
                    {tab.icon && <tab.icon
                        className={cn(
                            StaticTabsAnatomy.icon(),
                            iconClass,
                        )}
                        aria-hidden="true"
                        data-selected={tab.isCurrent}
                    />}
                    <span>{tab.name}</span>
                </Link>
            ))}
        </nav>
    )

})

StaticTabs.displayName = "StaticTabs"

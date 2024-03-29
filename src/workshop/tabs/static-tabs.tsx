import { cva } from "class-variance-authority"
import Link from "next/link"
import * as React from "react"
import { cn, ComponentAnatomy, defineStyleAnatomy } from "../core/styling"

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
        "group/staticTabs__trigger inline-flex flex-none shrink-0 basis-auto items-center font-medium text-sm transition outline-none min-w-0 justify-center",
        "text-[--muted] hover:text-[--text-color]",
        "h-10 px-4 rounded-full",
        "data-[current=true]:bg-[--subtle] data-[current=true]:font-semibold data-[current=true]:text-[--foreground]",
        "focus-visible:bg-[--subtle]",
    ]),
    icon: cva([
        "UI-StaticTabs__icon",
        "-ml-0.5 mr-2 h-4 w-4",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * StaticTabs
 * -----------------------------------------------------------------------------------------------*/

export type StaticTabsItem = {
    name: string,
    href: string | null | undefined,
    iconType?: React.ElementType,
    isCurrent: boolean
}

export type StaticTabsProps = React.ComponentPropsWithRef<"nav"> &
    ComponentAnatomy<typeof StaticTabsAnatomy> & {
    items: StaticTabsItem[]
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
                    data-current={tab.isCurrent}
                >
                    {tab.iconType && <tab.iconType
                        className={cn(
                            StaticTabsAnatomy.icon(),
                            iconClass,
                        )}
                        aria-hidden="true"
                        data-current={tab.isCurrent}
                    />}
                    <span>{tab.name}</span>
                </Link>
            ))}
        </nav>
    )

})

StaticTabs.displayName = "StaticTabs"

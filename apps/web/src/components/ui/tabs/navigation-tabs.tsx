import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const NavigationTabsAnatomy = defineStyleAnatomy({
    nav: cva([
        "UI-NavigationTabs__nav",
        "flex bg-[--paper] w-full overflow-hidden overflow-x-auto"
    ]),
    tab: cva([
        "UI-NavigationTabs__tab",
        "group inline-flex flex-none sm:flex-1 items-center py-4 px-1 font-medium text-sm transition outline-none px-4 min-w-0 justify-center",
        "border-b-2 border-[--border]",
        "focus-visible:bg-[--highlight]",
        "text-[--muted] dark:hover:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600",
        "data-[current=true]:border-[--brand] data-[current=true]:text-[--brand]"
    ]),
    icon: cva([
        "UI-NavigationTabs__icon",
        "-ml-0.5 mr-2 h-5 w-5",
        "text-[--muted] data-[current=true]:text-[--brand]"
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * NavigationTabs
 * -----------------------------------------------------------------------------------------------*/

export interface NavigationTabsProps extends React.ComponentPropsWithRef<"nav">, ComponentWithAnatomy<typeof NavigationTabsAnatomy> {
    items: {
        name: string,
        href: string | null | undefined,
        icon?: ((props: any) => JSX.Element) | null | undefined,
        isCurrent: boolean
    }[]
}

export const NavigationTabs: React.FC<NavigationTabsProps> = React.forwardRef<HTMLElement, NavigationTabsProps>((props, ref) => {

    const {
        children,
        className,
        navClassName,
        tabClassName,
        iconClassName,
        items,
        ...rest
    } = props

    return (
        <nav
            ref={ref}
            className={cn(NavigationTabsAnatomy.nav(), navClassName, className)}
            {...rest}
        >
            {items.map((tab) => (
                <a
                    key={tab.name}
                    href={tab.href ?? "#"}
                    className={cn(
                        NavigationTabsAnatomy.tab(),
                        tabClassName,
                    )}
                    aria-current={tab.isCurrent ? "page" : undefined}
                    data-current={tab.isCurrent}
                >
                    {tab.icon && <tab.icon
                        className={cn(
                            NavigationTabsAnatomy.icon(),
                            iconClassName
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

NavigationTabs.displayName = "Tabs"

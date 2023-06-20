import React from "react"
import { cn, ComponentWithAnatomy, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const NavigationTabsAnatomy = defineStyleAnatomy({
    nav: cva([
        "UI-NavigationTabs__nav",
        "flex w-full overflow-hidden overflow-x-auto"
    ]),
    tab: cva([
        "UI-NavigationTabs__tab",
        "group/navtabs inline-flex flex-none shrink-0 basis-auto items-center py-4 px-2 font-medium text-sm transition outline-none px-4 min-w-0 justify-center",
        "focus-visible:bg-[--highlight]",
        "text-[--muted]",
        "hover:text-[--text-color]",
        "data-[current=true]:border-[--brand] data-[current=true]:font-semibold data-[current=true]:text-[--brand]"
    ]),
    icon: cva([
        "UI-NavigationTabs__icon",
        "-ml-0.5 mr-2 h-5 w-5",
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

export const NavigationTabs = React.forwardRef<HTMLElement, NavigationTabsProps>((props, ref) => {

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

NavigationTabs.displayName = "NavigationTabs"

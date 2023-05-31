import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "@/components/ui/core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const NavigationTabsAnatomy = defineStyleAnatomy({
    container: cva([
        "UI-NavigationTabs__container",
        "block relative overflow-hidden overflow-x-auto w-full rounded-md shadow-sm"
    ]),
    nav: cva([
        "UI-NavigationTabs__nav",
        "flex border border-[--border] rounded-md -mb-px overflow-hidden"
    ]),
    tab: cva([
        "UI-NavigationTabs__tab",
        "group inline-flex flex-1 items-center py-4 px-1 font-medium text-sm transition outline-none px-4 min-w-0 justify-center",
        "border-b-2 border-[--border]",
        "focus-visible:bg-gray-100 focus-visible:ring-4 ring-[--ring] dark:focus-visible:bg-gray-800 dark:ring-gray-800"
    ], {
        variants: {
            isCurrent: {
                true: "border-[--brand] text-[--brand]",
                false: "text-[--muted] hover:border-gray-300 dark:hover:text-gray-400 dark:hover:border-gray-600"
            }
        },
        defaultVariants: { isCurrent: false }
    }),
    icon: cva([
        "UI-NavigationTabs__icon",
        "-ml-0.5 mr-2 h-5 w-5"
    ], {
        variants: {
            isCurrent: {
                true: "text-[--brand]",
                false: "text-[--muted]"
            }
        },
        defaultVariants: { isCurrent: false }
    }),
})

/* -------------------------------------------------------------------------------------------------
 * NavigationTabs
 * -----------------------------------------------------------------------------------------------*/

export interface NavigationTabsProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof NavigationTabsAnatomy> {
    children?: React.ReactNode
    options: {
        name: string,
        href: string | null | undefined,
        icon?: ((props: any) => JSX.Element) | null | undefined,
        isCurrent: boolean
    }[]
}

export const NavigationTabs: React.FC<NavigationTabsProps> = React.forwardRef<HTMLDivElement, NavigationTabsProps>((props, ref) => {

    const {
        children,
        className,
        containerClassName,
        navClassName,
        options,
        ...rest
    } = props

    return (
        <div

        >
            <div
                ref={ref}
                className={cn(NavigationTabsAnatomy.container(), containerClassName, className)}
                {...rest}
            >
                <nav className={cn(NavigationTabsAnatomy.nav(), navClassName)}>
                    {options.map((tab: any) => (
                        <a
                            key={tab.name}
                            href={tab.href}
                            className={cn(
                                NavigationTabsAnatomy.tab({
                                    isCurrent: tab.isCurrent
                                }),
                            )}
                            aria-current={tab.isCurrent ? "page" : undefined}
                        >
                            {tab.icon && <tab.icon
                                className={cn(
                                    NavigationTabsAnatomy.icon({
                                        isCurrent: tab.isCurrent
                                    })
                                )}
                                aria-hidden="true"
                            />}
                            <span>{tab.name}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    )

})

NavigationTabs.displayName = "Tabs"

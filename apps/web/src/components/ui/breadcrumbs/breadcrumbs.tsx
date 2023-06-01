"use client"

import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "@/components/ui/core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import { ShowOnly } from "@/components/ui/show-only"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const BreadcrumbsAnatomy = defineStyleAnatomy({
    container: cva([
        "UI-Breadcrumbs__container",
        "flex"
    ]),
    list: cva([
        "UI-Breadcrumbs__list",
        "flex items-center space-x-3"
    ]),
    chevronIcon: cva([
        "UI-Breadcrumbs__chevronIcon",
        "h-5 w-5 flex-shrink-0 text-gray-400 mr-4"
    ]),
    item: cva([
        "UI-Breadcrumbs__item",
        "text-sm font-medium text-gray-500 hover:text-gray-700"
    ], {
        variants: {
            isCurrent: {
                true: "pointer-events-none font-semibold text-gray-800 dark:text-gray-300",
                false: ""
            }
        }
    }),
    homeLink: cva([
        "UI-Breadcrumbs__homeLink",
        "text-gray-400 hover:text-gray-500"
    ]),
    homeIcon: cva([
        "UI-Breadcrumbs__homeIcon",
        "h-5 w-5 flex-shrink-0"
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs
 * -----------------------------------------------------------------------------------------------*/

export interface BreadcrumbsProps extends React.ComponentPropsWithRef<"nav">, ComponentWithAnatomy<typeof BreadcrumbsAnatomy> {
    children?: React.ReactNode
    homeHref?: string
    pages: { name: string, href: string | null | undefined, isCurrent: boolean }[]
    showHomeButton?: boolean
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = React.forwardRef<HTMLElement, BreadcrumbsProps>((props, ref) => {

    const {
        children,
        containerClassName,
        listClassName,
        itemClassName,
        chevronIconClassName,
        homeIconClassName,
        homeLinkClassName,
        className,
        pages,
        homeHref = "javascript:(0)",
        showHomeButton = true,
        ...rest
    } = props

    return (
        <div
        >
            <nav
                className={cn(BreadcrumbsAnatomy.container(), containerClassName, className)}
                {...rest}
                ref={ref}
            >
                <ol role="list" className={cn(BreadcrumbsAnatomy.list(), listClassName)}>
                    <ShowOnly when={showHomeButton}>
                        <li>
                            <div>
                                <a
                                    href={homeHref}
                                    className={cn(BreadcrumbsAnatomy.homeLink(), homeLinkClassName)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                                         className={cn(BreadcrumbsAnatomy.homeIcon(), homeIconClassName)}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                    </svg>
                                </a>
                            </div>
                        </li>
                    </ShowOnly>
                    {pages.map((page, idx) => (
                        <li key={page.name}>
                            <div className="flex items-center">
                                <ShowOnly when={!showHomeButton && idx > 0 || showHomeButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor"
                                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                         className={cn(BreadcrumbsAnatomy.chevronIcon(), chevronIconClassName)}
                                    >
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </ShowOnly>
                                <a
                                    href={page.href ?? "javascript:(0)"}
                                    className={cn(BreadcrumbsAnatomy.item({
                                        isCurrent: page.isCurrent
                                    }), itemClassName)}
                                    aria-current={page.isCurrent ? "page" : undefined}
                                >
                                    {page.name}
                                </a>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )

})

Breadcrumbs.displayName = "Breadcrumbs"

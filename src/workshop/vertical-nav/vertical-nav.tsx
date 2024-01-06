"use client"

import { cva, VariantProps } from "class-variance-authority"
import Link from "next/link"
import React from "react"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { Disclosure, DisclosureContent, DisclosureItem, DisclosureTrigger } from "../disclosure"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const VerticalNavAnatomy = defineStyleAnatomy({
    nav: cva([
        "UI-VerticalNav__nav",
        "block space-y-1",
    ]),
    item: cva([
        "UI-VerticalNav__tab",
        "group/verticalNav relative flex flex-none truncate items-center text-sm font-medium rounded-[--radius] transition cursor-pointer",
        "hover:bg-[--subtle] hover:text-[--text-color]",
        "focus-visible:bg-[--subtle] outline-none text-[--muted]",
        "data-[current=true]:bg-[--subtle] data-[current=true]:text[--foreground]",
    ], {
        variants: {
            size: {
                sm: "px-3 h-8",
                md: "px-3 h-10",
                lg: "px-3 h-12",
            },
            center: {
                true: "justify-center",
                false: null,
            },
        },
        defaultVariants: {
            size: "md",
        },
    }),
    parentItem: cva([
        "UI-VerticalNav__parentItem",
        "group/verticalNav_parentItem",
        "cursor-pointer w-full",
    ]),
    itemChevron: cva([
        "UI-VerticalNav__itemChevron",
        "size-4 transition-transform group-data-[state=open]/verticalNav_parentItem:rotate-90",
    ]),
    icon: cva([
        "UI-VerticalNav__icon",
        "flex-shrink-0 mr-3",
        "text-[--muted]",
        "group-hover/verticalNav:text-[--foreground]",
    ], {
        variants: {
            size: {
                sm: "size-4",
                md: "size-5",
                lg: "size-8",
            },
            center: {
                true: "mr-0",
                false: null,
            },
        },
        defaultVariants: {
            size: "md",
        },
    }),
    subContent: cva([
        "UI-VerticalNav__subContent",
        "border-b py-1",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * VerticalNav
 * -----------------------------------------------------------------------------------------------*/

export interface VerticalNavProps extends React.ComponentPropsWithRef<"div">,
    VariantProps<typeof VerticalNavAnatomy.item>,
    ComponentAnatomy<typeof VerticalNavAnatomy> {
    /**
     * If true, the nav will be rendered as a line of icons.
     */
    iconsOnly?: boolean
    items: {
        name: string
        href?: string | null | undefined
        icon?: ((props: any) => JSX.Element) | null | undefined
        isCurrent?: boolean
        onClick?: React.MouseEventHandler<HTMLElement>
        addon?: React.ReactNode
        content?: React.ReactNode
    }[]
}

export const VerticalNav = React.forwardRef<HTMLDivElement, VerticalNavProps>((props, ref) => {

    const {
        children,
        size,
        iconsOnly,
        /**/
        navClass,
        itemClass,
        iconClass,
        parentItemClass,
        subContentClass,
        itemChevronClass,
        className,
        items,
        ...rest
    } = props

    return (
        <nav
            ref={ref}
            className={cn(VerticalNavAnatomy.nav(), navClass, className)}
            {...rest}
        >
            {items.map((item, idx) => !item.content ? (
                <Link
                    href={item.href ?? "#"}
                    className={cn(
                        VerticalNavAnatomy.item({ size, center: iconsOnly }),
                        itemClass,
                    )}
                    aria-current={item.isCurrent ? "page" : undefined}
                    data-current={item.isCurrent}
                    onClick={item.onClick}
                >
                    {item.icon && <item.icon
                        className={cn(
                            VerticalNavAnatomy.icon({ size, center: iconsOnly }),
                            iconClass,
                        )}
                        aria-hidden="true"
                        data-current={item.isCurrent}
                    />}
                    {!iconsOnly && <span>{item.name}</span>}
                    {item.addon}
                </Link>
            ) : (
                <Disclosure type="multiple" key={item.name}>

                    <DisclosureItem value={item.name}>
                        <DisclosureTrigger>
                            <button
                                key={item.name}
                                tabIndex={idx}
                                className={cn(
                                    VerticalNavAnatomy.item({ size, center: iconsOnly }),
                                    itemClass,
                                    VerticalNavAnatomy.parentItem(),
                                    parentItemClass,
                                )}
                                aria-current={item.isCurrent ? "page" : undefined}
                                data-current={item.isCurrent}
                                onClick={item.onClick}
                            >
                                <div
                                    className={cn(
                                        "w-full flex items-center",
                                        iconsOnly && "justify-center",
                                    )}
                                >
                                    {item.icon && <item.icon
                                        className={cn(
                                            VerticalNavAnatomy.icon({ size, center: iconsOnly }),
                                            iconClass,
                                        )}
                                        aria-hidden="true"
                                        data-current={item.isCurrent}
                                    />}
                                    {!iconsOnly && <span>{item.name}</span>}
                                </div>
                                {!iconsOnly && <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={cn(VerticalNavAnatomy.itemChevron(), itemChevronClass)}
                                    data-open={`${open}`}
                                >
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>}
                            </button>
                        </DisclosureTrigger>

                        <DisclosureContent className={cn(VerticalNavAnatomy.subContent(), subContentClass)}>
                            {item.content && item.content}
                        </DisclosureContent>
                    </DisclosureItem>

                </Disclosure>
            ))}
        </nav>
    )

})

VerticalNav.displayName = "VerticalNav"

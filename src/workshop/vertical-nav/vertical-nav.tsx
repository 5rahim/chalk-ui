"use client"

import { cva, VariantProps } from "class-variance-authority"
import Link from "next/link"
import * as React from "react"
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
        "UI-VerticalNav__item",
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
            center: false,
        },
    }),
    itemContent: cva([
        "UI-VerticalNav__itemContent",
        "w-full flex items-center",
    ], {
        variants: {
            center: {
                true: "justify-center",
                false: null,
            },
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

export type VerticalNavItem = {
    name: string
    href?: string | null | undefined
    iconType?: React.ElementType
    isCurrent?: boolean
    onClick?: React.MouseEventHandler<HTMLElement>
    addon?: React.ReactNode
    subContent?: React.ReactNode
}

export interface VerticalNavProps extends React.ComponentPropsWithRef<"div">,
    VariantProps<typeof VerticalNavAnatomy.item>,
    ComponentAnatomy<typeof VerticalNavAnatomy> {
    /**
     * If true, the nav will be rendered as a line of icons.
     */
    iconsOnly?: boolean
    items: VerticalNavItem[]
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
        itemContentClass,
        className,
        items,
        ...rest
    } = props

    const itemProps = (item: VerticalNavItem) => ({
        className: cn(
            VerticalNavAnatomy.item({ size, center: iconsOnly }),
            itemClass,
        ),
        "data-current": item.isCurrent,
        onClick: item.onClick,
    })

    const itemContent = React.useCallback((item: VerticalNavItem) => (
        <div
            className={cn(
                VerticalNavAnatomy.itemContent({ center: iconsOnly }),
                itemClass,
            )}
        >
            {item.iconType && <item.iconType
                className={cn(
                    VerticalNavAnatomy.icon({ size, center: iconsOnly }),
                    iconClass,
                )}
                aria-hidden="true"
                data-current={item.isCurrent}
            />}
            {!iconsOnly && <span>{item.name}</span>}
            {item.addon}
        </div>
    ), [iconsOnly, size, itemClass, iconClass])

    return (
        <nav
            ref={ref}
            className={cn(VerticalNavAnatomy.nav(), navClass, className)}
            {...rest}
        >
            {items.map((item, idx) => {
                return (
                    <React.Fragment key={item.name + idx}>
                        {!item.subContent ?
                            item.href ? (
                                <Link href={item.href} {...itemProps(item)}>
                                    {itemContent(item)}
                                </Link>
                            ) : (
                                <button tabIndex={idx} {...itemProps(item)}>
                                    {itemContent(item)}
                                </button>
                            ) : (
                                <Disclosure type="multiple">
                                    <DisclosureItem value={item.name}>
                                        <DisclosureTrigger>
                                            <button
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
                                                {itemContent(item)}
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
                                            {item.subContent && item.subContent}
                                        </DisclosureContent>
                                    </DisclosureItem>

                                </Disclosure>
                            )}
                    </React.Fragment>
                )
            })}
        </nav>
    )

})

VerticalNav.displayName = "VerticalNav"

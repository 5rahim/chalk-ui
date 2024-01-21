"use client"

import { cva, VariantProps } from "class-variance-authority"
import Link from "next/link"
import * as React from "react"
import { useContext } from "react"
import { cn, ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { Disclosure, DisclosureContent, DisclosureItem, DisclosureTrigger } from "../disclosure"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const VerticalMenuAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-VerticalMenu__root",
        "block space-y-1",
    ]),
    item: cva([
        "UI-VerticalMenu__item",
        "group/verticalMenu_item relative flex flex-none truncate items-center w-full font-medium rounded-[--radius] transition cursor-pointer",
        "hover:bg-[--subtle] hover:text-[--text-color]",
        "focus-visible:bg-[--subtle] outline-none text-[--muted]",
        "data-[current=true]:bg-[--subtle] data-[current=true]:text-[--foreground]",
    ], {
        variants: {
            size: {
                sm: "px-3 h-8 text-sm",
                md: "px-3 h-10 text-sm",
                lg: "px-3 h-12 text-base",
            },
            _center: {
                true: "justify-center",
                false: null,
            },
        },
        defaultVariants: {
            size: "md",
            _center: false,
        },
    }),
    itemContent: cva([
        "UI-VerticalMenu__itemContent",
        "w-full flex items-center",
    ], {
        variants: {
            _center: {
                true: "justify-center",
                false: null,
            },
        },
    }),
    parentItem: cva([
        "UI-VerticalMenu__parentItem",
        "group/verticalMenu_parentItem",
        "cursor-pointer w-full",
    ]),
    itemChevron: cva([
        "UI-VerticalMenu__itemChevron",
        "size-4 transition-transform group-data-[state=open]/verticalMenu_parentItem:rotate-90",
    ]),
    icon: cva([
        "UI-VerticalMenu__icon",
        "flex-shrink-0 mr-3",
        "text-[--muted]",
        "group-hover/verticalMenu_item:text-[--foreground]", // Item Hover
        "group-data-[current=true]/verticalMenu_item:text-[--foreground]", // Item Current
    ], {
        variants: {
            size: {
                sm: "size-4",
                md: "size-5",
                lg: "size-6",
            },
            _center: {
                true: "mr-0",
                false: null,
            },
        },
        defaultVariants: {
            size: "md",
        },
    }),
    subContent: cva([
        "UI-VerticalMenu__subContent",
        "border-b py-1",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * VerticalMenu
 * -----------------------------------------------------------------------------------------------*/

const __VerticalMenuContext = React.createContext<Pick<VerticalMenuProps, "onAnyItemClick" | "onLinkItemClick">>({})

export type VerticalMenuItem = {
    name: string
    href?: string | null | undefined
    iconType?: React.ElementType
    isCurrent?: boolean
    onClick?: React.MouseEventHandler<HTMLElement>
    addon?: React.ReactNode
    subContent?: React.ReactNode
}

export type VerticalMenuProps = React.ComponentPropsWithRef<"div"> &
    ComponentAnatomy<typeof VerticalMenuAnatomy> &
    VariantProps<typeof VerticalMenuAnatomy.item> & {
    /**
     * If true, the nav will be rendered as a line of icons.
     */
    iconsOnly?: boolean
    items: VerticalMenuItem[]
    /**
     * Callback when any item is clicked.
     */
    onAnyItemClick?: React.MouseEventHandler<HTMLElement>
    /**
     * Callback when a link item is clicked.
     */
    onLinkItemClick?: React.MouseEventHandler<HTMLElement>
}

export const VerticalMenu = React.forwardRef<HTMLDivElement, VerticalMenuProps>((props, ref) => {

    const {
        children,
        size,
        iconsOnly,
        onAnyItemClick,
        onLinkItemClick,
        /**/
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

    const {
        onLinkItemClick: _onLinkItemClick,
        onAnyItemClick: _onAnyItemClick,
    } = useContext(__VerticalMenuContext)

    const itemProps = (item: VerticalMenuItem) => ({
        className: cn(
            VerticalMenuAnatomy.item({ size, _center: iconsOnly }),
            itemClass,
        ),
        "data-current": item.isCurrent,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
            if (item.href) {
                onLinkItemClick?.(e)
                _onLinkItemClick?.(e)
            }
            onAnyItemClick?.(e)
            _onAnyItemClick?.(e)
            item.onClick?.(e)
        },
    })

    const ItemContent = React.useCallback((item: VerticalMenuItem) => (
        <div
            className={cn(
                VerticalMenuAnatomy.itemContent({ _center: iconsOnly }),
                itemContentClass,
            )}
        >
            {item.iconType && <item.iconType
                className={cn(
                    VerticalMenuAnatomy.icon({ size, _center: iconsOnly }),
                    iconClass,
                )}
                aria-hidden="true"
                data-current={item.isCurrent}
            />}
            {!iconsOnly && <span>{item.name}</span>}
            {item.addon}
        </div>
    ), [iconsOnly, size, itemContentClass, iconClass])

    return (
        <nav
            ref={ref}
            className={cn(VerticalMenuAnatomy.root(), className)}
            role="navigation"
            {...rest}
        >
            <__VerticalMenuContext.Provider
                value={{
                    onAnyItemClick,
                    onLinkItemClick,
                }}
            >
                {items.map((item, idx) => {
                    return (
                        <React.Fragment key={item.name + idx}>
                            {!item.subContent ?
                                item.href ? (
                                    <Link href={item.href} {...itemProps(item)}>
                                        <ItemContent {...item} />
                                    </Link>
                                ) : (
                                    <button {...itemProps(item)}>
                                        <ItemContent {...item} />
                                    </button>
                                ) : (
                                    <Disclosure type="multiple">
                                        <DisclosureItem value={item.name}>
                                            <DisclosureTrigger>
                                                <button
                                                    className={cn(
                                                        VerticalMenuAnatomy.item({ size, _center: iconsOnly }),
                                                        itemClass,
                                                        VerticalMenuAnatomy.parentItem(),
                                                        parentItemClass,
                                                    )}
                                                    aria-current={item.isCurrent ? "page" : undefined}
                                                    data-current={item.isCurrent}
                                                    onClick={item.onClick}
                                                >
                                                    <ItemContent {...item} />
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
                                                        className={cn(VerticalMenuAnatomy.itemChevron(), itemChevronClass)}
                                                    >
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>}
                                                </button>
                                            </DisclosureTrigger>

                                            <DisclosureContent className={cn(VerticalMenuAnatomy.subContent(), subContentClass)}>
                                                {item.subContent && item.subContent}
                                            </DisclosureContent>
                                        </DisclosureItem>
                                    </Disclosure>
                                )}
                        </React.Fragment>
                    )
                })}
            </__VerticalMenuContext.Provider>
        </nav>
    )

})

VerticalMenu.displayName = "VerticalMenu"

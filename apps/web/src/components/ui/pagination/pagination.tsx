"use client"

import React from "react"
import { ComponentWithAnatomy, createPolymorphicComponent, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const PaginationAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Pagination__root",
        "flex gap-1 text-xs font-medium"
    ]),
    item: cva([
        "UI-Pagination__item",
        "text-md inline-flex h-10 w-10 items-center justify-center rounded border border-[--border] cursor-pointer hover:bg-[--highlight] select-none",
        "data-selected:bg-brand-500 data-selected:border-transparent data-selected:text-white data-selected:hover:bg-brand-500 data-selected:pointer-events-none",
        "data-disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-not-allowed"
    ]),
    ellipsis: cva([
        "UI-Pagination__ellipsis",
        "flex p-2 items-center text-[1.05rem]"
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Pagination
 * -----------------------------------------------------------------------------------------------*/

export interface PaginationProps extends React.ComponentPropsWithRef<"ul">,
    Omit<ComponentWithAnatomy<typeof PaginationAnatomy>, "ellipsisClassName"> {
    children?: React.ReactNode
}

const _Pagination = (props: PaginationProps) => {

    const {
        children,
        rootClassName,
        itemClassName,
        className,
        ref,
        ...rest
    } = props

    const itemsWithProps = React.useMemo(() => React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { itemClassName } as any)
        }
        return child
    }), [children])

    return (
        <ul
            className={cn(PaginationAnatomy.root(), rootClassName, className)}
            role="list"
            {...rest}
            ref={ref}
        >
            {itemsWithProps}
        </ul>
    )

}

_Pagination.displayName = "Pagination"

/* -------------------------------------------------------------------------------------------------
 * Pagination.Item
 * -----------------------------------------------------------------------------------------------*/

export interface PaginationItemProps extends Omit<React.ComponentPropsWithRef<"a">, "children">, ComponentWithAnatomy<typeof PaginationAnatomy> {
    value: string | number
}

const PaginationItem: React.FC<PaginationItemProps> = React.forwardRef<HTMLAnchorElement, PaginationItemProps>((props, ref) => {

    const {
        value,
        className,
        itemClassName,
        ellipsisClassName, // Ignore
        ...rest
    } = props

    return (
        <li>
            <a
                className={cn(PaginationAnatomy.item(), itemClassName, className)}
                {...rest}
                ref={ref}
            >
                {value}
            </a>
        </li>
    )

})

PaginationItem.displayName = "PaginationItem"

/* -------------------------------------------------------------------------------------------------
 * Pagination.Trigger
 * -----------------------------------------------------------------------------------------------*/

export interface PaginationTriggerProps extends Omit<React.ComponentPropsWithRef<"a">, "children">, ComponentWithAnatomy<typeof PaginationAnatomy> {
    direction: "left" | "right"
}

const PaginationTrigger: React.FC<PaginationTriggerProps> = React.forwardRef<HTMLAnchorElement, PaginationTriggerProps>((props, ref) => {

    const {
        direction,
        className,
        itemClassName,
        ellipsisClassName, // Ignore
        ...rest
    } = props

    return (
        <li>
            <a
                className={cn(PaginationAnatomy.item(), itemClassName, className)}
                {...rest}
                ref={ref}
            >
                {direction === "left" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="h-4 w-4"
                    >
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="h-4 w-4"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                )}
            </a>
        </li>
    )

})

PaginationTrigger.displayName = "PaginationTrigger"

/* -------------------------------------------------------------------------------------------------
 * Pagination.Ellipsis
 * -----------------------------------------------------------------------------------------------*/

export interface PaginationEllipsisProps extends Omit<React.ComponentPropsWithRef<"span">, "children">,
    ComponentWithAnatomy<typeof PaginationAnatomy> {
}

const PaginationEllipsis: React.FC<PaginationEllipsisProps> = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>((props, ref) => {

    const {
        className,
        itemClassName, // Ignore
        ellipsisClassName,
        ...rest
    } = props

    return (
        <li className={cn(PaginationAnatomy.ellipsis(), ellipsisClassName, className)}>
            <span
                {...rest}
                ref={ref}
            >
                &#8230;
            </span>
        </li>
    )

})

PaginationEllipsis.displayName = "PaginationEllipsis"

/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/

_Pagination.Item = PaginationItem
_Pagination.Ellipsis = PaginationEllipsis
_Pagination.Trigger = PaginationTrigger

export const Pagination = createPolymorphicComponent<"div", PaginationProps, {
    Item: typeof PaginationItem
    Ellipsis: typeof PaginationEllipsis
    Trigger: typeof PaginationTrigger
}>(_Pagination)

Pagination.displayName = "Pagination"

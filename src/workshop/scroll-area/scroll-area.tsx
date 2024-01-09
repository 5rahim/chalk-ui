"use client"

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const ScrollAreaAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-ScrollArea__root",
        "relative overflow-hidden",
    ]),
    viewport: cva([
        "UI-ScrollArea__viewport",
        "h-full w-full rounded-[inherit]",
    ]),
    scrollbar:
        cva([
            "UI-ScrollArea__scrollbar",
            "flex touch-none select-none transition-colors",
        ], {
            variants: {
                orientation: {
                    vertical: "h-full w-2.5 border-l border-l-transparent p-[1px]",
                    horizontal: "h-2.5 flex-col border-t border-t-transparent p-[1px]",
                },
            },
            defaultVariants: {
                orientation: "vertical",
            },
        }),
    thumb: cva([
        "UI-ScrollArea__thumb",
        "relative flex-1 rounded-full bg-[--border]",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * ScrollArea
 * -----------------------------------------------------------------------------------------------*/

export type ScrollAreaProps =
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
    & ComponentAnatomy<typeof ScrollAreaAnatomy>

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>((props, ref) => {
    const {
        className,
        scrollbarClass,
        thumbClass,
        viewportClass,
        children,
        ...rest
    } = props
    return (
        <ScrollAreaPrimitive.Root
            ref={ref}
            className={cn(ScrollAreaAnatomy.root(), className)}
            {...rest}
        >
            <ScrollAreaPrimitive.Viewport className={cn(ScrollAreaAnatomy.viewport(), viewportClass)}>
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar
                className={scrollbarClass}
                thumbClass={thumbClass}
            />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    )

})
ScrollArea.displayName = "ScrollArea"

/* -------------------------------------------------------------------------------------------------
 * ScrollBar
 * -----------------------------------------------------------------------------------------------*/

export type ScrollBarProps =
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> &
    Pick<ComponentAnatomy<typeof ScrollAreaAnatomy>, "thumbClass">

export const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>((props, ref) => {
    const {
        className,
        thumbClass,
        orientation = "vertical",
        ...rest
    } = props

    return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            ref={ref}
            orientation={orientation}
            className={cn(ScrollAreaAnatomy.scrollbar({ orientation }), className)}
            {...rest}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb className={cn(ScrollAreaAnatomy.thumb(), thumbClass)} />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )
})
ScrollBar.displayName = "ScrollBar"

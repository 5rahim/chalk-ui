"use client"

import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "../core/classnames"
import { defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const PopoverAnatomy = defineStyleAnatomy({
    content: cva([
        "z-50 w-72 rounded-md border bg-[--paper] p-4 text-base shadow-md outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Popover
 * -----------------------------------------------------------------------------------------------*/

export type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> &
    { trigger: React.ReactElement, triggerProps?: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> }

export function Popover(props: PopoverProps) {
    const {
        trigger,
        triggerProps,
        ...rest
    } = props

    return (
        <PopoverPrimitive.Root
            {...rest}
        >
            <PopoverPrimitive.Trigger
                asChild
                {...triggerProps}
            >
                {trigger}
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    )
}

Popover.displayName = "Popover"

/* -------------------------------------------------------------------------------------------------
 * PopoverContent
 * -----------------------------------------------------------------------------------------------*/

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
    const {
        className,
        align = "center",
        sideOffset = 4,
        ...rest
    } = props

    return (
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(PopoverAnatomy.content(), className)}
            {...rest}
        />
    )
})
PopoverContent.displayName = "PopoverContent"


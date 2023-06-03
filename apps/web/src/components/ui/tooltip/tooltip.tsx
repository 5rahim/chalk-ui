"use client"

import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import type { TooltipContentProps as TooltipPrimitiveContentProps } from "@radix-ui/react-tooltip"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const TooltipAnatomy = defineStyleAnatomy({
    tooltip: cva([
        "UI-Tooltip__tooltip",
        "z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md animate-in fade-in-50",
        "bg-gray-900 dark:bg-gray-800 text-white",
        "data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1"
    ])
})

/* -------------------------------------------------------------------------------------------------
 * Tooltip
 * -----------------------------------------------------------------------------------------------*/

export interface TooltipProps extends React.ComponentPropsWithRef<"div">,
    ComponentWithAnatomy<typeof TooltipAnatomy>,
    TooltipPrimitiveContentProps {
    trigger: React.ReactElement
}

export const Tooltip: React.FC<TooltipProps> = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {

    const {
        children,
        tooltipClassName,
        className,
        trigger,
        ...rest
    } = props

    return (
        <TooltipPrimitive.Provider delayDuration={50}>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                    {trigger}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                    className={cn(TooltipAnatomy.tooltip(), tooltipClassName, className)}
                    {...rest}
                    ref={ref}
                >
                    {children}
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    )

})

Tooltip.displayName = "Tooltip"

/* -------------------------------------------------------------------------------------------------
 * TooltipProvider
 * -----------------------------------------------------------------------------------------------*/

export const TooltipProvider = TooltipPrimitive.Provider
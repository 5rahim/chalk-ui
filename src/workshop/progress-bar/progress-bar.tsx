"use client"

import { ComponentAnatomy } from "@/workshop/core/styling"
import * as ProgressBarPrimitive from "@radix-ui/react-progress"
import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "../core/classnames"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const ProgressBarAnatomy = {
    root: cva([
        "UI-ProgressBar__root",
        "relative w-full overflow-hidden rounded-full bg-[--subtle] translate-z-0",
    ], {
        variants: {
            size: {
                sm: "h-2",
                md: "h-3",
                lg: "h-4",
                xl: "h-6",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }),
    indicator: cva([
        "UI-ProgressBar__indicator",
        "h-full w-full flex-1 bg-brand transition-all flex items-center justify-center relative",
    ], {
        variants: {
            isIndeterminate: {
                true: "animate-indeterminate-progress origin-left-right",
                false: null,
            },
        },
        defaultVariants: {
            isIndeterminate: false,
        },
    }),
}

/* -------------------------------------------------------------------------------------------------
 * ProgressBar
 * -----------------------------------------------------------------------------------------------*/

export type ProgressBarProps = React.ComponentPropsWithoutRef<typeof ProgressBarPrimitive.Root>
    & ComponentAnatomy<typeof ProgressBarAnatomy>
    & VariantProps<typeof ProgressBarAnatomy.root>
    & VariantProps<typeof ProgressBarAnatomy.indicator>

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
    const {
        className,
        value,
        indicatorClass,
        size,
        isIndeterminate,
        ...rest
    } = props

    return (
        <ProgressBarPrimitive.Root
            ref={ref}
            className={cn(ProgressBarAnatomy.root({ size }), className)}
            {...rest}
        >
            <ProgressBarPrimitive.Indicator
                className={cn(ProgressBarAnatomy.indicator({ isIndeterminate }), indicatorClass)}
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </ProgressBarPrimitive.Root>
    )
})
ProgressBar.displayName = "ProgressBar"

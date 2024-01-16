"use client"

import { cn, ComponentAnatomy } from "../core/styling"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"

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

export type ProgressBarProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
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
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(ProgressBarAnatomy.root({ size }), className)}
            {...rest}
        >
            <ProgressPrimitive.Indicator
                className={cn(ProgressBarAnatomy.indicator({ isIndeterminate }), indicatorClass)}
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    )
})
ProgressBar.displayName = "ProgressBar"

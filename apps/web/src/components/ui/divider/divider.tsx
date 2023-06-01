"use client"

import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "@/components/ui/core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DividerAnatomy = defineStyleAnatomy({
    divider: cva([
        "UI-Divider__divider",
        "w-full border-gray-200 dark:border-gray-700",
    ])
})

/* -------------------------------------------------------------------------------------------------
 * Divider
 * -----------------------------------------------------------------------------------------------*/

export interface DividerProps extends React.ComponentPropsWithRef<"hr">, ComponentWithAnatomy<typeof DividerAnatomy> {
    children?: React.ReactNode
}

export const Divider: React.FC<DividerProps> = React.forwardRef<HTMLHRElement, DividerProps>((props, ref) => {

    const {
        children,
        dividerClassName,
        className,
        ...rest
    } = props

    return (
        <hr className={cn(DividerAnatomy.divider(), dividerClassName, className)} {...rest} ref={ref}/>
    )

})

Divider.displayName = "Divider"

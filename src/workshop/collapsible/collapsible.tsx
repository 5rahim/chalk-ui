"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import * as React from "react"

/* -------------------------------------------------------------------------------------------------
 * Collapsible
 * -----------------------------------------------------------------------------------------------*/

export const Collapsible = CollapsiblePrimitive.Root

Collapsible.displayName = "Collapsible"

/* -------------------------------------------------------------------------------------------------
 * CollapsibleTrigger
 * -----------------------------------------------------------------------------------------------*/

export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>

export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>((props, ref) => {
    const { children, ...rest } = props

    return (
        <CollapsiblePrimitive.CollapsibleTrigger
            ref={ref}
            asChild
            {...rest}
        >
            {children}
        </CollapsiblePrimitive.CollapsibleTrigger>
    )
})

CollapsibleTrigger.displayName = "CollapsibleTrigger"

/* -------------------------------------------------------------------------------------------------
 * CollapsibleContent
 * -----------------------------------------------------------------------------------------------*/

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>

export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>((props, ref) => {

    return (
        <CollapsiblePrimitive.CollapsibleContent
            ref={ref}
            {...props}
        />
    )
})

CollapsibleContent.displayName = "CollapsibleContent"


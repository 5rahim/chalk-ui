"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const TabsAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Tabs__root",
    ]),
    list: cva([
        "UI-Tabs__list",
        "inline-flex h-12 items-center justify-center rounded-md w-full",
    ]),
    trigger: cva([
        "UI-Tabs__trigger",
        "inline-flex h-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm text-[--muted] font-medium ring-offset-[--background]",
        "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "border-transparent border-b-2 -mb-px",
        "data-[state=active]:border-[--brand] data-[state=active]:bg-[--subtle] data-[state=active]:text-[--foreground] data-[state=active]:shadow-sm",
    ]),
    content: cva([
        "UI-Tabs__content",
        "mt-2 ring-offset-[--background]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-2",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * -----------------------------------------------------------------------------------------------*/

export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & ComponentAnatomy<typeof TabsAnatomy>

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
    const { className, ...rest } = props

    return (
        <TabsPrimitive.Root
            ref={ref}
            className={cn(TabsAnatomy.root(), className)}
            {...rest}
        />
    )
})


/* -------------------------------------------------------------------------------------------------
 * TabsList
 * -----------------------------------------------------------------------------------------------*/

export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & ComponentAnatomy<typeof TabsAnatomy>

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
    const { className, ...rest } = props

    return (
        <TabsPrimitive.List
            ref={ref}
            className={cn(TabsAnatomy.list(), className)}
            {...rest}
        />
    )
})

TabsList.displayName = "TabsList"


/* -------------------------------------------------------------------------------------------------
 * TabsTrigger
 * -----------------------------------------------------------------------------------------------*/

export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & ComponentAnatomy<typeof TabsAnatomy>

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>((props, ref) => {
    const { className, ...rest } = props

    return (
        <TabsPrimitive.Trigger
            ref={ref}
            className={cn(TabsAnatomy.trigger(), className)}
            {...rest}
        />
    )
})

TabsTrigger.displayName = "TabsTrigger"

/* -------------------------------------------------------------------------------------------------
 * TabsContent
 * -----------------------------------------------------------------------------------------------*/

export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & ComponentAnatomy<typeof TabsAnatomy>

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>((props, ref) => {
    const { className, ...rest } = props

    return (
        <TabsPrimitive.Content
            ref={ref}
            className={cn(TabsAnatomy.content(), className)}
            {...rest}
        />
    )
})

TabsContent.displayName = "TabsContent"


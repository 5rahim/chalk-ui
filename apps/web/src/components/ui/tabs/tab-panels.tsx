"use client"

import React from "react"
import { ComponentWithAnatomy, createPolymorphicComponent, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import type { TabListProps as TabPrimitiveListProps, TabProps as TabPrimitiveProps } from "@headlessui/react"
import { Tab as TabPrimitive } from "@headlessui/react"


/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const TabPanelsAnatomy = defineStyleAnatomy({
    panels: cva([
        "UI-TabPanels__panels",
    ])
})

export const TabNavAnatomy = defineStyleAnatomy({
    nav: cva([
        "UI-TabNav__nav",
        "isolate flex border-b"
    ])
})

export const TabAnatomy = defineStyleAnatomy({
    tab: cva([
        "UI-Tab__tab",
        "group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-sm font-medium text-center focus:z-10",
        "flex items-center justify-center gap-2 border-b-2 -mb-px",
        "text-[--muted] ui-selected:text-[--brand] ui-selected:border-brand dark:ui-selected:border-brand-200",
        "border-[--border] hover:border-gray-300 dark:hover:border-gray-600",
        "focus-visible:bg-[--highlight] outline-none"
    ])
})

/* -------------------------------------------------------------------------------------------------
 * TabPanels
 * -----------------------------------------------------------------------------------------------*/

export interface TabPanelsProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof TabPanelsAnatomy> {
}

const _TabPanels = (props: TabPanelsProps) => {

    const {
        children,
        panelsClassName,
        className,
        ref,
        ...rest
    } = props

    return (
        <TabPrimitive.Group
        >
            <div
                className={cn(TabPanelsAnatomy.panels(), panelsClassName)}
                {...rest}
                ref={ref}
            >
                {children}
            </div>
        </TabPrimitive.Group>
    )

}

_TabPanels.displayName = "TabPanels"

/* -------------------------------------------------------------------------------------------------
 * TabNav
 * -----------------------------------------------------------------------------------------------*/

interface TabNavProps extends TabPrimitiveListProps<"div">, ComponentWithAnatomy<typeof TabNavAnatomy> {
}

const TabNav: React.FC<TabNavProps> = React.forwardRef<HTMLDivElement, TabNavProps>((props, ref) => {

    const {
        children,
        className,
        navClassName,
        ...rest
    } = props

    return (
        <TabPrimitive.List
            className={cn(TabNavAnatomy.nav(), navClassName, className)}
            {...rest}
            ref={ref}
        >
            {children}
        </TabPrimitive.List>
    )

})

TabNav.displayName = "TabNav"

/* -------------------------------------------------------------------------------------------------
 * Tab
 * -----------------------------------------------------------------------------------------------*/

interface TabProps extends TabPrimitiveProps<"div">, ComponentWithAnatomy<typeof TabAnatomy> {
}

const Tab: React.FC<TabProps> = React.forwardRef<HTMLDivElement, TabProps>((props, ref) => {

    const {
        children,
        className,
        tabClassName,
        ...rest
    } = props

    return (
        <TabPrimitive
            className={cn(TabAnatomy.tab(), tabClassName, className)}
            {...rest}
            ref={ref}
        >
            {children}
        </TabPrimitive>
    )

})

Tab.displayName = "Tab"

/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/

_TabPanels.Tab = Tab
_TabPanels.Nav = TabNav
_TabPanels.Container = TabPrimitive.Panels
_TabPanels.Panel = TabPrimitive.Panel

export const TabPanels = createPolymorphicComponent<"div", TabPanelsProps, {
    Tab: typeof Tab,
    Nav: typeof TabNav,
    Container: typeof TabPrimitive.Panels
    Panel: typeof TabPrimitive.Panel
}>(_TabPanels)

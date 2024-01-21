import { cn, ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const AppLayoutAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayout__root appLayout",
        "flex w-full group/appLayout",
    ], {
        variants: {
            withSidebar: {
                true: "flex-row with-sidebar",
                false: "flex-col",
            },
            sidebarSize: {
                slim: "sidebar-slim",
                sm: "sidebar-sm",
                md: "sidebar-md",
                lg: "sidebar-lg",
                xl: "sidebar-xl",
            },
        },
        defaultVariants: {
            withSidebar: false,
            sidebarSize: "md",
        },
        compoundVariants: [
            { withSidebar: true, sidebarSize: "slim", className: "lg:[&>.appLayout]:pl-20" },
            { withSidebar: true, sidebarSize: "sm", className: "lg:[&>.appLayout]:pl-48" },
            { withSidebar: true, sidebarSize: "md", className: "lg:[&>.appLayout]:pl-64" },
            { withSidebar: true, sidebarSize: "lg", className: "lg:[&>.appLayout]:pl-[20rem]" },
            { withSidebar: true, sidebarSize: "xl", className: "lg:[&>.appLayout]:pl-[25rem]" },
        ],
    }),
})

export const AppLayoutHeaderAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutHeader__root",
        "relative w-full",
    ]),
})

export const AppLayoutSidebarAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutSidebar__root",
        "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col grow-0 shrink-0 basis-0",
        "group-[.sidebar-slim]/appLayout:w-20",
        "group-[.sidebar-sm]/appLayout:w-48",
        "group-[.sidebar-md]/appLayout:w-64",
        "group-[.sidebar-lg]/appLayout:w-[20rem]",
        "group-[.sidebar-xl]/appLayout:w-[25rem]",
    ]),
})

export const AppLayoutContentAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutContent__root",
        "relative",
    ]),
})

export const AppLayoutFooterAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutFooter__root",
        "relative",
    ]),
})

export const AppLayoutStackAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutStack__root",
        "relative",
    ], {
        variants: {
            spacing: {
                sm: "space-y-2",
                md: "space-y-4",
                lg: "space-y-8",
                xl: "space-y-10",
            },
        },
        defaultVariants: {
            spacing: "md",
        },
    }),
})

export const AppLayoutGridAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutGrid__root",
        "relative block",
    ], {
        variants: {
            breakBelow: {
                sm: "sm:grid sm:space-y-0",
                md: "md:grid md:space-y-0",
                lg: "lg:grid lg:space-y-0",
                xl: "xl:grid xl:space-y-0",
            },
            spacing: {
                sm: "space-y-2 gap-2",
                md: "space-y-4 gap-4",
                lg: "space-y-8 gap-8",
                xl: "space-y-10 gap-10",
            },
            cols: {
                1: "grid-cols-1",
                2: "grid-cols-2",
                3: "grid-cols-3",
                4: "grid-cols-4",
                5: "grid-cols-5",
                6: "grid-cols-6",
            },
        },
        defaultVariants: {
            breakBelow: "xl",
            spacing: "md",
            cols: 3,
        },
    }),
})

/* -------------------------------------------------------------------------------------------------
 * AppLayout
 * -----------------------------------------------------------------------------------------------*/

export type AppLayoutProps = React.ComponentPropsWithRef<"div"> &
    ComponentAnatomy<typeof AppLayoutAnatomy> &
    VariantProps<typeof AppLayoutAnatomy.root>

export const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>((props, ref) => {

    const {
        children,
        className,
        withSidebar = false,
        sidebarSize,
        ...rest
    } = props

    return (
        <div
            ref={ref}
            className={cn(AppLayoutAnatomy.root({ withSidebar, sidebarSize }), className)}
            {...rest}
        >
            {children}
        </div>
    )

})

AppLayout.displayName = "AppLayout"

/* -------------------------------------------------------------------------------------------------
 * AppLayoutHeader
 * -----------------------------------------------------------------------------------------------*/

export type AppLayoutHeaderProps = React.ComponentPropsWithRef<"header">

export const AppLayoutHeader = React.forwardRef<HTMLElement, AppLayoutHeaderProps>((props, ref) => {

    const {
        children,
        className,
        ...rest
    } = props

    return (
        <header
            ref={ref}
            className={cn(AppLayoutHeaderAnatomy.root(), className)}
            {...rest}
        >
            {children}
        </header>
    )

})

AppLayoutHeader.displayName = "AppLayoutHeader"

/* -------------------------------------------------------------------------------------------------
 * AppLayoutSidebar
 * -----------------------------------------------------------------------------------------------*/

export type AppLayoutSidebarProps = React.ComponentPropsWithRef<"aside">

export const AppLayoutSidebar = React.forwardRef<HTMLElement, AppLayoutSidebarProps>((props, ref) => {

    const {
        children,
        className,
        ...rest
    } = props

    return (
        <aside
            ref={ref}
            className={cn(AppLayoutSidebarAnatomy.root(), className)}
            {...rest}
        >
            {children}
        </aside>
    )

})

AppLayoutSidebar.displayName = "AppLayoutSidebar"

/* -------------------------------------------------------------------------------------------------
 * AppLayoutContent
 * -----------------------------------------------------------------------------------------------*/

export type AppLayoutContentProps = React.ComponentPropsWithRef<"main">

export const AppLayoutContent = React.forwardRef<HTMLElement, AppLayoutContentProps>((props, ref) => {

    const {
        children,
        className,
        ...rest
    } = props

    return (
        <main
            ref={ref}
            className={cn(AppLayoutContentAnatomy.root(), className)}
            {...rest}
        >
            {children}
        </main>
    )

})

AppLayoutContent.displayName = "AppLayoutContent"

/* -------------------------------------------------------------------------------------------------
 * AppLayoutGrid
 * -----------------------------------------------------------------------------------------------*/

export type AppLayoutGridProps = React.ComponentPropsWithRef<"section"> &
    VariantProps<typeof AppLayoutGridAnatomy.root>

export const AppLayoutGrid = React.forwardRef<HTMLElement, AppLayoutGridProps>((props, ref) => {

    const {
        children,
        className,
        breakBelow,
        cols,
        spacing,
        ...rest
    } = props

    return (
        <section
            ref={ref}
            className={cn(AppLayoutGridAnatomy.root({ breakBelow, cols, spacing }), className)}
            {...rest}
        >
            {children}
        </section>
    )

})

AppLayoutGrid.displayName = "AppLayoutGrid"

/* -------------------------------------------------------------------------------------------------
 * AppLayoutFooter
 * -----------------------------------------------------------------------------------------------*/

export type AppLayoutFooterProps = React.ComponentPropsWithRef<"footer">

export const AppLayoutFooter = React.forwardRef<HTMLElement, AppLayoutFooterProps>((props, ref) => {

    const {
        children,
        className,
        ...rest
    } = props

    return (
        <footer
            ref={ref}
            className={cn(AppLayoutFooterAnatomy.root(), className)}
            {...rest}
        >
            {children}
        </footer>
    )

})

AppLayoutFooter.displayName = "AppLayoutFooter"

/* -------------------------------------------------------------------------------------------------
 * AppLayoutStack
 * -----------------------------------------------------------------------------------------------*/

export type AppLayoutStackProps = React.ComponentPropsWithRef<"div"> &
    VariantProps<typeof AppLayoutStackAnatomy.root>

export const AppLayoutStack = React.forwardRef<HTMLDivElement, AppLayoutStackProps>((props, ref) => {

    const {
        children,
        className,
        spacing,
        ...rest
    } = props

    return (
        <div
            ref={ref}
            className={cn(AppLayoutStackAnatomy.root({ spacing }), className)}
            {...rest}
        >
            {children}
        </div>
    )

})

AppLayoutStack.displayName = "AppLayoutStack"


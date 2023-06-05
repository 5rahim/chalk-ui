import React from "react"
import { ComponentWithAnatomy, createPolymorphicComponent, defineStyleAnatomy } from "@/components/ui/core"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const AppLayoutAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayout__root",
        "flex w-full min-h-screen group",
        "group-[.with-sidebar]:group-[.sidebar-slim]:md:pl-20",
        "group-[.with-sidebar]:group-[.sidebar-md]:md:pl-64",
        "group-[.with-sidebar]:group-[.sidebar-lg]:md:pl-[20rem]",
        "group-[.with-sidebar]:group-[.sidebar-xl]:md:pl-[25rem]",
    ], {
        variants: {
            withSidebar: {
                true: "flex-row with-sidebar",
                false: "flex-col"
            },
            sidebarSize: {
                slim: "sidebar-slim",
                md: "sidebar-md",
                lg: "sidebar-lg",
                xl: "sidebar-xl",
            }
        },
        defaultVariants: {
            withSidebar: false,
            sidebarSize: "md"
        }
    })
})

export const AppLayoutHeaderAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutHeader__root",
        "flex items-center grow-0 shrink-0 basis-auto"
    ])
})

export const AppLayoutSidebarAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutSidebar__root",
        "hidden md:fixed md:inset-y-0 md:flex md:flex-col grow-0 shrink-0 basis-0",
        "group-[.sidebar-slim]:md:w-20",
        "group-[.sidebar-md]:md:w-64",
        "group-[.sidebar-lg]:md:w-[20rem]",
        "group-[.sidebar-xl]:md:w-[25rem]",
    ]),
    sidebar: cva([
        "UI-AppLayoutSidebar__root",
        "flex flex-grow flex-col overflow-y-auto border-r border-[--border] bg-[--paper]"
    ]),
})

export const AppLayoutContentAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutContent__root",
    ])
})

export const AppLayoutFooterAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-AppLayoutFooter__root",
    ])
})

/* -------------------------------------------------------------------------------------------------
 * AppLayout
 * -----------------------------------------------------------------------------------------------*/

export interface AppLayoutProps extends React.ComponentPropsWithRef<"div">,
    ComponentWithAnatomy<typeof AppLayoutAnatomy>,
    VariantProps<typeof AppLayoutAnatomy.root> {
}

const _AppLayout = (props: AppLayoutProps) => {

    const {
        children,
        rootClassName,
        className,
        ref,
        withSidebar,
        ...rest
    } = props

    return (
        <div
            className={cn(AppLayoutAnatomy.root({ withSidebar }), rootClassName, className)}
            {...rest}
            ref={ref}
        >
            {children}
        </div>
    )

}

_AppLayout.displayName = "AppLayout"

/* -------------------------------------------------------------------------------------------------
 * AppLayout.Header
 * -----------------------------------------------------------------------------------------------*/

export interface AppLayoutHeaderProps extends React.ComponentPropsWithRef<"header">, ComponentWithAnatomy<typeof AppLayoutHeaderAnatomy> {
}

const AppLayoutHeader: React.FC<AppLayoutHeaderProps> = React.forwardRef<HTMLElement, AppLayoutHeaderProps>((props, ref) => {

    const {
        children,
        rootClassName,
        className,
        ...rest
    } = props

    return (
        <header
            className={cn(AppLayoutHeaderAnatomy.root(), rootClassName, className)}
            {...rest}
            ref={ref}
        >
            {children}
        </header>
    )

})

AppLayoutHeader.displayName = "AppLayoutHeader"

/* -------------------------------------------------------------------------------------------------
 * AppLayout.Sidebar
 * -----------------------------------------------------------------------------------------------*/

export interface AppLayoutSidebarProps extends React.ComponentPropsWithRef<"aside">, ComponentWithAnatomy<typeof AppLayoutSidebarAnatomy> {
}

const AppLayoutSidebar: React.FC<AppLayoutSidebarProps> = React.forwardRef<HTMLElement, AppLayoutSidebarProps>((props, ref) => {

    const {
        children,
        rootClassName,
        sidebarClassName,
        className,
        ...rest
    } = props

    return (
        <aside
            className={cn(AppLayoutSidebarAnatomy.root(), rootClassName)}
            {...rest}
            ref={ref}
        >
            {/*<div*/}
            {/*    className={cn(AppLayoutSidebarAnatomy.sidebar(), sidebarClassName, className)}*/}
            {/*>*/}
            {children}
            {/*</div>*/}
        </aside>
    )

})

AppLayoutSidebar.displayName = "AppLayoutSidebar"

/* -------------------------------------------------------------------------------------------------
 * AppLayout.Content
 * -----------------------------------------------------------------------------------------------*/

export interface AppLayoutContentProps extends React.ComponentPropsWithRef<"main">, ComponentWithAnatomy<typeof AppLayoutContentAnatomy> {
}

const AppLayoutContent: React.FC<AppLayoutContentProps> = React.forwardRef<HTMLElement, AppLayoutContentProps>((props, ref) => {

    const {
        children,
        rootClassName,
        className,
        ...rest
    } = props

    return (
        <main
            className={cn(AppLayoutContentAnatomy.root(), rootClassName, className)}
            {...rest}
            ref={ref}
        >
            {children}
        </main>
    )

})

AppLayoutContent.displayName = "AppLayoutContent"

/* -------------------------------------------------------------------------------------------------
 * AppLayout.Footer
 * -----------------------------------------------------------------------------------------------*/

export interface AppLayoutFooterProps extends React.ComponentPropsWithRef<"footer">, ComponentWithAnatomy<typeof AppLayoutFooterAnatomy> {
}

const AppLayoutFooter: React.FC<AppLayoutFooterProps> = React.forwardRef<HTMLElement, AppLayoutFooterProps>((props, ref) => {

    const {
        children,
        rootClassName,
        className,
        ...rest
    } = props

    return (
        <footer
            className={cn(AppLayoutFooterAnatomy.root(), rootClassName, className)}
            {...rest}
            ref={ref}
        >
            {children}
        </footer>
    )

})

AppLayoutFooter.displayName = "AppLayoutFooter"

/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/

_AppLayout.Header = AppLayoutHeader
_AppLayout.Sidebar = AppLayoutSidebar
_AppLayout.Content = AppLayoutContent
_AppLayout.Footer = AppLayoutFooter

export const AppLayout = createPolymorphicComponent<"div", AppLayoutProps, {
    Header: typeof AppLayoutHeader
    Sidebar: typeof AppLayoutSidebar
    Content: typeof AppLayoutContent
    Footer: typeof AppLayoutFooter
}>(_AppLayout)

AppLayout.displayName = "AppLayout"

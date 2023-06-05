"use client"

import React, { useEffect, useState } from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "@/components/ui/core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import { Drawer } from "@/components/ui/modal"

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

const __AppSidebarContext = React.createContext<{ open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }>({
    open: false,
    setOpen: () => {
    }
})

const useAppSidebarContext = () => {
    return React.useContext(__AppSidebarContext)
}

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const AppSidebarAnatomy = defineStyleAnatomy({
    sidebar: cva([
        "UI-AppSidebar__sidebar",
        "flex flex-grow flex-col overflow-y-auto border-r border-[--border] bg-[--paper]"
    ])
})

export const AppSidebarTriggerAnatomy = defineStyleAnatomy({
    trigger: cva([
        "UI-AppSidebarTrigger__trigger",
        "block md:hidden"
    ])
})

/* -------------------------------------------------------------------------------------------------
 * AppSidebar
 * -----------------------------------------------------------------------------------------------*/

export interface AppSidebarProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof AppSidebarAnatomy> {
}

export const AppSidebar: React.FC<AppSidebarProps> = React.forwardRef<HTMLDivElement, AppSidebarProps>((props, ref) => {

    const {
        children,
        sidebarClassName,
        className,
        ...rest
    } = props

    const ctx = useAppSidebarContext()

    return (
        <>
            <div
                className={cn(AppSidebarAnatomy.sidebar(), sidebarClassName, className)}
                {...rest}
                ref={ref}
            >
                {children}
            </div>
            <Drawer
                isOpen={ctx.open}
                onClose={() => ctx.setOpen(false)}
                placement="left"
                isClosable
                className="md:hidden"
                containerClassName="w-[85%]"
                bodyClassName="p-0 md:p-0"
                headerClassName="absolute p-2 sm:p-2 md:p-2 lg:p-2 right-0"
            >
                {children}
            </Drawer>
        </>
    )

})

AppSidebar.displayName = "AppSidebar"

/* -------------------------------------------------------------------------------------------------
 * AppSidebarTrigger
 * -----------------------------------------------------------------------------------------------*/

export interface AppSidebarTriggerProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof AppSidebarTriggerAnatomy> {
}

export const AppSidebarTrigger: React.FC<AppSidebarTriggerProps> = React.forwardRef<HTMLDivElement, AppSidebarTriggerProps>((props, ref) => {

    const {
        children,
        triggerClassName,
        className,
        ...rest
    } = props

    const ctx = useAppSidebarContext()

    return (
        <div
            className={cn(AppSidebarTriggerAnatomy.trigger(), triggerClassName, className)}
            {...rest}
            onClick={() => ctx.setOpen(s => !s)}
            ref={ref}
        >
            Trigger
        </div>
    )

})

AppSidebarTrigger.displayName = "AppSidebarTrigger"


/* -------------------------------------------------------------------------------------------------
 * Provider
 * -----------------------------------------------------------------------------------------------*/

export const AppSidebarProvider: React.FC<{ children?: React.ReactNode, open?: boolean }> = ({ children, open: _open }) => {

    const [open, setOpen] = useState(_open ?? false)

    useEffect(() => {
        if (_open !== undefined)
            setOpen(_open)
    }, [_open])

    return (
        <__AppSidebarContext.Provider value={{ open, setOpen }}>
            {children}
        </__AppSidebarContext.Provider>
    )
}

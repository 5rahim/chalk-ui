"use client"

import { cva } from "class-variance-authority"
import * as React from "react"
import { Toaster as Sonner } from "sonner"
import { cn, defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const ToasterAnatomy = defineStyleAnatomy({
    toaster: cva(["group toaster"]),
    toast: cva([
        "group/toast",
        "group-[.toaster]:py-3",
        "group-[.toaster]:text-base group-[.toaster]:bg-[--paper] group-[.toaster]:text-[--foreground] group-[.toaster]:border-[--border] group-[.toaster]:shadow-lg",
        // Success
        // "group-[.toaster]:data-[type=success]:bg-green-50 group-[.toaster]:data-[type=success]:text-green-500",
        // "group-[.toaster]:data-[type=success]:border-green-100", // Subtle
        "group-[.toaster]:data-[type=success]:bg-green-500 group-[.toaster]:data-[type=success]:text-white group-[.toaster]:data-[type=success]:border-[--green]",
        // Warning
        // "group-[.toaster]:data-[type=warning]:bg-orange-50 group-[.toaster]:data-[type=warning]:text-orange-500",
        // "group-[.toaster]:data-[type=warning]:border-orange-200", // Subtle
        "group-[.toaster]:data-[type=warning]:bg-yellow-600 dark:group-[.toaster]:data-[type=warning]:bg-yellow-700 group-[.toaster]:data-[type=warning]:text-white group-[.toaster]:data-[type=warning]:border-[--yellow] dark:group-[.toaster]:data-[type=warning]:border-yellow-600",
        // Error
        // "group-[.toaster]:data-[type=error]:bg-red-50 group-[.toaster]:data-[type=error]:text-red-500",
        // "group-[.toaster]:data-[type=error]:border-red-200", // Subtle
        "group-[.toaster]:data-[type=error]:bg-red-500 group-[.toaster]:data-[type=error]:text-white group-[.toaster]:data-[type=error]:border-[--red]",
        // Info
        // "group-[.toaster]:data-[type=info]:bg-blue-50 group-[.toaster]:data-[type=info]:text-blue-500",
        // "group-[.toaster]:data-[type=info]:border-blue-200", // Subtle
        "group-[.toaster]:data-[type=info]:bg-blue-500 group-[.toaster]:data-[type=info]:text-white group-[.toaster]:data-[type=info]:border-[--blue]",
    ]),
    description: cva([
        "group/toast:text-sm group/toast:text-[--muted]",
        "group-data-[type=success]/toast:text-green-100",
        "group-data-[type=warning]/toast:text-yellow-100",
        "group-data-[type=error]/toast:text-red-100",
        "group-data-[type=info]/toast:text-blue-100",
    ]),
    actionButton: cva(["group/toast:bg-[--subtle] group/toast:text-[--foreground]"]),
    cancelButton: cva(["group/toast:bg-[--subtle] group/toast:text-[--muted]"]),
})

/* -------------------------------------------------------------------------------------------------
 * Toaster
 * -----------------------------------------------------------------------------------------------*/

export type ToasterProps = React.ComponentProps<typeof Sonner>

export const Toaster = ({ position = "top-center", ...props }: ToasterProps) => {

    return (
        <Sonner
            position={position}
            className={cn(ToasterAnatomy.toaster())}
            toastOptions={{
                classNames: {
                    toast: cn(ToasterAnatomy.toast()),
                    description: cn(ToasterAnatomy.description()),
                    actionButton: cn(ToasterAnatomy.actionButton()),
                    cancelButton: cn(ToasterAnatomy.cancelButton()),
                },
            }}
            {...props}
        />
    )
}

Toaster.displayName = "Toaster"
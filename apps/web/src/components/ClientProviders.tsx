"use client"

import React from "react"
import { UIProvider } from "@/components/ui/core"
import { ThemeProvider } from "next-themes"
import { ToastProvider } from "@/components/ui/toast"

interface ClientProvidersProps {
    children?: React.ReactNode
}

export const ClientProviders: React.FC<ClientProvidersProps> = (props) => {

    const { children, ...rest } = props

    return (
        <ThemeProvider attribute={"class"}>
            <UIProvider>
                {children}
                <ToastProvider/>
            </UIProvider>
        </ThemeProvider>
    )

}

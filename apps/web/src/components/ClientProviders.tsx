"use client"

import React from "react"
import { UIProvider } from "@/components/ui/core"
import { ThemeProvider } from "next-themes"

interface ClientProvidersProps {
    children?: React.ReactNode
}

export const ClientProviders: React.FC<ClientProvidersProps> = (props) => {

    const { children, ...rest } = props

    return (
        <ThemeProvider attribute={"class"}>
            <UIProvider>
                {children}
            </UIProvider>
        </ThemeProvider>
    )

}

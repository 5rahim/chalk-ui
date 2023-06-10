"use client"

import React from "react"
import { UIProvider } from "@/components/ui/core"
import { ThemeProvider } from "next-themes"
import { ToastProvider } from "@/components/ui/toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface ClientProvidersProps {
    children?: React.ReactNode
}

const queryClient = new QueryClient()

export const ClientProviders: React.FC<ClientProvidersProps> = (props) => {

    const { children, ...rest } = props

    return (
        <ThemeProvider attribute={"class"}>
            <UIProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
                <ToastProvider/>
            </UIProvider>
        </ThemeProvider>
    )

}

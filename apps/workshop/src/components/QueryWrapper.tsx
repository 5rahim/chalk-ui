import React from "react"
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query"

const client = new QueryClient()

export const QueryWrapper = ({ children }: { children: React.ReactNode }) => {

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )

}

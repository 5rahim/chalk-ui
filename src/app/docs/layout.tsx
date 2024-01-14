"use client"
import { ModeToggle } from "@/components/client-providers"
import { AppLayout, AppLayoutHeader, AppLayoutSidebar, AppSidebar, AppSidebarProvider, AppSidebarTrigger } from "@/workshop/app-layout"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppSidebarProvider>
            <AppLayout withSidebar sidebarSize={"md"}>
                <AppLayoutSidebar>
                    <AppSidebar className="p-4">
                        <div className="flex flex-col items-center justify-center gap-2">
                            {<img src="/images/logo.png" className="size-16 w-auto" />}
                            <div className="font-bold text-2xl mb-4">Chalk UI</div>
                        </div>
                    </AppSidebar>
                </AppLayoutSidebar>
                <AppLayout>
                    <AppLayoutHeader className="w-full h-16 border-b flex items-center justify-between px-4">
                        <div className="">
                            <AppSidebarTrigger />
                        </div>
                        <ModeToggle />
                    </AppLayoutHeader>
                    {children}
                </AppLayout>
            </AppLayout>
        </AppSidebarProvider>
    )
}

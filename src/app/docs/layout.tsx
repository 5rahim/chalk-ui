"use client"
import { ModeToggle } from "@/components/client-providers"
import { DocsVerticalMenu } from "@/components/docs-vertical-menu"
import { AppLayout, AppLayoutHeader, AppLayoutSidebar, AppSidebar, AppSidebarProvider, AppSidebarTrigger } from "@/workshop/app-layout"
import { Separator } from "@/workshop/separator"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppSidebarProvider>
            <AppLayout withSidebar sidebarSize={"md"}>
                <AppLayoutSidebar>
                    <AppSidebar className="p-4 space-y-4">
                        <div className="flex flex-col items-center justify-center gap-2">
                            {<img src="/images/logo.png" className="size-16 w-auto" />}
                            <div className="font-bold text-2xl ">Chalk UI</div>
                        </div>
                        <div>
                            <h6 className="pb-2 text-[--muted]">Components</h6>
                            <DocsVerticalMenu />
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

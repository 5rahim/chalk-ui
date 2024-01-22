import {
    AppLayout,
    AppLayoutContent,
    AppLayoutFooter,
    AppLayoutHeader,
    AppLayoutSidebar,
    AppSidebar,
    AppSidebarProvider, AppSidebarTrigger,
} from "@/workshop/app-layout"
import { Avatar } from "@/workshop/avatar"
import { DropdownMenu, DropdownMenuItem } from "@/workshop/dropdown-menu"
import * as React from "react"

export default function AppLayoutDemo() {
    return (
        <AppSidebarProvider>
            <AppLayout withSidebar className="bg-indigo-50 dark:bg-gray-600">
                <AppLayoutSidebar className="lg:absolute h-full">
                    <AppSidebar className="bg-red-50 dark:bg-gray-900 p-4 mt-4 mb-4 lg:mt-10 lg:mb-10">
                        <div className="font-bold text-2xl mb-4">Dashboard</div>
                    </AppSidebar>
                </AppLayoutSidebar>
                <AppLayout>
                    <AppLayoutHeader>
                        <div className="w-full h-[60px] border-b bg-brand-50 dark:bg-gray-800">
                            <div className="flex h-full w-full justify-between items-center px-4">
                                <div className="flex items-center gap-2">
                                    <AppSidebarTrigger />
                                    <div className="text-lg font-bold">Logo</div>
                                </div>
                                <DropdownMenu
                                    trigger={<div className="flex items-center gap-2 cursor-pointer">
                                        <Avatar size="xs" />
                                        <p className="text-sm">5rahim</p>
                                    </div>}
                                >
                                    <DropdownMenuItem>My account</DropdownMenuItem>
                                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                                </DropdownMenu>
                            </div>
                        </div>
                    </AppLayoutHeader>
                    <AppLayoutContent className="p-5 h-64">
                        <div className="bg-[--background] w-full h-full" />
                    </AppLayoutContent>
                    <AppLayoutFooter className="bg-green-50 dark:bg-gray-800 text-center text-sm font-medium text-[--muted] py-4">
                        Chalk UI
                    </AppLayoutFooter>
                </AppLayout>
            </AppLayout>
        </AppSidebarProvider>
    )
}

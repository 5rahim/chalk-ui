import { DashboardHeader } from "@/app/examples/dashboard/components/dashboard-header"
import { DashboardSidebar } from "@/app/examples/dashboard/components/dashboard-sidebar"
import { AppLayout, AppLayoutContent, AppLayoutFooter, AppLayoutHeader, AppLayoutSidebar, AppSidebarProvider } from "@/workshop/app-layout"
import * as React from "react"

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppSidebarProvider>
            <AppLayout withSidebar sidebarSize={"md"}>
                <AppLayoutSidebar className="lg:absolute"> {/*Remove `lg:absolute`*/}
                    <DashboardSidebar /> {/*Custom*/}
                </AppLayoutSidebar>
                <AppLayout>
                    <AppLayoutHeader>
                        <DashboardHeader /> {/*Custom*/}
                    </AppLayoutHeader>
                    <AppLayoutContent>
                        {children}
                    </AppLayoutContent>
                    <AppLayoutFooter className="text-center font-medium text-[--muted] pb-10">
                        &copy; 2024
                    </AppLayoutFooter>
                </AppLayout>
            </AppLayout>
        </AppSidebarProvider>
    )
}

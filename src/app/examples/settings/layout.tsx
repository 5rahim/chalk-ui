import { Navbar } from "@/app/examples/settings/components/navbar"
import { AppLayout, AppLayoutContent, AppLayoutFooter, AppLayoutHeader } from "@/workshop/app-layout"
import * as React from "react"

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <AppLayout>
            <AppLayoutHeader>
                <Navbar />
            </AppLayoutHeader>
            <AppLayoutContent>
                {children}
            </AppLayoutContent>
            <AppLayoutFooter className="text-center font-medium text-[--muted] pb-10">
                &copy; 2024
            </AppLayoutFooter>
        </AppLayout>
    )
}

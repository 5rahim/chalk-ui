import React from "react"
import { AppLayout, AppSidebarTrigger } from "@/components/ui/app-layout"
import DarkModeToggle from "@/components/DarkModeToggle"
import { Badge } from "@/components/ui/badge"
import { ComponentPages } from "@/app/(docs)/ComponentPages"
import { VerticalNav } from "@/components/ui/vertical-nav"

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <AppLayout>

            <AppLayout.Header>
                <div className={"w-full h-16 border-b border-[--border] flex items-center bg-[--paper] px-2"}>
                    <div className={"container max-w-8xl"}>
                        <AppSidebarTrigger/>
                        <div className={"flex items-center gap-2"}>
                            <span className={"font-bold tracking-tight text-lg"}>chalk.rahim.app</span>
                            <Badge>UI</Badge>
                        </div>
                    </div>
                </div>
            </AppLayout.Header>

            <AppLayout.Content>
                <div
                    className={"container max-w-8xl flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"}>
                    <aside
                        className={"fixed top-14 z-30 pr-4 pt-4 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-[--border] md:sticky md:block"}>
                        <h6 className={"mb-2"}>Getting started</h6>
                        <h6 className={"mb-2"}>Components</h6>
                        <VerticalNav
                            itemClassName={"data-[current=true]:bg-brand-50 dark:data-[current=true]:bg-[--highlight]"}
                            items={[
                                { name: "Accordion", isCurrent: false },
                                { name: "Alert", isCurrent: true },
                            ]}
                        />
                    </aside>
                    <main className={"relative py-6"}>
                        <ComponentPages selectedComponent={"alert"}/>
                        {/*{children}*/}
                    </main>
                </div>
            </AppLayout.Content>

            <DarkModeToggle/>

        </AppLayout>
    )
}

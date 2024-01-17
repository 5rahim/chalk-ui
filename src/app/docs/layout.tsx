"use client"
import { ModeToggle } from "@/components/client-providers"
import { DocsVerticalMenu } from "@/components/docs-vertical-menu"
import {
    AppLayout,
    AppLayoutContent,
    AppLayoutHeader,
    AppLayoutSidebar,
    AppSidebar,
    AppSidebarProvider,
    AppSidebarTrigger,
} from "@/workshop/app-layout"
import { Button, IconButton } from "@/workshop/button"
import { ScrollArea } from "@/workshop/scroll-area"
import Link from "next/link"
import React from "react"
import { BiHomeAlt, BiLogoGithub, BiSolidStar, BiStar } from "react-icons/bi"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppSidebarProvider>
            <AppLayout withSidebar sidebarSize={"md"}>
                <AppLayoutSidebar className="mt-16">
                    <AppSidebar>
                        <div className="flex flex-col items-center justify-center gap-2 pb-4 lg:py-4">
                            <img src="/images/logo.png" className="size-16 w-auto" />
                            <div className="font-bold text-2xl ">Chalk UI</div>
                        </div>
                        <ScrollArea className="h-[calc(100vh-150px)] lg:h-dvh p-4">
                            <div>
                                <DocsVerticalMenu />
                            </div>
                        </ScrollArea>
                    </AppSidebar>
                </AppLayoutSidebar>
                <AppLayout>
                    <AppLayoutHeader className="fixed top-0 w-full right-0 h-16 border-b flex items-center justify-between px-4 bg-[--background] backdrop-blur z-[50] max-w-full overflow-x-auto">
                        <div className="flex items-center gap-2">
                            <AppSidebarTrigger />
                            <Link href="/">
                                <IconButton
                                    intent="gray-basic"
                                    icon={<BiHomeAlt className="text-md" />}
                                    size="sm"
                                />
                            </Link>
                            <Link
                                href="https://github.com/5rahim/chalk-ui"
                                target="_blank"
                                referrerPolicy="no-referrer"
                            >
                                <Button
                                    intent="gray-basic"
                                    leftIcon={<BiSolidStar className="text-[--yellow]" />}
                                    size="sm"
                                >5rahim/chalk-ui</Button>
                            </Link>
                            <Link
                                href="https://rahim.app"
                                target="_blank"
                                referrerPolicy="no-referrer"
                            >
                                <Button
                                    intent="gray-basic"
                                    leftIcon={<BiLogoGithub />}
                                    size="sm"
                                >rahim.app</Button>
                            </Link>
                        </div>
                        <ModeToggle />
                    </AppLayoutHeader>
                    <AppLayoutContent className="pt-16">
                        {children}
                    </AppLayoutContent>
                </AppLayout>
            </AppLayout>
        </AppSidebarProvider>
    )
}

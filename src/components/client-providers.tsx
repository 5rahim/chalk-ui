"use client"
import { Button, IconButton } from "@/workshop/button"
import { DropdownMenu, DropdownMenuItem } from "@/workshop/dropdown-menu"
import { MoonIcon, SunIcon } from "lucide-react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import React from "react"


export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
        </NextThemesProvider>
    )
}

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu
            trigger={<IconButton
                intent="gray-basic"
                icon={<>
                    <SunIcon className="size-[1.2rem]] scale-100 transition-all dark:scale-0" />
                    <MoonIcon className="absolute size-[1.2rem] scale-0 transition-all dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </>}
            />}
        >
            <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
                System
            </DropdownMenuItem>
        </DropdownMenu>
    )
}

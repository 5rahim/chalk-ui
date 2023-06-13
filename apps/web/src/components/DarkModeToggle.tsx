"use client"

import { useTheme } from "next-themes"
import React from "react"
import { Switch } from "@/components/ui/switch"

interface DarkModeToggleProps {
    children?: React.ReactNode
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = (props) => {

    const { children, ...rest } = props

    const { theme, setTheme } = useTheme()

    return (
        <>
            <div className={"fixed bottom-0 right-0"}>
                <Switch checked={theme === "dark"} onChange={(v) => setTheme(v ? "dark" : "light")}/>
            </div>
        </>
    )

}

export default DarkModeToggle

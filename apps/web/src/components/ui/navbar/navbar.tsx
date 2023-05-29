"use client"

import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "@/components/ui/core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const NavbarAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Navbar__root",
    ])
})

/* -------------------------------------------------------------------------------------------------
 * Navbar
 * -----------------------------------------------------------------------------------------------*/

export interface NavbarProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof NavbarAnatomy> {
    children?: React.ReactNode
}

export const Navbar: React.FC<NavbarProps> = React.forwardRef<HTMLDivElement, NavbarProps>((props, ref) => {

    const {
        children,
        rootClassName,
        className,
        ...rest
    } = props

    return (
        <div
            className={cn(NavbarAnatomy.root(), rootClassName, className)}
            {...rest}
            ref={ref}
        >
            Navbar
        </div>
    )

})

Navbar.displayName = "Navbar"

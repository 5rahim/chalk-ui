import { cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "../core/classnames"
import { defineStyleAnatomy } from "../core/styling"
import { LoadingSpinner } from "./loading-spinner"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const LoadingOverlayAnatomy = defineStyleAnatomy({
    overlay: cva([
        "UI-LoadingOverlay__overlay",
        "absolute bg-[--background] dark:bg-[rgba(0,0,0,0.3)] bg-opacity-70 w-full h-full z-10 inset-0 pt-4 flex flex-col items-center justify-center backdrop-blur-sm",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * LoadingOverlay
 * -----------------------------------------------------------------------------------------------*/

interface LoadingOverlayProps {
    children?: React.ReactNode
    hideSpinner?: boolean
    show?: boolean
}

export const LoadingOverlay: React.FC<LoadingOverlayProps & React.ComponentPropsWithoutRef<"div">> = (props) => {

    const { children, show = true, className, hideSpinner = false, ...rest } = props

    if (!show) return null

    return (
        <div className={cn(LoadingOverlayAnatomy.overlay(), className)} {...rest}>
            {!hideSpinner && <LoadingSpinner className="justify-auto" />}
            {children}
        </div>
    )

}

LoadingOverlay.displayName = "LoadingOverlay"

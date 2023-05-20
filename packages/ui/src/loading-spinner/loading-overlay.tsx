import { cn } from "@rahimstack/tailwind-utils"
import { cva } from "class-variance-authority"
import React from "react"
import { defineStyleAnatomy, useStyleLibrary } from "../core"
import { LoadingSpinner } from "./loading-spinner"

export const LoadingOverlayAnatomy = defineStyleAnatomy({
   overlay: cva("UI-LoadingOverlay__overlay absolute bg-white dark:bg-gray-900 bg-opacity-70 w-full h-full z-10 inset-0 pt-4 flex items-center justify-center backdrop-blur-sm"),
})

interface LoadingOverlayProps {
   children?: React.ReactNode
   show?: boolean
}

export const LoadingOverlay: React.FC<LoadingOverlayProps & React.ComponentPropsWithoutRef<"div">> = (props) => {
   
   const { children, show = true, className, ...rest } = props
   
   const StyleLibrary = useStyleLibrary()
   
   if (!show) return null
   
   return (
      <>
         <div className={cn(StyleLibrary.LoadingOverlay.overlay(), className)} {...rest}>
            <LoadingSpinner className="justify-auto" />
         </div>
      </>
   )
   
}

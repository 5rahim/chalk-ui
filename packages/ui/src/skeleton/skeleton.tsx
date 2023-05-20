import { cn } from "@rahimstack/tailwind-utils"
import { cva, VariantProps } from "class-variance-authority"
import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy, useStyleLibrary } from "../core"

export const SkeletonAnatomy = defineStyleAnatomy({
   skeleton: cva("UI-Skeleton__skeleton", {
      variants: {
         type: {
            box: "h-14 bg-gray-200 w-full rounded-md animate-pulse",
            text: "h-2 bg-gray-100 rounded-md animate-purple",
         },
      },
      defaultVariants: {},
   }),
})


export interface SkeletonProps extends React.ComponentPropsWithRef<"div">, VariantProps<typeof SkeletonAnatomy.skeleton>,
   ComponentWithAnatomy<typeof SkeletonAnatomy> {
   type?: "box" | "text"
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
   
   const {
      children,
      className,
      type = "box",
      skeletonClassName,
      ...rest
   } = props
   
   const StyleLibrary = useStyleLibrary()
   
   if (type === "text") {
      return (
         <>
            <div className="flex flex-col gap-3">
               <div className={cn("w-full", StyleLibrary.Skeleton.skeleton({ type }), skeletonClassName, className)} {...rest} ref={ref}></div>
               <div className={cn("w-full", StyleLibrary.Skeleton.skeleton({ type }), skeletonClassName, className)} {...rest} ref={ref}></div>
               <div className={cn("w-full", StyleLibrary.Skeleton.skeleton({ type }), skeletonClassName, className)} {...rest} ref={ref}></div>
               <div className={cn("w-[98%]", StyleLibrary.Skeleton.skeleton({ type }), skeletonClassName, className)} {...rest} ref={ref}></div>
               <div className={cn("w-[95%]", StyleLibrary.Skeleton.skeleton({ type }), skeletonClassName, className)} {...rest} ref={ref}></div>
               <div className={cn("w-[90%]", StyleLibrary.Skeleton.skeleton({ type }), skeletonClassName, className)} {...rest} ref={ref}></div>
            </div>
         </>
      )
   }
   
   return (
      <>
         <div
            className={cn(
               StyleLibrary.Skeleton.skeleton({ type }),
               skeletonClassName,
               className,
            )}
            {...rest}
            ref={ref}
         ></div>
      </>
   )
   
})

Skeleton.displayName = "Skeleton"

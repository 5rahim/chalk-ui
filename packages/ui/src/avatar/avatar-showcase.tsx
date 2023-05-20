import { cn } from "@rahimstack/tailwind-utils"
import { cva } from "class-variance-authority"
import React from "react"
import { AvatarProps, defineStyleAnatomy } from ".."
import { ComponentWithAnatomy, useStyleLibrary } from "../core"


export const AvatarShowcaseAnatomy = defineStyleAnatomy({
   container: cva("UI-AvatarShowcase__container flex items-center"),
   name: cva("UI-AvatarShowcase__name font-semibold text-gray-900 dark:text-gray-200"),
   description: cva("UI-AvatarShowcase__description block text-sm text-gray-500 dark:text-gray-400"),
   detailsContainer: cva("UI-AvatarShowcase__detailsContainer ml-3"),
})


export interface AvatarShowcaseProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof AvatarShowcaseAnatomy> {
   avatar: React.ReactElement<AvatarProps, string | React.JSXElementConstructor<AvatarProps>> | undefined,
   name: string
   description?: string
}

export const AvatarShowcase = React.forwardRef<HTMLDivElement, AvatarShowcaseProps>((props, ref) => {
   
   const {
      children,
      className,
      avatar,
      name,
      description,
      nameClassName,
      descriptionClassName,
      detailsContainerClassName,
      containerClassName,
      ...rest
   } = props
   
   const StyleLibrary = useStyleLibrary()
   
   return (
      <>
         <div
            className={cn(
               StyleLibrary.AvatarShowcase.container(),
               containerClassName,
               className,
            )}
            {...rest}
            ref={ref}
         >
            {avatar}
            <div className={cn(StyleLibrary.AvatarShowcase.detailsContainer(), detailsContainerClassName)}>
               <h1 className={cn(StyleLibrary.AvatarShowcase.name(), nameClassName)}>{name}</h1>
               {!!description && <span className={cn(StyleLibrary.AvatarShowcase.description(), descriptionClassName)}>{description}</span>}
            </div>
         </div>
      </>
   )
   
})

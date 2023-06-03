import { cn } from "@rahimstack/tailwind-utils"
import { cva } from "class-variance-authority"
import React from "react"
import { AvatarProps } from "."
import { ComponentWithAnatomy, defineStyleAnatomy } from "../core"

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
   
   return (
      <>
         <div
            className={cn(
               AvatarShowcaseAnatomy.container(),
               containerClassName,
               className,
            )}
            {...rest}
            ref={ref}
         >
            {avatar}
            <div className={cn(AvatarShowcaseAnatomy.detailsContainer(), detailsContainerClassName)}>
               <h1 className={cn(AvatarShowcaseAnatomy.name(), nameClassName)}>{name}</h1>
               {!!description && <span className={cn(AvatarShowcaseAnatomy.description(), descriptionClassName)}>{description}</span>}
            </div>
         </div>
      </>
   )
   
})
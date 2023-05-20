import { cn } from "@rahimstack/tailwind-utils"
import { cva, VariantProps } from "class-variance-authority"
import React, { CSSProperties } from "react"
import { ComponentWithAnatomy, defineStyleAnatomy, useStyleLibrary } from "../core"

export const BadgeAnatomy = defineStyleAnatomy({
   badge: cva("UI-Badge__badge inline-flex text-base w-[fit-content] overflow-hidden justify-center items-center gap-2", {
      variants: {
         intent: {
            gray: "text-gray-800 bg-gray-100 __UI_DARK__ dark:text-gray-300 dark:bg-opacity-10",
            primary: "text-brand-500 bg-brand-50 __UI_DARK__ dark:text-brand-300 dark:bg-opacity-10",
            success: "text-green-500 bg-green-50 __UI_DARK__ dark:text-green-300 dark:bg-opacity-10",
            warning: "text-orange-500 bg-orange-50 __UI_DARK__ dark:text-orange-300 dark:bg-opacity-10",
            alert: "text-red-500 bg-red-50 __UI_DARK__ dark:text-red-300 dark:bg-opacity-10",
            blue: "text-blue-500 bg-blue-50 __UI_DARK__ dark:text-blue-300 dark:bg-opacity-10",
            white: "text-white bg-gray-800 __UI_DARK__ dark:text-white dark:bg-opacity-10",
            "basic": "text-gray-900 bg-transparent",
            "primary-solid": "text-white bg-brand-500",
            "success-solid": "text-white bg-green-500",
            "warning-solid": "text-white bg-orange-500",
            "alert-solid": "text-white bg-red-500",
            "blue-solid": "text-white bg-blue-500",
            "gray-solid": "text-white bg-gray-500",
            "white-solid": "text-gray-900 bg-white",
         },
         size: {
            sm: "h-4 px-2  text-xs",
            md: "h-6 px-3 text-xs",
            lg: "h-7 px-3 text-md",
            xl: "h-8 px-4 text-lg",
         },
         tag: {
            false: "font-bold tracking-wide rounded-full uppercase",
            true: "font-semibold rounded-md",
         },
      },
      defaultVariants: {
         intent: "primary",
         size: "md",
      },
   }),
   closeButton: cva("UI-Badge__close-button text-lg -mr-1 cursor-pointer transition ease-in hover:opacity-60"),
   icon: cva("UI-Badge__icon inline-flex self-center flex-shrink-0"),
})

export interface BadgeProps extends React.ComponentPropsWithRef<"span">, VariantProps<typeof BadgeAnatomy.badge>,
   ComponentWithAnatomy<typeof BadgeAnatomy> {
   tag?: boolean,
   isClosable?: boolean,
   onClose?: () => void,
   leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
   rightIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
   iconSpacing?: CSSProperties["marginRight"]
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
   
   const {
      children,
      className,
      size,
      intent,
      tag = false,
      isClosable,
      onClose,
      leftIcon,
      rightIcon,
      iconSpacing = "0",
      badgeClassName,
      closeButtonClassName,
      iconClassName,
      ...rest
   } = props
   
   const StyleLibrary = useStyleLibrary()
   
   return (
      <>
         <span
            className={cn(
               StyleLibrary.Badge.badge({ size, intent, tag }),
               badgeClassName,
               className,
            )}
            {...rest}
            ref={ref}
         >
            {leftIcon && <span className={cn(StyleLibrary.Badge.icon(), iconClassName)} style={{ marginRight: iconSpacing }}>{leftIcon}</span>}
            
            {children}
            
            {rightIcon && <span className={cn(StyleLibrary.Badge.icon(), iconClassName)} style={{ marginLeft: iconSpacing }}>{rightIcon}</span>}
            
            {isClosable && <span className={cn(StyleLibrary.Badge.closeButton(), closeButtonClassName)} onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                </svg>
            </span>}
         </span>
      </>
   )
   
})

Badge.displayName = "Badge"

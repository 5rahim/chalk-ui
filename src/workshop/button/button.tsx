import { cva, VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const ButtonAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Button_root",
        "shadow-sm whitespace-nowrap font-semibold rounded-[--radius]",
        "inline-flex items-center text-white transition ease-in duration-100 text-center text-base justify-center",
        "focus-visible:outline-none focus-visible:ring-2 ring-offset-1 focus-visible:ring-[--ring]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
    ], {
        variants: {
            intent: {
                "primary": "bg-brand-500 hover:bg-brand-600 active:bg-brand-700 border border-transparent",
                "primary-outline": "text-brand-500 border border-brand-500 bg-transparent hover:bg-brand-500 active:bg-brand-600 active:border-transparent hover:text-white dark:text-brand-300 dark:hover:border-brand-500 dark:active:bg-brand-600 dark:border-brand-200 dark:hover:text-white dark:active:border-transparent dark:active:text-white",
                "primary-subtle": "text-brand-600 border border-brand-500 bg-brand-50 border-transparent hover:bg-brand-100 active:bg-brand-200 dark:text-brand-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "primary-link": "shadow-none text-brand-500 border border-transparent bg-transparent hover:underline active:text-brand-700 dark:text-brand-300 dark:active:text-brand-400",
                "primary-basic": "shadow-none text-brand-500 border border-transparent bg-transparent hover:bg-brand-100 active:bg-brand-200 dark:text-brand-300 dark:hover:bg-opacity-10 dark:active:text-brand-200",

                "warning": "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 border border-transparent",
                "warning-outline": "text-orange-500 border border-orange-500 bg-transparent hover:bg-orange-500 active:bg-orange-600 active:border-transparent hover:text-white dark:text-orange-300 dark:hover:border-orange-500 dark:active:bg-orange-600 dark:border-orange-200 dark:hover:text-white dark:active:border-transparent dark:active:text-white",
                "warning-subtle": "text-orange-600 border border-orange-500 bg-orange-50 border-transparent hover:bg-orange-100 active:bg-orange-200 dark:text-orange-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "warning-link": "shadow-none text-orange-500 border border-transparent bg-transparent hover:underline active:text-orange-700 dark:text-orange-300 dark:active:text-orange-400",
                "warning-basic": "shadow-none text-orange-500 border border-transparent bg-transparent hover:bg-orange-100 active:bg-orange-200 dark:text-orange-300 dark:hover:bg-opacity-10 dark:active:text-orange-200",

                "success": "bg-green-500 hover:bg-green-600 active:bg-green-700 border border-transparent",
                "success-outline": "text-green-500 border border-green-500 bg-transparent hover:bg-green-500 active:bg-green-600 active:border-transparent hover:text-white dark:text-green-300 dark:hover:border-green-500 dark:active:bg-green-600 dark:border-green-200 dark:hover:text-white dark:active:border-transparent dark:active:text-white",
                "success-subtle": "text-green-600 border border-green-500 bg-green-50 border-transparent hover:bg-green-100 active:bg-green-200 dark:text-green-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "success-link": "shadow-none text-green-500 border border-transparent bg-transparent hover:underline active:text-green-700 dark:text-green-300 dark:active:text-green-400",
                "success-basic": "shadow-none text-green-500 border border-transparent bg-transparent hover:bg-green-100 active:bg-green-200 dark:text-green-300 dark:hover:bg-opacity-10 dark:active:text-green-200",

                "alert": "bg-red-500 hover:bg-red-600 active:bg-red-700 border border-transparent",
                "alert-outline": "text-red-500 border border-red-500 bg-transparent hover:bg-red-500 active:bg-red-600 active:border-transparent hover:text-white dark:text-red-300 dark:hover:border-red-500 dark:active:bg-red-600 dark:border-red-200 dark:hover:text-white dark:active:border-transparent dark:active:text-white",
                "alert-subtle": "text-red-600 border border-red-500 bg-red-50 border-transparent hover:bg-red-100 active:bg-red-200 dark:text-red-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "alert-link": "shadow-none text-red-500 border border-transparent bg-transparent hover:underline active:text-red-700 dark:text-red-300 dark:active:text-red-400",
                "alert-basic": "shadow-none text-red-500 border border-transparent bg-transparent hover:bg-red-100 active:bg-red-200 dark:text-red-300 dark:hover:bg-opacity-10 dark:active:text-red-200",

                "gray": "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 border border-transparent",
                "gray-outline": "text-gray-600 border border-gray-300 bg-transparent hover:bg-gray-500 hover:border-transparent active:border-transparent hover:text-white active:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-500 dark:active:bg-gray-600 dark:active:border-transparent dark:hover:text-gray-100",
                "gray-subtle": "text-gray-600 border border-gray-500 bg-gray-100 border-transparent hover:bg-gray-200 active:bg-gray-300 dark:text-gray-300 dark:bg-opacity-10 dark:hover:bg-opacity-20",
                "gray-link": "shadow-none text-gray-500 border border-transparent bg-transparent hover:underline active:text-gray-700 dark:text-gray-300 dark:active:text-gray-400",
                "gray-basic": "shadow-none text-gray-500 border border-transparent bg-transparent hover:bg-gray-100 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-opacity-10 dark:active:text-gray-200",

                "white": "text-black bg-white hover:bg-gray-200 active:bg-gray-300 border border-transparent",
                "white-outline": "text-white border border-gray-200 bg-transparent hover:bg-white hover:text-black active:bg-gray-100 active:text-black",
                "white-subtle": "text-white bg-white bg-opacity-15 hover:bg-opacity-20 border border-transparent active:bg-opacity-25",
                "white-link": "shadow-none text-white border border-transparent bg-transparent hover:underline active:text-gray-200",
                "white-basic": "shadow-none text-white border border-transparent bg-transparent hover:bg-white hover:bg-opacity-15 active:bg-opacity-20 active:text-white-300",
            },
            rounded: {
                true: "rounded-full",
                false: null,
            },
            contentWidth: {
                true: "w-fit",
                false: null,
            },
            size: {
                xs: "text-sm h-6 px-2",
                sm: "text-sm h-8 px-3",
                md: "h-10 px-4",
                lg: "h-12 px-6",
                xl: "text-2xl h-14 px-8",
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "md",
        },
    }),
    icon: cva([
        "UI-Button__icon",
        "inline-flex self-center flex-shrink-0",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

type ButtonAnatomyProps =
    Omit<VariantProps<typeof ButtonAnatomy.root>, "isDisabled"> &
    Omit<ComponentAnatomy<typeof ButtonAnatomy>, "rootClass">

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button">, ButtonAnatomyProps {
    loading?: boolean,
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    iconSpacing?: React.CSSProperties["marginInline"],
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {

    const {
        children,
        size,
        className,
        rounded = false,
        contentWidth = false,
        intent,
        leftIcon,
        rightIcon,
        iconSpacing = "0.5rem",
        loading,
        iconClass,
        disabled,
        ...rest
    } = props

    return (
        <button
            type="button"
            className={cn(
                ButtonAnatomy.root({
                    size,
                    intent,
                    rounded,
                    contentWidth,
                }),
                className,
            )}
            disabled={disabled || loading}
            aria-disabled={disabled}
            {...rest}
            ref={ref}
        >
            {loading ? (
                <>
                    <svg
                        width="15"
                        height="15"
                        fill="currentColor"
                        className="animate-spin"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginInlineEnd: iconSpacing }}
                    >
                        <path
                            d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
                        >
                        </path>
                    </svg>
                    {children}
                </>
            ) : <>
                {leftIcon &&
                    <span
                        className={cn(ButtonAnatomy.icon(), iconClass)}
                        style={{ marginInlineEnd: iconSpacing }}
                    >
                        {leftIcon}
                    </span>}
                {children}
                {rightIcon &&
                    <span
                        className={cn(ButtonAnatomy.icon(), iconClass)}
                        style={{ marginInlineStart: iconSpacing }}
                    >
                        {rightIcon}
                    </span>}
            </>}
        </button>
    )

})

Button.displayName = "Button"

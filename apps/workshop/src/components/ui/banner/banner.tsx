"use client"

import React from "react"
import { cn, ComponentWithAnatomy, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"
import { ShowOnly } from "../show-only"
import { CloseButton, CloseButtonProps } from "../button"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const BannerAnatomy = defineStyleAnatomy({
    banner: cva([
        "UI-Banner__banner",
        "bg-brand",
        "h-14"
    ]),
    container: cva([
        "UI-Banner__container",
        "container max-w-4xl h-full px-4 flex items-center justify-between text-white md:px-8 text-sm sm:text-base"
    ])
})

/* -------------------------------------------------------------------------------------------------
 * Banner
 * -----------------------------------------------------------------------------------------------*/

export interface BannerProps extends React.ComponentPropsWithRef<"div">, ComponentWithAnatomy<typeof BannerAnatomy> {
    isClosable?: boolean
    onClose?: () => void
    /**
     * @default {intent: "white-outline"}
     */
    closeButtonProps?: CloseButtonProps
}

export const Banner: React.FC<BannerProps> = React.forwardRef<HTMLDivElement, BannerProps>((props, ref) => {

    const {
        children,
        bannerClassName,
        containerClassName,
        className,
        isClosable = true,
        onClose,
        closeButtonProps,
        ...rest
    } = props

    return (
        <div
            className={cn(BannerAnatomy.banner(), bannerClassName, className)}
            {...rest}
            ref={ref}
        >
            <div className={cn(BannerAnatomy.container(), containerClassName)}>
                {children}
                <ShowOnly when={isClosable}>
                    <CloseButton
                        intent="white-outline"
                        onClick={onClose}
                        {...closeButtonProps}
                    />
                </ShowOnly>
            </div>
        </div>
    )

})

Banner.displayName = "Banner"

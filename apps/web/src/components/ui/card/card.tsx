"use client"

import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "@/components/ui/core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import { Paper, PaperProps } from "@/components/ui/paper"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const CardAnatomy = defineStyleAnatomy({
    card: cva([
        "UI-Paper__card",
    ]),
    header: cva([
        "UI-Paper__header",
        "p-4"
    ]),
    footer: cva([
        "UI-Paper__footer",
        "p-4"
    ]),
    body: cva([
        "UI-Paper__footer",
        "p-4"
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/

export interface CardProps extends PaperProps, ComponentWithAnatomy<typeof CardAnatomy> {
    header?: React.ReactNode
    footer?: React.ReactNode
}

export const Card: React.FC<CardProps> = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {

    const {
        children,
        cardClassName,
        headerClassName,
        footerClassName,
        bodyClassName,
        paperClassName,
        className,
        header,
        footer,
        ...rest
    } = props

    return (
        <Paper
            className={cn(paperClassName, cardClassName)}
        >
            {header && <div className={cn(CardAnatomy.header(), headerClassName)}>
                {header}
            </div>}
            <div className={cn(CardAnatomy.body(), bodyClassName)}>
                {children}
            </div>
            {footer && <div className={cn(CardAnatomy.footer(), footerClassName)}>
                {footer}
            </div>}
        </Paper>
    )

})

Card.displayName = "Card"

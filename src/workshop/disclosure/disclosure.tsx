"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DisclosureAnatomy = defineStyleAnatomy({
    item: cva([
        "UI-Disclosure__item",
    ]),
    contentContainer: cva([
        "UI-Disclosure__contentContainer",
        "overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ]),
    content: cva([
        "UI-Disclosure__content",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Disclosure
 * -----------------------------------------------------------------------------------------------*/

const __DisclosureAnatomyContext = React.createContext<ComponentAnatomy<typeof DisclosureAnatomy>>({})

export type DisclosureProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & ComponentAnatomy<typeof DisclosureAnatomy>

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>((props, ref) => {

    const {
        contentContainerClass,
        contentClass,
        itemClass,
        ...rest
    } = props

    return (
        <__DisclosureAnatomyContext.Provider
            value={{
                itemClass,
                contentContainerClass,
                contentClass,
            }}
        >
            <AccordionPrimitive.Root
                ref={ref}
                {...rest}
            />
        </__DisclosureAnatomyContext.Provider>
    )

})

/* -------------------------------------------------------------------------------------------------
 * DisclosureItem
 * -----------------------------------------------------------------------------------------------*/

export type DisclosureItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & ComponentAnatomy<typeof DisclosureAnatomy>

export const DisclosureItem = React.forwardRef<HTMLDivElement, DisclosureItemProps>((props, ref) => {

    const { className, ...rest } = props

    const { itemClass } = React.useContext(__DisclosureAnatomyContext)

    return (
        <AccordionPrimitive.Item
            ref={ref}
            className={cn(DisclosureAnatomy.item(), itemClass, className)}
            {...rest}
        />
    )

})

/* -------------------------------------------------------------------------------------------------
 * DisclosureTrigger
 * -----------------------------------------------------------------------------------------------*/

type DisclosureTriggerAnatomyProps = Omit<ComponentAnatomy<typeof DisclosureAnatomy>, "itemClass" | "triggerClass">
type DisclosureTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & DisclosureTriggerAnatomyProps

export const DisclosureTrigger = React.forwardRef<HTMLButtonElement, DisclosureTriggerProps>((props, ref) => {

    const {
        className,
        children,
        ...rest
    } = props

    return (
        <AccordionPrimitive.Header asChild>
            <AccordionPrimitive.Trigger asChild>
                {children}
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )

})

/* -------------------------------------------------------------------------------------------------
 * DisclosureContent
 * -----------------------------------------------------------------------------------------------*/

type DisclosureContentAnatomyProps = Omit<ComponentAnatomy<typeof DisclosureAnatomy>, "contentClass">
type DisclosureContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & DisclosureContentAnatomyProps

export const DisclosureContent = React.forwardRef<HTMLDivElement, DisclosureContentProps>((props, ref) => {

    const {
        className,
        contentContainerClass,
        children,
        ...rest
    } = props

    const {
        contentContainerClass: _contentContainerClass,
        contentClass: _contentClass,
    } = React.useContext(__DisclosureAnatomyContext)

    return (
        <AccordionPrimitive.Content
            ref={ref}
            className={cn(DisclosureAnatomy.contentContainer(), _contentContainerClass, contentContainerClass)}
            {...rest}
        >
            <div className={cn(DisclosureAnatomy.content(), _contentClass, className)}>
                {children}
            </div>
        </AccordionPrimitive.Content>
    )
})

DisclosureItem.displayName = "DisclosureItem"
DisclosureTrigger.displayName = "DisclosureTrigger"
DisclosureContent.displayName = "DisclosureContent"


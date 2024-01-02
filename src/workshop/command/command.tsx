"use client"

import { cva } from "class-variance-authority"
import { Command as CommandPrimitive } from "cmdk"
import * as React from "react"
import { createContext, useContext } from "react"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { InputAnatomy } from "../input"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const CommandAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Command__root",
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-[--paper] text-[--foreground]",
    ]),
    inputContainer: cva([
        "UI-Command__input",
        "flex items-center px-3 py-2",
        "cmdk-input-wrapper",
    ]),
    inputIcon: cva([
        "UI-Command__inputIcon",
        "mr-2 h-5 w-5 shrink-0 opacity-50",
    ]),
    list: cva([
        "UI-Command__list",
        "max-h-64 overflow-y-auto overflow-x-hidden",
    ]),
    empty: cva([
        "UI-Command__empty",
        "py-6 text-center text-base text-[--muted]",
    ]),
    group: cva([
        "UI-Command__group",
        "overflow-hidden p-1 text-[--foreground]",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[--muted]",
    ]),
    separator: cva([
        "UI-Command__separator",
        "-mx-1 h-px bg-[--border]",
    ]),
    item: cva([
        "UI-Command__item",
        "relative flex cursor-default select-none items-center rounded-[--radius] px-2 py-1.5 text-base outline-none",
        "aria-selected:bg-[--subtle] data-disabled:pointer-events-none data-disabled:opacity-50",
    ]),
    itemIconContainer: cva([
        "UI-Command__itemIconContainer",
        "mr-2 text-base shrink-0 w-4",
    ]),
    shortcut: cva([
        "UI-Command__shortcut",
        "ml-auto text-xs tracking-widest text-[--muted]",
    ]),
})

const __CommandAnatomyContext = createContext<CommandAnatomyProps>({})

/* -------------------------------------------------------------------------------------------------
 * Command
 * -----------------------------------------------------------------------------------------------*/

type CommandAnatomyProps = Omit<ComponentAnatomy<typeof CommandAnatomy>, "rootClass">

export type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> & CommandAnatomyProps

export const Command = React.forwardRef<HTMLDivElement, CommandProps>((props, ref) => {
    const {
        className,
        inputContainerClass,
        inputIconClass,
        listClass,
        emptyClass,
        groupClass,
        separatorClass,
        itemClass,
        itemIconContainerClass,
        shortcutClass,
        loop = true,
        ...rest
    } = props

    return (
        <__CommandAnatomyContext.Provider
            value={{
                inputContainerClass,
                inputIconClass,
                listClass,
                emptyClass,
                groupClass,
                separatorClass,
                itemClass,
                itemIconContainerClass,
                shortcutClass,
            }}
        >
            <CommandPrimitive
                ref={ref}
                className={cn(CommandAnatomy.root(), className)}
                loop={loop}
                {...rest}
            />
        </__CommandAnatomyContext.Provider>
    )
})
Command.displayName = CommandPrimitive.displayName

/* -------------------------------------------------------------------------------------------------
 * CommandInput
 * -----------------------------------------------------------------------------------------------*/

export type CommandInputProps =
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
    & Pick<ComponentAnatomy<typeof CommandAnatomy>, "inputContainerClass" | "inputIconClass">

export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>((props, ref) => {
    const {
        className,
        inputContainerClass,
        inputIconClass,
        ...rest
    } = props

    const {
        inputContainerClass: _inputContainerClass,
        inputIconClass: _inputIconClass,
    } = useContext(__CommandAnatomyContext)

    return (
        <div className={cn(CommandAnatomy.inputContainer(), _inputContainerClass, inputContainerClass)} cmdk-input-wrapper="">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(CommandAnatomy.inputIcon(), _inputIconClass, inputIconClass)}
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
            <CommandPrimitive.Input
                ref={ref}
                className={cn(InputAnatomy.root({
                    intent: "unstyled",
                    size: "sm",
                    isDisabled: rest.disabled,
                }), className)}
                {...rest}
            />
        </div>
    )
})
CommandInput.displayName = "CommandInput"

/* -------------------------------------------------------------------------------------------------
 * CommandList
 * -----------------------------------------------------------------------------------------------*/

export type CommandListProps =
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>

export const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>((props, ref) => {
    const { className, ...rest } = props

    const { listClass } = useContext(__CommandAnatomyContext)

    return (
        <CommandPrimitive.List
            ref={ref}
            className={cn(CommandAnatomy.list(), listClass, className)}
            {...rest}
        />
    )
})
CommandList.displayName = "CommandList"

/* -------------------------------------------------------------------------------------------------
 * CommandEmpty
 * -----------------------------------------------------------------------------------------------*/

export type CommandEmptyProps =
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>

export const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>((props, ref) => {
    const { className, ...rest } = props

    const { emptyClass } = useContext(__CommandAnatomyContext)

    return (
        <CommandPrimitive.Empty
            ref={ref}
            className={cn(CommandAnatomy.empty(), emptyClass, className)}
            {...rest}
        />
    )
})
CommandEmpty.displayName = "CommandEmpty"

/* -------------------------------------------------------------------------------------------------
 * CommandGroup
 * -----------------------------------------------------------------------------------------------*/

export type CommandGroupProps =
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>

export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>((props, ref) => {
    const { className, ...rest } = props

    const { groupClass } = useContext(__CommandAnatomyContext)

    return (
        <CommandPrimitive.Group
            ref={ref}
            className={cn(CommandAnatomy.group(), groupClass, className)}
            {...rest}
        />
    )
})
CommandGroup.displayName = "CommandGroup"

/* -------------------------------------------------------------------------------------------------
 * CommandSeparator
 * -----------------------------------------------------------------------------------------------*/

export type CommandSeparatorProps =
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>

export const CommandSeparator = React.forwardRef<HTMLDivElement, CommandSeparatorProps>((props, ref) => {
    const { className, ...rest } = props

    const { separatorClass } = useContext(__CommandAnatomyContext)

    return (
        <CommandPrimitive.Separator
            ref={ref}
            className={cn(CommandAnatomy.separator(), separatorClass, className)}
            {...rest}
        />
    )
})
CommandSeparator.displayName = "CommandSeparator"

/* -------------------------------------------------------------------------------------------------
 * CommandItem
 * -----------------------------------------------------------------------------------------------*/

export type CommandItemProps =
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
    & Pick<ComponentAnatomy<typeof CommandAnatomy>, "itemIconContainerClass">
    & { leftIcon?: React.ReactNode }

export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>((props, ref) => {
    const { className, itemIconContainerClass, leftIcon, children, ...rest } = props

    const {
        itemClass,
        itemIconContainerClass: _itemIconContainerClass,
    } = useContext(__CommandAnatomyContext)

    return (
        <CommandPrimitive.Item
            ref={ref}
            className={cn(CommandAnatomy.item(), itemClass, className)}
            {...rest}
        >
            {leftIcon && (
                <span className={cn(CommandAnatomy.itemIconContainer(), _itemIconContainerClass, itemIconContainerClass)}>
                    {leftIcon}
                </span>
            )}
            {children}
        </CommandPrimitive.Item>
    )
})
CommandItem.displayName = "CommandItem"

/* -------------------------------------------------------------------------------------------------
 * CommandShortcut
 * -----------------------------------------------------------------------------------------------*/

export type CommandShortcutProps = React.ComponentPropsWithoutRef<"span">

export const CommandShortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>((props, ref) => {
    const { className, ...rest } = props

    const { shortcutClass } = useContext(__CommandAnatomyContext)

    return (
        <span
            ref={ref}
            className={cn(CommandAnatomy.shortcut(), shortcutClass, className)}
            {...rest}
        />
    )
})
CommandShortcut.displayName = "CommandShortcut"
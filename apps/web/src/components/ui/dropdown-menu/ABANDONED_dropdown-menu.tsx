"use client"

import React, { useState } from "react"
import { ComponentWithAnatomy, createPolymorphicComponent, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import type {
    DropdownMenuContentProps as DropdownMenuPrimitiveContentProps,
    DropdownMenuSubContentProps as DropdownMenuPrimitiveSubContentProps
} from "@radix-ui/react-dropdown-menu"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Divider, DividerProps } from "@/components/ui/divider"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ShowOnly } from "@/components/ui/show-only"
import { Modal } from "@/components/ui/modal"


/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DropdownMenuAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-DropdownMenu__root",
    ])
})

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu
 * -----------------------------------------------------------------------------------------------*/

export interface DropdownMenuProps extends React.ComponentPropsWithoutRef<"div">,
    ComponentWithAnatomy<typeof DropdownMenuAnatomy>,
    DropdownMenuPrimitiveContentProps {
    children?: React.ReactNode
    trigger: React.ReactNode
    ref?: React.RefObject<HTMLDivElement>
}

const _DropdownMenu = (props: DropdownMenuProps) => {

    const {
        children,
        trigger,
        rootClassName,
        className,
        sideOffset = 4,
        ref,
        ...rest
    } = props

    const isMobile = useMediaQuery("(max-width: 768px)")
    const [open, setOpen] = useState(false)

    return (
        <DropdownMenuPrimitive.Root
            open={open}
            onOpenChange={setOpen}
        >
            <DropdownMenuPrimitive.Trigger asChild>
                {trigger}
            </DropdownMenuPrimitive.Trigger>

            <ShowOnly when={!isMobile}>
                <DropdownMenuPrimitive.Portal>
                    <DropdownMenuPrimitive.Content
                        ref={ref}
                        sideOffset={sideOffset}
                        className={cn(
                            "z-10 bg-white min-w-[14rem] overflow-hidden rounded-md border p-1 shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                            className
                        )}
                        {...rest}
                    >
                        {children}
                    </DropdownMenuPrimitive.Content>
                </DropdownMenuPrimitive.Portal>
            </ShowOnly>

            <ShowOnly when={isMobile}>
                <Modal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    isClosable
                    className="block md:hidden"
                >
                    <div>
                        {children}
                    </div>
                </Modal>
            </ShowOnly>
        </DropdownMenuPrimitive.Root>
    )

}

_DropdownMenu.displayName = "DropdownMenu"

/* -------------------------------------------------------------------------------------------------
 *
 * -----------------------------------------------------------------------------------------------*/


const DropdownMenuGroup = DropdownMenuPrimitive.Group

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu.NestedMenu
 * -----------------------------------------------------------------------------------------------*/

export interface DropdownNestedMenuProps extends React.ComponentPropsWithRef<"div">, DropdownMenuPrimitiveSubContentProps {
    children?: React.ReactNode
    trigger: React.ReactNode
}

const DropdownNestedMenu: React.FC<DropdownNestedMenuProps> = React.forwardRef<
    HTMLDivElement, DropdownNestedMenuProps
>((props, ref) => {

    const {
        children,
        trigger,
        className,
        ...rest
    } = props

    return (
        <DropdownMenuPrimitive.Sub>
            <DropdownMenuPrimitive.SubTrigger asChild>
                {trigger}
            </DropdownMenuPrimitive.SubTrigger>

            <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.SubContent
                    ref={ref}
                    className={cn(
                        "z-50 min-w-[10rem] overflow-hidden rounded-md border bg-white p-1 shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
                        className
                    )}
                    {...props}
                >

                </DropdownMenuPrimitive.SubContent>
            </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Sub>
    )

})

DropdownNestedMenu.displayName = "DropdownNestedMenu"

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu.Item
 * -----------------------------------------------------------------------------------------------*/

export interface DropdownMenuItemProps extends React.ComponentPropsWithRef<"div"> {
    children?: React.ReactNode
    inset?: boolean
}

const DropdownMenuItem = React.forwardRef<
    HTMLDivElement,
    DropdownMenuItemProps & {}
>(({ children, className, inset, ...props }, ref) => {

    const isMobile = useMediaQuery("(max-width: 768px)")

    return (
        <>
            <ShowOnly when={!isMobile}>
                {/*<DropdownMenuPrimitive.Item*/}
                {/*    ref={ref}*/}
                {/*    className={cn(*/}
                {/*        "relative flex cursor-default select-none items-center px-2 py-1.5 text-sm rounded-md outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",*/}
                {/*        inset && "pl-8",*/}
                {/*        className*/}
                {/*    )}*/}
                {/*>*/}
                {/*    {children}*/}
                {/*</DropdownMenuPrimitive.Item>*/}
            </ShowOnly>
            <ShowOnly when={isMobile}>
                <div
                    ref={ref}
                    className={cn(
                        "relative flex cursor-default select-none items-center px-2 py-1.5 text-sm rounded-md outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                        inset && "pl-8",
                        className
                    )}
                >
                    {children}
                </div>
            </ShowOnly>
        </>
    )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu.Label
 * -----------------------------------------------------------------------------------------------*/

const DropdownMenuLabel = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
}
>(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn(
            "px-2 py-1.5 text-sm font-semibold",
            inset && "pl-8",
            className
        )}
        {...props}
    />
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuDivider = React.forwardRef<HTMLHRElement, DividerProps>(({ className, ...props }, ref) => (
    <Divider {...props} className={cn("my-1", className)}/>
))
DropdownMenuDivider.displayName = "DropdownMenuDivider"

/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/

_DropdownMenu.Item = DropdownMenuItem
_DropdownMenu.Group = DropdownMenuGroup
_DropdownMenu.Divider = DropdownMenuDivider
_DropdownMenu.Label = DropdownMenuLabel
_DropdownMenu.NestedMenu = DropdownNestedMenu
// _DropdownMenu.Link = DropdownMenuLink

export const DropdownMenu = createPolymorphicComponent<"div", DropdownMenuProps, {
    Item: typeof DropdownMenuItem
    NestedMenu: typeof DropdownNestedMenu
    Label: typeof DropdownMenuLabel
    Group: typeof DropdownMenuGroup
    Divider: typeof DropdownMenuDivider
    // Link: typeof DropdownMenuLink
}>(_DropdownMenu)

DropdownMenu.displayName = "DropdownMenu"

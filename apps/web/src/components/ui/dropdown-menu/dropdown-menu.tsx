"use client"

import React, { Fragment } from "react"
import { ComponentWithAnatomy, createPolymorphicComponent, defineStyleAnatomy } from "@/components/ui/core"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import { Menu, Transition } from "@headlessui/react"
import { cm } from "@/components/ui/core/color-theme"
import { Divider, DividerProps } from "@/components/ui/divider"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DropdownMenuAnatomy = defineStyleAnatomy({
    menu: cva([
        "UI-DropdownMenu__menu relative inline-block text-left",
    ]),
    dropdown: cva(["UI-DropdownMenu__dropdown",
        cm(["bg-{{white,gray-800}}"]),
        "absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none space-y-1",
        "p-1"
    ])
})

export const DropdownMenuItemAnatomy = defineStyleAnatomy({
    item: cva(["UI-DropdownMenu__item transition",
        cm("text-{{gray-800,gray-200}} hover:text-{{black,white}}"),
        "font-medium group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2"
    ], {
        variants: {
            active: {
                true: cm("bg-gray-{{100,700}}"),
                false: null
            }
        },
        defaultVariants: { active: false }
    })
})

export const DropdownMenuGroupAnatomy = defineStyleAnatomy({
    group: cva(["UI-DropdownMenu__group",
        cm("text-{{gray-800,gray-200}}"),
        "group"
    ]),
    title: cva(["UI-DropdownMenu_title font-semibold px-2 py-1"]),
    content: cva(["UI-DropdownMenu_content"])
})

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu
 * -----------------------------------------------------------------------------------------------*/

export interface DropdownMenuProps
    extends React.ComponentPropsWithRef<"div">,
        ComponentWithAnatomy<typeof DropdownMenuAnatomy>,
        ComponentWithAnatomy<typeof DropdownMenuItemAnatomy>,
        VariantProps<typeof DropdownMenuAnatomy.dropdown> {
    children?: React.ReactNode,
    trigger: React.ReactNode,
}

const _DropdownMenu = (props: DropdownMenuProps) => {

    const {
        children,
        trigger,
        menuClassName,
        dropdownClassName,
        itemClassName,
        className,
        ...rest
    } = props

    // Pass `itemClassName` to every child
    const itemsWithProps = React.useMemo(() => React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { itemClassName } as any)
        }
        return child
    }), [children])

    return (
        <Menu as="div" className={cn(DropdownMenuAnatomy.menu(), menuClassName, className)} {...rest}>
            <Menu.Button as={Fragment}>
                {trigger}
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className={cn(DropdownMenuAnatomy.dropdown(), dropdownClassName)}>
                    {itemsWithProps}
                </Menu.Items>
            </Transition>
        </Menu>
    )

}

_DropdownMenu.displayName = "DropdownMenu"

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu.Item
 * -----------------------------------------------------------------------------------------------*/

interface DropdownMenuItemProps extends React.ComponentPropsWithRef<"button">, ComponentWithAnatomy<typeof DropdownMenuItemAnatomy> {
    children?: React.ReactNode
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>((props, ref) => {

    const { children, itemClassName, className, ...rest } = props

    return <Menu.Item as={Fragment}>
        {({ active }) => (
            <button
                className={cn(DropdownMenuItemAnatomy.item({ active }), itemClassName, className)}
                ref={ref}
                {...rest}
            >
                {children}
            </button>
        )}
    </Menu.Item>

})

DropdownMenuItem.displayName = "DropdownMenuItem"

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu.Link
 * -----------------------------------------------------------------------------------------------*/

interface DropdownMenuLinkProps extends React.ComponentPropsWithRef<"a">, ComponentWithAnatomy<typeof DropdownMenuItemAnatomy> {
    children?: React.ReactNode
    href: string
}

const DropdownMenuLink: React.FC<DropdownMenuLinkProps> = React.forwardRef<HTMLAnchorElement, DropdownMenuLinkProps>((props, ref) => {

    const { children, className, itemClassName, href, ...rest } = props

    return <Menu.Item as={Fragment}>
        {({ active }) => (
            <a
                href={href}
                className={cn(DropdownMenuItemAnatomy.item({ active }), itemClassName, className)}
                ref={ref}
                {...rest}
            >
                {children}
            </a>
        )}
    </Menu.Item>

})

DropdownMenuLink.displayName = "DropdownMenuLink"

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu.Group
 * -----------------------------------------------------------------------------------------------*/

interface DropdownMenuGroupProps extends React.ComponentPropsWithRef<"div">,
    ComponentWithAnatomy<typeof DropdownMenuGroupAnatomy>,
    ComponentWithAnatomy<typeof DropdownMenuItemAnatomy> {
    children?: React.ReactNode
    title?: string
}

const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = React.forwardRef<HTMLDivElement, DropdownMenuGroupProps>((props, ref) => {

    const {
        children,
        className,
        groupClassName,
        title,
        titleClassName,
        contentClassName,
        itemClassName, // Ignore the classes
        ...rest
    } = props

    return <div
        className={cn(DropdownMenuGroupAnatomy.group(), groupClassName, className)}
        aria-label={title}
        ref={ref}
        {...rest}
    >
        {title && <div className={cn(DropdownMenuGroupAnatomy.title(), titleClassName)} aria-labelledby={title}>
            {title}
        </div>}
        <div className={cn(DropdownMenuGroupAnatomy.content(), contentClassName)}>
            {children}
        </div>
    </div>

})

DropdownMenuGroup.displayName = "DropdownMenuGroup"

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu.Divider
 * -----------------------------------------------------------------------------------------------*/

interface DropdownMenuDivider extends DividerProps, ComponentWithAnatomy<typeof DropdownMenuItemAnatomy> {
}

const DropdownMenuDivider: React.FC<DropdownMenuDivider> = React.forwardRef<HTMLHRElement, DropdownMenuDivider>(({ itemClassName, ...props }, ref) => {

    return <Divider {...props} ref={ref}/>

})

DropdownMenuDivider.displayName = "DropdownMenuDivider"


/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/

_DropdownMenu.Item = DropdownMenuItem
_DropdownMenu.Link = DropdownMenuLink
_DropdownMenu.Group = DropdownMenuGroup
_DropdownMenu.Divider = DropdownMenuDivider

export const DropdownMenu = createPolymorphicComponent<"div", DropdownMenuProps, {
    Item: typeof DropdownMenuItem
    Link: typeof DropdownMenuLink
    Group: typeof DropdownMenuGroup
    Divider: typeof Divider
}>(_DropdownMenu)

DropdownMenu.displayName = "DropdownMenu"

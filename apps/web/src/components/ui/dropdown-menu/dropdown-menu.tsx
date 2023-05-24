"use client"

import React, { Fragment } from "react"
import { ComponentWithAnatomy, createPolymorphicComponent, defineStyleAnatomy } from "@/components/ui/core"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import { Menu, Transition } from "@headlessui/react"
import { cm } from "@/components/ui/core/color-theme"

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
    menuItem: cva(["UI-DropdownMenu__menuItem transition",
        cm("hover:bg-gray-{{100,700}} text-{{gray-800,gray-200}} hover:text-{{black,white}}"),
        "font-medium group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2"
    ], {
        variants: {
            active: {
                true: "bg-brand-500",
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
    title: cva(["UI-DropdownMenu_title font-semibold px-2 py-2"])
})

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu
 * -----------------------------------------------------------------------------------------------*/

export interface DropdownMenuProps
    extends ComponentWithAnatomy<typeof DropdownMenuAnatomy>,
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
        menuItemClassName,
        ...rest
    } = props

    const itemsWithProps = React.Children.map(children, (child) => {
        // Checking isValidElement is the safe way and avoids a typescript error too.
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { menuItemClassName } as any)
        }
        return child
    })

    return (
        <Menu as="div" className={cn(DropdownMenuAnatomy.menu(), menuClassName)}>
            <div>
                <Menu.Button as={Fragment}>
                    {trigger}
                </Menu.Button>
            </div>
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

interface DropdownMenuItemProps extends ComponentWithAnatomy<typeof DropdownMenuItemAnatomy> {
    children?: React.ReactNode
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>((props, ref) => {

    const { children, menuItemClassName, ...rest } = props

    return <Menu.Item>
        {({ active }) => (
            <button
                className={cn(DropdownMenuItemAnatomy.menuItem(), menuItemClassName)}
                ref={ref}
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

interface DropdownMenuLinkProps extends ComponentWithAnatomy<typeof DropdownMenuItemAnatomy> {
    children?: React.ReactNode
    href: string
}

const DropdownMenuLink: React.FC<DropdownMenuLinkProps> = React.forwardRef<HTMLAnchorElement, DropdownMenuLinkProps>((props, ref) => {

    const { children, menuItemClassName, href, ...rest } = props

    return <Menu.Item>
        {({ active }) => (
            <a
                href={href}
                className={cn(DropdownMenuItemAnatomy.menuItem(), menuItemClassName)}
                ref={ref}
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

interface DropdownMenuGroupProps extends ComponentWithAnatomy<typeof DropdownMenuGroupAnatomy> {
    children?: React.ReactNode
    title?: string
}

const DropdownMenuGroup: React.FC<DropdownMenuGroupProps> = React.forwardRef<HTMLDivElement, DropdownMenuGroupProps>((props, ref) => {

    const { children, groupClassName, title, titleClassName, ...rest } = props

    return <Menu.Item>
        {({ active }) => (
            <div
                className={cn(DropdownMenuGroupAnatomy.group(), groupClassName)}
                aria-label={title}
                ref={ref}
            >
                {title && <div className={cn(DropdownMenuGroupAnatomy.title(), titleClassName)} aria-labelledby={title}>
                    {title}
                </div>}
                {children}
            </div>
        )}
    </Menu.Item>

})

DropdownMenuGroup.displayName = "DropdownMenuGroup"


/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/

_DropdownMenu.Item = DropdownMenuItem
_DropdownMenu.Link = DropdownMenuLink
_DropdownMenu.Group = DropdownMenuGroup

export const DropdownMenu = createPolymorphicComponent<"div", DropdownMenuProps, {
    Item: typeof DropdownMenuItem
    Link: typeof DropdownMenuLink
    Group: typeof DropdownMenuGroup
}>(_DropdownMenu)

DropdownMenu.displayName = "DropdownMenu"

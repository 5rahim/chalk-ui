"use client"

import { cva } from "class-variance-authority"
import * as React from "react"
import { useId } from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandProps } from "../command"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { extractInputPartProps, InputAddon, InputAnatomy, InputContainer, InputIcon, InputStyling } from "../input"
import { Popover } from "../popover"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const ComboboxAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Combobox__root",
        "justify-between",
    ]),
    popover: cva([
        "UI-Combobox__popover",
        "w-[--radix-popover-trigger-width] p-0",
    ]),
    checkIcon: cva([
        "UI-Combobox__checkIcon",
        "h-4 w-4",
        "data-[selected=true]:opacity-100 data-[selected=false]:opacity-0",
    ]),
})


/* -------------------------------------------------------------------------------------------------
 * Combobox
 * -----------------------------------------------------------------------------------------------*/

type ComboboxButtonProps = Omit<React.ComponentPropsWithRef<"button">, "size" | "value" | "onChange">

export interface ComboboxProps extends ComboboxButtonProps,
    BasicFieldOptions,
    InputStyling,
    Omit<ComponentAnatomy<typeof ComboboxAnatomy>, "rootClass"> {
    multiple?: boolean
    value: string
    onChange: (value: string) => void
    commandProps?: CommandProps
    options: { value: string, label: React.ReactNode }[]
    emptyMessage: React.ReactNode
    placeholder: string
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>((props, ref) => {

    const [props1, basicFieldProps] = extractBasicFieldProps<ComboboxProps>(props, useId())

    const [{
        size,
        intent,
        leftAddon,
        leftIcon,
        rightAddon,
        rightIcon,
        className,
        popoverClass,
        checkIconClass,
        /**/
        commandProps,
        options,
        emptyMessage,
        placeholder,
        value,
        onChange,
        ...rest
    }, {
        inputContainerProps,
        leftAddonProps,
        leftIconProps,
        rightAddonProps,
        rightIconProps,
    }] = extractInputPartProps<ComboboxProps>({
        ...props1,
        size: props1.size ?? "md",
        intent: props1.intent ?? "basic",
        leftAddon: props1.leftAddon,
        leftIcon: props1.leftIcon,
        rightAddon: props1.rightAddon,
        rightIcon: props1.rightIcon,
    })

    const [open, setOpen] = React.useState(false)

    return (
        <BasicField
            {...basicFieldProps}
        >
            <InputContainer {...inputContainerProps}>

                <InputAddon {...leftAddonProps} />
                <InputIcon {...leftIconProps} />

                <Popover
                    open={open}
                    onOpenChange={setOpen}
                    className={cn(
                        ComboboxAnatomy.popover(),
                        popoverClass,
                    )}
                    trigger={<button
                        ref={ref}
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            InputAnatomy.root({
                                size,
                                intent,
                                hasError: !!basicFieldProps.error,
                                isDisabled: !!basicFieldProps.disabled,
                                isReadonly: !!basicFieldProps.readonly,
                                hasRightAddon: !!rightAddon,
                                hasRightIcon: !!rightIcon,
                                hasLeftAddon: !!leftAddon,
                                hasLeftIcon: !!leftIcon,
                            }),
                            ComboboxAnatomy.root(),
                        )}
                        {...rest}
                    >
                        {!!value
                            ? options.find((option) => option.value === value)?.label
                            : placeholder}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-2 h-4 w-4 shrink-0 opacity-50"
                        >
                            <path d="m7 15 5 5 5-5" />
                            <path d="m7 9 5-5 5 5" />
                        </svg>
                    </button>}
                >
                    <Command
                        inputContainerClass="py-1"
                        {...commandProps}
                    >
                        <CommandInput placeholder={placeholder} />
                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                        leftIcon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={cn(
                                                    ComboboxAnatomy.checkIcon(),
                                                    checkIconClass,
                                                )}
                                                data-selected={option.value === value}
                                            >
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                        }
                                    >
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </Popover>

                <InputAddon {...rightAddonProps} />
                <InputIcon {...rightIconProps} />

            </InputContainer>
        </BasicField>
    )
})

Combobox.displayName = "Combobox"

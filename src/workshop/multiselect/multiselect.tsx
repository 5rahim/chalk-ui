"use client"

import * as React from "react"
import { useId } from "react"
import { BasicField, extractBasicFieldProps } from "../basic-field"
import { ComboboxAnatomy, ComboboxProps } from "../combobox/combobox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../command"
import { cn } from "../core/classnames"
import { ComponentAnatomy } from "../core/styling"
import { extractInputPartProps, InputAddon, InputAnatomy, InputContainer, InputIcon } from "../input"
import { Popover } from "../popover"


/* -------------------------------------------------------------------------------------------------
 * Multiselect
 * -----------------------------------------------------------------------------------------------*/

export interface MultiselectProps extends Omit<ComboboxProps, "value" | "onChange">,
    Omit<ComponentAnatomy<typeof ComboboxAnatomy>, "rootClass"> {
    value: string[]
    onChange: (value: string[]) => void
}

export const Multiselect = React.forwardRef<HTMLButtonElement, MultiselectProps>((props, ref) => {

    const [props1, basicFieldProps] = extractBasicFieldProps<MultiselectProps>(props, useId())

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
    }] = extractInputPartProps<MultiselectProps>({
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
                        {!!value.length
                            ? options.filter((opt) => value.includes(opt.value)).map(opt => opt.label).join(", ")
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
                            <path d="m3 17 2 2 4-4" />
                            <path d="m3 7 2 2 4-4" />
                            <path d="M13 6h8" />
                            <path d="M13 12h8" />
                            <path d="M13 18h8" />
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
                                            onChange(
                                                !value.includes(currentValue)
                                                    ? [...value, currentValue]
                                                    : value.filter((v) => v !== currentValue),
                                            )
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
                                                data-selected={value.includes(option.value)}
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

Multiselect.displayName = "Multiselect"

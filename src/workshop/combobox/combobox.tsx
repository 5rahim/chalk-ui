"use client"

import { cva } from "class-variance-authority"
import * as React from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { CloseButton, CloseButtonProps } from "../button"
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
        "justify-between h-auto",
    ], {
        variants: {
            size: {
                sm: "min-h-8 px-2 py-1 text-sm",
                md: "min-h-10 px-3 py-2 ",
                lg: "min-h-12 px-4 py-3 text-md",
            },
        },
    }),
    popover: cva([
        "UI-Combobox__popover",
        "w-[--radix-popover-trigger-width] p-0",
    ]),
    checkIcon: cva([
        "UI-Combobox__checkIcon",
        "h-4 w-4",
        "data-[selected=true]:opacity-100 data-[selected=false]:opacity-0",
    ]),
    optionItem: cva([
        "UI-Combobox__optionItem",
        "flex gap-1 items-center bg-gray-100 dark:bg-gray-800 px-2 pr-0 rounded-[--radius] line-clamp-1 max-w-96",
    ]),
    placeholder: cva([
        "UI-Combobox__placeholder",
        "text-[--muted]",
    ]),
    inputValuesContainer: cva([
        "UI-Combobox__inputValuesContainer",
        "grow flex flex-wrap gap-2",
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
    value: string[]
    onChange: (value: string[]) => void
    onInputChange?: (value: string) => void
    commandProps?: CommandProps
    options: { value: string, comparisonValue?: string, label: React.ReactNode }[]
    emptyMessage: React.ReactNode
    placeholder: string
    multiple?: boolean
    optionItemCloseButtonProps?: CloseButtonProps
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>((props, ref) => {

    const [props1, basicFieldProps] = extractBasicFieldProps<ComboboxProps>(props, React.useId())

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
        optionItemClass,
        placeholderClass,
        inputValuesContainerClass,
        optionItemCloseButtonProps,
        /**/
        commandProps,
        options,
        emptyMessage,
        placeholder,
        value,
        onChange,
        onInputChange,
        multiple = false,
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

    const selectedOptions = options.filter((option) => value.includes(option.value))

    const displayedValues = (
        (!!value.length && !!selectedOptions.length) ?
            multiple ? <>
                    {selectedOptions.map((option) => (
                        <div
                            key={option.value}
                            className={cn(ComboboxAnatomy.optionItem(), optionItemClass)}
                        >
                            <span className="truncate">{option.comparisonValue || option.value}</span>
                            <CloseButton
                                intent="gray-basic"
                                size="xs"
                                className="rounded-[--radius]"
                                {...optionItemCloseButtonProps}
                                onClick={(e) => {
                                    e.preventDefault()
                                    onChange(value.filter((v) => v !== option.value))
                                    setOpen(false)
                                }}
                            />
                        </div>
                    ))}
                </> :
                selectedOptions[0].label
            : <span className={cn(ComboboxAnatomy.placeholder(), placeholderClass)}>{placeholder}</span>
    )

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
                        id={basicFieldProps.id}
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
                            ComboboxAnatomy.root({
                                size,
                            }),
                        )}
                        {...rest}
                    >
                        <div className={cn(ComboboxAnatomy.inputValuesContainer())}>
                            {displayedValues}
                        </div>
                        <div className="flex items-center">
                            {(!!value.length && !!selectedOptions.length && !multiple) && (
                                <CloseButton
                                    intent="gray-subtle"
                                    size="xs"
                                    {...optionItemCloseButtonProps}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onChange([])
                                        setOpen(false)
                                    }}
                                />
                            )}
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
                        </div>
                    </button>}
                >
                    <Command
                        inputContainerClass="py-1"
                        {...commandProps}
                    >
                        <CommandInput
                            placeholder={placeholder}
                            onValueChange={onInputChange}
                        />
                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.comparisonValue || option.value}
                                        onSelect={(currentValue) => {
                                            const _option = options.find(n => (n.comparisonValue || n.value).toLowerCase() === currentValue.toLowerCase())
                                            if (_option) {
                                                if (!multiple) {
                                                    onChange(value.includes(_option.value) ? [] : [_option.value])
                                                } else {
                                                    onChange(
                                                        !value.includes(_option.value)
                                                            ? [...value, _option.value]
                                                            : value.filter((v) => v !== _option.value),
                                                    )
                                                }
                                            }
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

Combobox.displayName = "Combobox"

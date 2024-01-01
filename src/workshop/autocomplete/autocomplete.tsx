"use client"

import { cva } from "class-variance-authority"
import React from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandProps } from "../command"
import { cn } from "../core/classnames"
import { mergeRefs } from "../core/refs"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { extractInputPartProps, InputAddon, InputAnatomy, InputContainer, InputIcon, InputStyling } from "../input"
import { Popover } from "../popover"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const AutocompleteAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Autocomplete__root",
    ]),
    popover: cva([
        "UI-Autocomplete__popover",
        "w-[--radix-popover-trigger-width] p-0",
    ]),
    checkIcon: cva([
        "UI-Autocomplete__checkIcon",
        "h-4 w-4",
        "data-[selected=true]:opacity-100 data-[selected=false]:opacity-0",
    ]),
    container: cva([
        "UI-Autocomplete__container",
        "relative w-full",
    ]),
    command: cva([
        "UI-Autocomplete__command",
        "focus-within:ring-2 ring-[--ring] transition",
    ]),
})


/* -------------------------------------------------------------------------------------------------
 * Autocomplete
 * -----------------------------------------------------------------------------------------------*/

type AutocompleteInputProps = Omit<React.ComponentPropsWithRef<"input">, "size" | "value" | "onChange">

type AutocompleteOption = { value: string, label: string }

export interface AutocompleteProps<T extends Array<AutocompleteOption>> extends AutocompleteInputProps,
    BasicFieldOptions,
    InputStyling,
    Omit<ComponentAnatomy<typeof AutocompleteAnatomy>, "rootClass"> {
    value: AutocompleteOption | undefined
    onChange: (value: T[number] | undefined) => void
    onInputChange?: (value: string) => void
    options: T
    emptyMessage: React.ReactNode
    placeholder: string
    commandProps?: CommandProps
}

function _Autocomplete<T extends Array<AutocompleteOption>>(props: AutocompleteProps<T>, ref: React.ForwardedRef<HTMLInputElement>) {

    const [props1, basicFieldProps] = extractBasicFieldProps<AutocompleteProps<T>>(props, React.useId())

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
        containerClass,
        commandClass,
        /**/
        commandProps,
        options,
        emptyMessage,
        placeholder,
        value,
        onChange,
        onInputChange,
        ...rest
    }, {
        inputContainerProps,
        leftAddonProps,
        leftIconProps,
        rightAddonProps,
        rightIconProps,
    }] = extractInputPartProps<AutocompleteProps<T>>({
        ...props1,
        size: props1.size ?? "md",
        intent: props1.intent ?? "basic",
        leftAddon: props1.leftAddon,
        leftIcon: props1.leftIcon,
        rightAddon: props1.rightAddon,
        rightIcon: props1.rightIcon,
    })

    // Set inputValue to the label of the selected option
    const [inputValue, setInputValue] = React.useState(value?.label ?? "")

    const [open, setOpen] = React.useState(false)

    const [filteredOptions, setFilteredOptions] = React.useState<T>(options)

    const _shouldOpen = options.length > 0 && filteredOptions.length > 0

    const by = React.useCallback((a: string, b: string) => a.toLowerCase() === b.toLowerCase(), [])

    const inputRef = React.useRef<HTMLInputElement>(null)
    const commandInputRef = React.useRef<HTMLInputElement>(null)

    React.useLayoutEffect(() => {
        setInputValue(value?.label ?? "")
    }, [value])

    const handleOnOpenChange = (_open: boolean) => {
        if (options.length === 0 && _open) return
        setOpen(_open)
        if (!_open) {
            React.startTransition(() => {
                inputRef.current?.focus()
            })
        }
    }

    // Filter options based on inputValue
    React.useEffect(() => {
        setFilteredOptions(options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase())) as T)

        const _option = options.find(n => by(n.label, inputValue))
        _option && onChange(_option)

    }, [inputValue, options])

    // Update inputValue when value changes
    const handleValueChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        onInputChange?.(e.target.value)
        // Open the popover if there are filtered options
        if (filteredOptions.length > 0) {
            setOpen(true)
        }
    }, [filteredOptions])

    // Focus the command input when arrow down is pressed
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open) {
            setOpen(true)
        }
        if (e.key === "ArrowDown") {
            e.preventDefault()
            commandInputRef.current?.focus()
        }
    }, [open])

    return (
        <BasicField
            {...basicFieldProps}
        >
            <InputContainer {...inputContainerProps}>

                <InputAddon {...leftAddonProps} />
                <InputIcon {...leftIconProps} />

                <Popover
                    open={open && _shouldOpen}
                    onOpenChange={handleOnOpenChange}
                    className={cn(
                        AutocompleteAnatomy.popover(),
                        popoverClass,
                    )}
                    onOpenAutoFocus={e => e.preventDefault()}
                    trigger={
                        <div className={cn(AutocompleteAnatomy.container(), containerClass)}>
                            <input
                                ref={mergeRefs([ref, inputRef])}
                                id={basicFieldProps.id}
                                value={inputValue}
                                onChange={handleValueChange}
                                placeholder={placeholder}
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
                                    AutocompleteAnatomy.root(),
                                )}
                                onKeyDown={handleKeyDown}
                                {...rest}
                            />
                        </div>
                    }
                >
                    <Command
                        className={cn(AutocompleteAnatomy.command(), commandClass)}
                        inputContainerClass="py-1"
                        {...commandProps}
                    >
                        <CommandInput
                            value={inputValue}
                            onValueChange={setInputValue}
                            inputContainerClass="visibility-hidden h-0 overflow-hidden w-0 p-0"
                            aria-hidden="true"
                            ref={commandInputRef}
                        />
                        <CommandList>
                            <CommandGroup>
                                {options.map((option, index) => (
                                    <CommandItem
                                        autoFocus={index === 0}
                                        key={option.value}
                                        value={option.label}
                                        onSelect={(currentValue) => {
                                            // Get the selected option
                                            const _option = options.find(n => by(n.label, currentValue))
                                            if (_option) {
                                                if (value?.value === _option.value) {
                                                    onChange(undefined)
                                                    setInputValue("")
                                                } else {
                                                    onChange(_option)
                                                    setInputValue(_option.label)
                                                }
                                            }
                                            setOpen(false)
                                            React.startTransition(() => {
                                                inputRef.current?.focus()
                                            })
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
                                                    AutocompleteAnatomy.checkIcon(),
                                                    checkIconClass,
                                                )}
                                                data-selected={by(option.label, inputValue)}
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
}

export const Autocomplete = React.forwardRef(_Autocomplete)

Autocomplete.displayName = "Autocomplete"

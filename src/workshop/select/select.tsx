"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import { cva } from "class-variance-authority"
import * as React from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { extractInputPartProps, InputAddon, InputAnatomy, InputContainer, InputIcon, InputStyling } from "../input"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const SelectAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Select__root",
        "inline-flex items-center justify-between relative",
    ]),
    chevronIcon: cva([
        "UI-Combobox__chevronIcon",
        "ml-2 h-4 w-4 shrink-0 opacity-50",
    ]),
    scrollButton: cva([
        "UI-Select__scrollButton",
        "flex items-center justify-center h-[25px] bg-[--paper] text-base cursor-default",
    ]),
    content: cva([
        "UI-Select__content",
        "w-full overflow-hidden rounded-[--radius] shadow-md bg-[--paper] border leading-none z-50",
    ]),
    viewport: cva([
        "UI-Select__viewport",
        "p-1 z-10",
    ]),
    item: cva([
        "UI-Select__item",
        "text-base leading-none rounded-[--radius] flex items-center h-8 pr-2 pl-8 relative",
        "select-none disabled:opacity-50 disabled:pointer-events-none",
        "data-highlighted:outline-none data-highlighted:bg-[--subtle]",
    ]),
    checkIcon: cva([
        "UI-Select__checkIcon",
        "absolute left-2 w-4 inline-flex items-center justify-center",
    ]),
})


/* -------------------------------------------------------------------------------------------------
 * Select
 * -----------------------------------------------------------------------------------------------*/

export interface SelectProps extends InputStyling,
    BasicFieldOptions,
    Omit<React.ComponentPropsWithoutRef<"button">, "value">,
    Omit<ComponentAnatomy<typeof SelectAnatomy>, "rootClass"> {
    /**
     * The options to display in the dropdown
     */
    options: { value: string, label?: string, disabled?: boolean }[] | undefined
    /**
     * The placeholder text
     */
    placeholder?: string
    /**
     * Direction of the text
     */
    dir?: "ltr" | "rtl"
    /**
     * The selected value
     */
    value?: string | undefined
    /**
     * Callback fired when the selected value changes
     */
    onValueChange?: (value: string) => void
    /**
     * Callback fired when the dropdown opens or closes
     */
    onOpenChange?: (open: boolean) => void
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>((props, ref) => {

    const [props1, basicFieldProps] = extractBasicFieldProps<SelectProps>(props, React.useId())

    const [{
        size,
        intent,
        leftAddon,
        leftIcon,
        rightAddon,
        rightIcon,
        /**/
        className,
        placeholder,
        options,
        chevronIconClass,
        scrollButtonClass,
        contentClass,
        viewportClass,
        checkIconClass,
        itemClass,
        /**/
        dir,
        value,
        onValueChange,
        onOpenChange,
        ...rest
    }, {
        inputContainerProps,
        leftAddonProps,
        leftIconProps,
        rightAddonProps,
        rightIconProps,
    }] = extractInputPartProps<SelectProps>({
        ...props1,
        size: props1.size ?? "md",
        intent: props1.intent ?? "basic",
        leftAddon: props1.leftAddon,
        leftIcon: props1.leftIcon,
        rightAddon: props1.rightAddon,
        rightIcon: props1.rightIcon,
    })

    return (
        <BasicField{...basicFieldProps}>
            <InputContainer {...inputContainerProps}>
                <InputAddon {...leftAddonProps} />
                <InputIcon {...leftIconProps} />

                <SelectPrimitive.Root
                    dir={dir}
                    value={value}
                    onValueChange={onValueChange}
                    onOpenChange={onOpenChange}
                >

                    <SelectPrimitive.Trigger
                        ref={ref}
                        id={basicFieldProps.id}
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
                            SelectAnatomy.root(),
                            className,
                        )}
                        aria-label={basicFieldProps.name || "Select"}
                        {...rest}
                    >
                        <SelectPrimitive.Value placeholder={placeholder} />

                        <SelectPrimitive.Icon className={cn(!!rightIcon && "hidden")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={cn(SelectAnatomy.chevronIcon(), chevronIconClass)}
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </SelectPrimitive.Icon>

                    </SelectPrimitive.Trigger>

                    <SelectPrimitive.Portal>
                        <SelectPrimitive.Content className={cn(SelectAnatomy.content(), contentClass)}>

                            <SelectPrimitive.ScrollUpButton className={cn(SelectAnatomy.scrollButton(), scrollButtonClass)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={cn(SelectAnatomy.chevronIcon(), "rotate-180", chevronIconClass)}
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </SelectPrimitive.ScrollUpButton>

                            <SelectPrimitive.Viewport className={cn(SelectAnatomy.viewport(), viewportClass)}>


                                {options?.map(option => (
                                    <SelectPrimitive.Item
                                        key={option.value}
                                        className={cn(
                                            SelectAnatomy.item(),
                                            itemClass,
                                        )}
                                        value={option.value}
                                        disabled={option.disabled}
                                    >
                                        <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                                        <SelectPrimitive.ItemIndicator asChild>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={cn(
                                                    SelectAnatomy.checkIcon(),
                                                    checkIconClass,
                                                )}
                                            >
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                        </SelectPrimitive.ItemIndicator>
                                    </SelectPrimitive.Item>
                                ))}

                            </SelectPrimitive.Viewport>

                            <SelectPrimitive.ScrollDownButton className={cn(SelectAnatomy.scrollButton(), scrollButtonClass)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={cn(SelectAnatomy.chevronIcon(), chevronIconClass)}
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </SelectPrimitive.ScrollDownButton>

                        </SelectPrimitive.Content>
                    </SelectPrimitive.Portal>

                </SelectPrimitive.Root>

                <InputAddon {...rightAddonProps} />
                <InputIcon {...rightIconProps} />
            </InputContainer>
        </BasicField>
    )

})

Select.displayName = "Select"

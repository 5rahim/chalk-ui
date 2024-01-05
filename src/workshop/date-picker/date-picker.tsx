"use client"

import { cva } from "class-variance-authority"
import { format, getMonth, getYear, setYear } from "date-fns"
import * as React from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { Calendar } from "../calendar"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { extractInputPartProps, InputAddon, InputAnatomy, InputContainer, InputIcon, InputStyling } from "../input"
import { Modal } from "../modal"
import { Popover } from "../popover"
import { Select } from "../select"


/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DatePickAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-DatePicker__root",
        "",
    ]),
    placeholder: cva([
        "UI-DatePicker__placeholder",
        "text-[--muted]",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * DatePicker
 * -----------------------------------------------------------------------------------------------*/

export interface DatePickerProps extends Omit<React.ComponentPropsWithRef<"button">, "size" | "value">,
    Omit<ComponentAnatomy<typeof DatePickAnatomy>, "rootClass">,
    InputStyling,
    BasicFieldOptions {
    /**
     * The selected date
     */
    value?: Date
    /**
     * Callback when the selected date changes
     */
    onValueChange?: (value: Date | undefined) => void
    /**
     * The placeholder text
     */
    placeholder?: string
    /**
     * The locale for formatting the date
     */
    locale?: Locale
    /**
     * Hide the year selector above the calendar
     */
    hideYearSelector?: boolean
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>((props, ref) => {

    const [props1, basicFieldProps] = extractBasicFieldProps<DatePickerProps>(props, React.useId())

    const [{
        size,
        intent,
        leftAddon,
        leftIcon,
        rightAddon,
        rightIcon,
        className,
        placeholderClass,
        /**/
        value,
        onValueChange,
        placeholder,
        locale,
        hideYearSelector,
        ...rest
    }, {
        inputContainerProps,
        leftAddonProps,
        leftIconProps,
        rightAddonProps,
        rightIconProps,
    }] = extractInputPartProps<DatePickerProps>({
        ...props1,
        size: props1.size ?? "md",
        intent: props1.intent ?? "basic",
        leftAddon: props1.leftAddon,
        leftIcon: props1.leftIcon,
        rightAddon: props1.rightAddon,
        rightIcon: props1.rightIcon || <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>,
    })

    const [date, setDate] = React.useState<Date | undefined>(value)

    const handleOnSelect = React.useCallback((date: Date | undefined) => {
        setDate(date)
        onValueChange?.(date)
    }, [])

    const Input = (
        <button
            ref={ref}
            id={basicFieldProps.id}
            name={basicFieldProps.name}
            className={cn(
                "form-input",
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
                DatePickAnatomy.root(),
                className,
            )}
            disabled={basicFieldProps.disabled || basicFieldProps.readonly}
            data-disabled={basicFieldProps.disabled}
            data-readonly={basicFieldProps.readonly}
            {...rest}
        >
            {date ?
                format(date, "PPP", { locale: locale }) :
                <span className={cn(DatePickAnatomy.placeholder(), placeholderClass)}>{placeholder || "Select a date"}</span>}
        </button>
    )

    const Picker = (
        <div>
            {!hideYearSelector && <div className="flex items-center justify-between p-1 sm:border-b">
                <Select
                    size="sm"
                    intent="filled"
                    options={Array(getYear(new Date()) - 1899).fill(0).map((_, i) => (
                        { label: String(getYear(new Date()) - i), value: String(getYear(new Date()) - i) }
                    ))}
                    value={String(getYear(date ?? new Date()))}
                    onValueChange={value => setDate(setYear(date ?? new Date(), Number(value)))}
                />
            </div>}
            <Calendar
                captionLayout="dropdown-buttons"
                mode="single"
                month={date ?? new Date()}
                onMonthChange={month => setDate(month)}
                selected={date}
                onSelect={handleOnSelect}
                locale={locale}
                initialFocus
                tableClass="w-auto mx-auto"
            />
        </div>
    )

    return (
        <BasicField {...basicFieldProps}>
            <InputContainer {...inputContainerProps}>

                <InputAddon {...leftAddonProps} />
                <InputIcon {...leftIconProps} />

                <div className="hidden sm:block w-full">
                    <Popover
                        className="w-auto p-0"
                        trigger={Input}
                    >
                        {Picker}
                    </Popover>
                </div>

                <div className="block sm:hidden w-full">
                    <Modal
                        title={placeholder || "Select a date"}
                        trigger={Input}
                    >
                        {Picker}
                    </Modal>
                </div>

                <InputAddon {...rightAddonProps} />
                <InputIcon {...rightIconProps} />

            </InputContainer>
        </BasicField>
    )

})

DatePicker.displayName = "DatePicker"

"use client"

import { cva } from "class-variance-authority"
import { format } from "date-fns"
import * as React from "react"
import { DateRange } from "react-day-picker"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { Calendar } from "../calendar"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { extractInputPartProps, InputAddon, InputAnatomy, InputContainer, InputIcon, InputStyling } from "../input"
import { Modal } from "../modal"
import { Popover } from "../popover"


/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const DateRangePickerAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-DateRangePicker__root",
        "truncate",
    ]),
    placeholder: cva([
        "UI-DateRangePicker__placeholder",
        "text-[--muted]",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker
 * -----------------------------------------------------------------------------------------------*/

export interface DateRangePickerProps extends Omit<React.ComponentPropsWithRef<"button">, "size" | "value">,
    Omit<ComponentAnatomy<typeof DateRangePickerAnatomy>, "rootClass">,
    InputStyling,
    BasicFieldOptions {
    /**
     * The selected date
     */
    value?: DateRange
    /**
     * Default selected end date
     */
    defaultTo?: Date
    /**
     * Callback fired when the selected date changes
     */
    onValueChange?: (value: DateRange | undefined) => void
    /**
     * The placeholder text
     */
    placeholder?: string
    /**
     * The locale for formatting the date
     */
    locale?: Locale
    /**
     * Props to pass to the calendar
     *
     * This is useful for setting the min and max dates
     */
    pickerOptions?: Partial<Omit<React.ComponentProps<typeof Calendar>, "locale" | "mode">>
}

export const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>((props, ref) => {

    const [props1, basicFieldProps] = extractBasicFieldProps<DateRangePickerProps>(props, React.useId())

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
        ...rest
    }, {
        inputContainerProps,
        leftAddonProps,
        leftIconProps,
        rightAddonProps,
        rightIconProps,
    }] = extractInputPartProps<DateRangePickerProps>({
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

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: undefined,
    })

    const handleOnSelect = React.useCallback((date: DateRange | undefined) => {
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
                DateRangePickerAnatomy.root(),
                className,
            )}
            disabled={basicFieldProps.disabled || basicFieldProps.readonly}
            data-disabled={basicFieldProps.disabled}
            data-readonly={basicFieldProps.readonly}
            {...rest}
        >
            {date?.from ? (
                date.to ? <span className="line-clamp-1">{`${format(date.from, "PPP")} - ${format(date.to, "PPP")}`}</span> : format(date.from, "PPP")
            ) : <span className={cn(DateRangePickerAnatomy.placeholder(), placeholderClass)}>{placeholder || "Select a date"}</span>}
        </button>
    )

    const Picker = (
        <Calendar
            captionLayout="dropdown-buttons"
            mode="range"
            defaultMonth={date?.from ?? new Date()}
            selected={date}
            onSelect={handleOnSelect}
            locale={locale}
            initialFocus
            tableClass="w-auto mx-auto"
            numberOfMonths={2}
        />
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

DateRangePicker.displayName = "DateRangePicker"
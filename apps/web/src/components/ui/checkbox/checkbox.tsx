"use client"

import { cn } from "@rahimstack/tailwind-utils"
import * as checkbox from "@zag-js/checkbox"
import { normalizeProps, useMachine } from "@zag-js/react"
import { cva, VariantProps } from "class-variance-authority"
import React, { useEffect, useId, useMemo } from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { ComponentWithAnatomy, defineStyleAnatomy } from "../core"
import { useCheckboxGroupContext } from "./checkbox-group"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const CheckboxAnatomy = defineStyleAnatomy({
    control: cva([
        "UI-Checkbox__control",
        "inline-flex justify-center items-center border rounded cursor-pointer transition duration-10",
        // Light
        "bg-white border-gray-300 hover:bg-brand-100 hover:text-brand-100",
        "data-checked:bg-brand-500 data-checked:border-brand-500",
        "data-disabled:bg-gray-100 data-disabled:border-gray-200 data-disabled:cursor-default",
        "data-disabled:data-checked:bg-brand-100  data-disabled:data-checked:border-brand-100",
        // Dark
        "dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700",
        "dark:data-checked:bg-brand-500 dark:data-disabled:bg-gray-800 dark:data-disabled:border-gray-800",
    ], {
        variants: {
            size: {
                md: "h-5 w-5 text-xs",
                lg: "h-6 w-6 text-sm",
            },
            hasError: {
                true: "border-red-500 dark:border-red-500",
                false: null,
            },
        },
        defaultVariants: {
            size: "md",
        },
    }),
    label: cva([
        "UI-Checkbox_label",
        "font-normal",
        "data-disabled:text-gray-300",
    ], {
        variants: {
            size: {
                md: "text-md",
                lg: "text-lg",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }),
    rootLabel: cva("UI-Checkbox__rootLabel inline-flex gap-2 items-center"),
    icon: cva("UI-Checkbox__icon text-white", {
        variants: {
            untouchable: {
                true: null,
                false: null,
            },
            isChecked: {
                true: null,
                false: null,
            },
        },
        compoundVariants: [
            { untouchable: true, isChecked: false, className: "text-gray-100 dark:text-gray-800 dark:opacity-0" },
            { untouchable: true, isChecked: true, className: "text-gray-100 dark:text-gray-800" },
            { untouchable: false, isChecked: false, className: "dark:opacity-0" },
        ],
    }),
})

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * -----------------------------------------------------------------------------------------------*/

export interface CheckboxProps extends ComponentWithAnatomy<typeof CheckboxAnatomy>, VariantProps<typeof CheckboxAnatomy.label>,
    BasicFieldOptions {
    defaultChecked?: boolean
    onChange?: (value: boolean | "indeterminate") => void
    value?: string
    checked?: boolean
    controlClassName?: string
    labelClassName?: string
    rootLabelClassName?: string
    noErrorMessage?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {

    const [{
        size = "md",
        value,
        checked,
        defaultChecked = false,
        noErrorMessage = false,
        onChange,
        controlClassName,
        labelClassName,
        rootLabelClassName,
        iconClassName,
    }, { id, error, label, ...basicFieldProps }] = extractBasicFieldProps<CheckboxProps>(props, useId())

    const groupContext = useCheckboxGroupContext()

    const _default = useMemo(() => {
        return checked ?? defaultChecked
    }, [])

    const [state, send] = useMachine(checkbox.machine({
        id: id,
        name: basicFieldProps.name,
        disabled: basicFieldProps.isDisabled,
        // @ts-expect-error zag.js type error
        readOnly: basicFieldProps.isReadOnly,
        checked: _default, // Set default value
        onChange({ checked }) {
            onChange && onChange(checked)
        },
    }))

    const api = checkbox.connect(state, send, normalizeProps)

    const _size = groupContext?.group_size ?? size

    // Control the state
    useEffect(() => {
        if (checked !== undefined) api.setChecked(checked)
    }, [checked])

    return (
        <>
            <BasicField
                id={api.inputProps.id}
                error={noErrorMessage ? undefined : error} // The error message hidden when `noErrorMessage` is defined
                {...basicFieldProps} // We do not include the id, label and error
            >
                <label className={cn(CheckboxAnatomy.rootLabel(), rootLabelClassName)} {...api.rootProps}>
                    <input type="checkbox" {...api.inputProps} ref={ref}/>
                    <div
                        className={cn(
                            CheckboxAnatomy.control({ size: _size, hasError: !!error }),
                            controlClassName,
                        )} {...api.controlProps}>
                        <span>
                         <svg
                             className={cn(CheckboxAnatomy.icon({
                                 untouchable: !!basicFieldProps.isDisabled, isChecked: api.isChecked,
                             }), iconClassName)}
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" stroke="currentColor"
                             fill="currentColor"
                         >
                            <path
                                fill="#fff"
                                d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
                            ></path>
                         </svg>
                        </span>
                    </div>
                    {(!!label || !!value) && <span
                        className={cn(
                            CheckboxAnatomy.label({ size: _size }),
                            labelClassName,
                        )}
                        {...api.labelProps}
                    >
                  {label ?? value}
               </span>}
                </label>
            </BasicField>
        </>
    )

})

Checkbox.displayName = "Checkbox"

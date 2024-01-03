"use client"

import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva } from "class-variance-authority"
import * as React from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const SwitchAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-Switch__root",
        "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors",
        "disabled:cursor-not-allowed data-[disabled=true]:opacity-50",
        "outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-1",
        "data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700", // Unchecked
        "data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:hover:bg-gray-600", // Unchecked hover
        "data-[state=checked]:bg-brand", // Checked
        "data-[error=true]:border-red-500", // Checked
    ]),
    container: cva([
        "UI-Checkbox__container",
        "inline-flex gap-2 items-center",
    ]),
    thumb: cva([
        "UI-Switch__thumb",
        "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
        "data-[state=checked]:translate-x-[1.4rem] data-[state=unchecked]:translate-x-1",
    ]),
    label: cva([
        "UI-Switch__label",
        "relative font-normal",
        "data-[disabled=true]:text-gray-300",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * Switch
 * -----------------------------------------------------------------------------------------------*/

export interface SwitchProps extends BasicFieldOptions,
    Omit<ComponentAnatomy<typeof SwitchAnatomy>, "rootClass">,
    Omit<typeof SwitchPrimitive.Root, "value" | "checked" | "disabled" | "required" | "onCheckedChange" | "onChange"> {
    value: boolean
    onChange: (value: boolean) => void
    formValue?: string
    className?: string
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {

    const [{
        value,
        formValue,
        className,
        onChange,
        labelClass,
        containerClass,
        thumbClass,
        ...rest
    }, { label, ...basicFieldProps }] = extractBasicFieldProps(props, React.useId())

    return (
        <BasicField{...basicFieldProps} id={basicFieldProps.id}>
            <div className={cn(SwitchAnatomy.container(), containerClass)}>
                <SwitchPrimitive.Root
                    ref={ref}
                    id={basicFieldProps.id}
                    className={cn(SwitchAnatomy.root(), className)}
                    disabled={basicFieldProps.disabled || basicFieldProps.readonly}
                    data-disabled={basicFieldProps.disabled}
                    data-readonly={basicFieldProps.readonly}
                    required={basicFieldProps.required}
                    data-error={!!basicFieldProps.error}
                    checked={value}
                    value={formValue || (value ? "on" : "off")}
                    onCheckedChange={onChange}
                    {...rest}
                >
                    <SwitchPrimitive.Thumb className={cn(SwitchAnatomy.thumb(), thumbClass)} />
                </SwitchPrimitive.Root>
                {!!label && <label
                    className={cn(SwitchAnatomy.label(), labelClass)}
                    htmlFor={basicFieldProps.id}
                    data-disabled={basicFieldProps.disabled}
                >
                    {label}
                </label>}
            </div>
        </BasicField>
    )

})

Switch.displayName = "Switch"

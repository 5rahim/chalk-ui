"use client"

import * as React from "react"
import { Checkbox, CheckboxProps } from "."
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { cn } from "../core/classnames"


/* -------------------------------------------------------------------------------------------------
 * Provider
 * -----------------------------------------------------------------------------------------------*/

type CheckboxGroupContextValue = {
    group_size: CheckboxProps["size"]
}

export const _CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null)

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroup
 * -----------------------------------------------------------------------------------------------*/

export interface CheckboxGroupProps extends BasicFieldOptions {
    value?: string[]
    defaultValue?: string[]
    onValueChange: (value: string[]) => void
    size?: CheckboxProps["size"]
    stackClass?: string
    itemContainerClass?: string
    itemLabelClass?: string
    itemClass?: string
    itemCheckIconClass?: string
    options: { value: string, label?: React.ReactNode, disabled?: boolean, readonly?: boolean }[]
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {

    const [{
        value,
        defaultValue = [],
        onValueChange,
        stackClass,
        itemLabelClass,
        itemClass,
        itemContainerClass,
        itemCheckIconClass,
        options,
        size = undefined,
    }, basicFieldProps] = extractBasicFieldProps<CheckboxGroupProps>(props, React.useId())

    // Keep track of selected values
    const [selectedValues, setSelectedValues] = React.useState<string[]>(value ?? defaultValue)

    // Control the state
    React.useLayoutEffect(() => {
        if (value) {
            setSelectedValues(value)
        }
    }, [value])


    return (
        <_CheckboxGroupContext.Provider
            value={{
                group_size: size,
            }}
        >
            <BasicField
                {...basicFieldProps}
                ref={ref}
            >
                <div className={cn("space-y-1", stackClass)}>
                    {options.map((opt) => (
                        <Checkbox
                            key={opt.value}
                            label={opt.label}
                            value={selectedValues.includes(opt.value)}
                            onValueChange={checked => {
                                setSelectedValues(p => {
                                    const newArr = checked === true
                                        ? [...p, ...(p.includes(opt.value) ? [] : [opt.value])]
                                        : checked === false
                                            ? p.filter(v => v !== opt.value)
                                            : [...p]
                                    onValueChange(newArr)
                                    return newArr
                                })
                            }}
                            hideError
                            error={basicFieldProps.error}
                            className={itemClass}
                            labelClass={itemLabelClass}
                            containerClass={itemContainerClass}
                            checkIconClass={itemCheckIconClass}
                            disabled={basicFieldProps.disabled || opt.disabled}
                            readonly={basicFieldProps.readonly || opt.readonly}
                            tabIndex={0}
                        />
                    ))}
                </div>
            </BasicField>
        </_CheckboxGroupContext.Provider>
    )

})

CheckboxGroup.displayName = "CheckboxGroup"

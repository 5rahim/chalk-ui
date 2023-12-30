"use client"

import React, { createContext, useContext, useId, useLayoutEffect, useState } from "react"
import { Checkbox, CheckboxProps } from "."
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { cn } from "../core/classnames"


/* -------------------------------------------------------------------------------------------------
 * Provider
 * -----------------------------------------------------------------------------------------------*/

interface CheckboxGroupContextValue {
    group_size: CheckboxProps["size"]
}

const _CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)
export const CheckboxGroupProvider = _CheckboxGroupContext.Provider
export const useCheckboxGroupContext = () => useContext(_CheckboxGroupContext)

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroup
 * -----------------------------------------------------------------------------------------------*/

export interface CheckboxGroupProps extends BasicFieldOptions {
    value?: string[]
    defaultValue?: string[]
    onChange: (value: string[]) => void
    size?: CheckboxProps["size"]
    stackClass?: string
    checkboxContainerClass?: string
    checkboxLabelClass?: string
    checkboxControlClass?: string
    checkboxIconClass?: string
    options: { value: string, label?: React.ReactNode, disabled?: boolean, readonly?: boolean }[]
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {

    const [{
        value,
        defaultValue = [],
        onChange,
        stackClass,
        checkboxLabelClass,
        checkboxControlClass,
        checkboxContainerClass,
        checkboxIconClass,
        options,
        size = undefined,
    }, basicFieldProps] = extractBasicFieldProps<CheckboxGroupProps>(props, useId())

    // Keep track of selected values
    const [selectedValues, setSelectedValues] = useState<string[]>(value ?? defaultValue)

    // Control the state
    useLayoutEffect(() => {
        if (value) {
            setSelectedValues(value)
        }
    }, [value])


    return (
        <>
            <CheckboxGroupProvider
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
                                value={opt.value}
                                checked={selectedValues.includes(opt.value)}
                                onChange={checked => {
                                    setSelectedValues(p => {
                                        const newArr = checked === true
                                            ? [...p, ...(p.includes(opt.value) ? [] : [opt.value])]
                                            : checked === false
                                                ? p.filter(v => v !== opt.value)
                                                : [...p]
                                        onChange(newArr)
                                        return newArr
                                    })
                                }}
                                hideError
                                error={basicFieldProps.error}
                                labelClass={checkboxLabelClass}
                                controlClass={checkboxControlClass}
                                containerClass={checkboxContainerClass}
                                iconClass={checkboxIconClass}
                                disabled={basicFieldProps.disabled || opt.disabled}
                                readonly={basicFieldProps.readonly || opt.readonly}
                                tabIndex={0}
                            />
                        ))}
                    </div>
                </BasicField>
            </CheckboxGroupProvider>
        </>
    )

})

CheckboxGroup.displayName = "CheckboxGroup"

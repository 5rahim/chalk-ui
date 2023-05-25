"use client"

import { cn } from "@rahimstack/tailwind-utils"
import React, { createContext, useContext, useEffect, useId, useState } from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { Checkbox, CheckboxProps } from "./checkbox"


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
    // Prop for controlling the state
    value?: string[]
    // Set the default value
    defaultValue?: string[]
    onChange?: (value: string[]) => void
    size?: CheckboxProps["size"]
    stackClassName?: string
    checkboxRootLabelClassName?: string
    checkboxLabelClassName?: string
    checkboxControlClassName?: string
    checkboxIconClassName?: string
    options: { value: string, label?: string }[]
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {

    const [{
        value,
        defaultValue = [],
        onChange,
        stackClassName,
        checkboxLabelClassName,
        checkboxControlClassName,
        checkboxRootLabelClassName,
        checkboxIconClassName,
        options,
        size = undefined,
    }, basicFieldProps] = extractBasicFieldProps<CheckboxGroupProps>(props, useId())

    // Keep track of selected values
    const [selectedValues, setSelectedValues] = useState<string[]>(value ?? defaultValue)

    // Control the state
    useEffect(() => {
        if (value) {
            setSelectedValues(value)
        }
    }, [value])

    // Emit changes
    useEffect(() => {
        console.log(selectedValues)
        if (onChange) {
            onChange(selectedValues)
        }
    }, [selectedValues])


    return (
        <>
            <CheckboxGroupProvider value={{
                group_size: size
            }}>
                <BasicField
                    {...basicFieldProps}
                    ref={ref}
                >
                    <div className={cn("space-y-1", stackClassName)}>
                        {options.map((opt) => (
                            <Checkbox
                                key={opt.value}
                                label={opt.label}
                                value={opt.value}
                                checked={selectedValues.includes(opt.value)}
                                onChange={checked => {
                                    console.log("Changing values")
                                    setSelectedValues(p => {
                                        let newArr = [...p]
                                        if (checked === true) {
                                            if (p.indexOf(opt.value) === -1) newArr.push(opt.value)
                                        } else if (checked === false) {
                                            newArr = newArr.filter(v => v !== opt.value)
                                        }
                                        return newArr
                                    })
                                }}
                                error={basicFieldProps.error}
                                noErrorMessage
                                labelClassName={checkboxLabelClassName}
                                controlClassName={checkboxControlClassName}
                                rootLabelClassName={checkboxRootLabelClassName}
                                iconClassName={checkboxIconClassName}
                                isDisabled={basicFieldProps.isDisabled}
                                isReadOnly={basicFieldProps.isReadOnly}
                            />
                        ))}
                    </div>
                </BasicField>
            </CheckboxGroupProvider>
        </>
    )

})

CheckboxGroup.displayName = "CheckboxGroup"

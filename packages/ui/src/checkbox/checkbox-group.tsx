"use client"

import { cn } from "@rahimstack/tailwind-utils"
import React, { createContext, useCallback, useContext, useEffect, useId, useState } from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from ".."
import { Checkbox, CheckboxProps } from "./checkbox"

interface CheckboxGroupContextValue {
   group_selectedValues: string[]
   group_size: CheckboxProps["size"]
   
   group_handleValueChange(value: string, isChecked: boolean | "indeterminate"): void
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)
export const CheckboxGroupProvider = CheckboxGroupContext.Provider
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext)


export interface CheckboxGroupProps extends BasicFieldOptions {
   defaultValues?: string[]
   onChange?: (values: string[]) => void
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
      defaultValues = [],
      onChange,
      stackClassName,
      checkboxLabelClassName,
      checkboxControlClassName,
      checkboxRootLabelClassName,
      checkboxIconClassName,
      options,
      size = undefined,
   }, basicFieldProps] = extractBasicFieldProps<CheckboxGroupProps>(props, useId())
   
   const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues)
   
   useEffect(() => {
      if (defaultValues !== selectedValues) {
         onChange && onChange(selectedValues)
      }
   }, [selectedValues])
   
   const handleValueChange = useCallback((value: string, isChecked: boolean | "indeterminate") => {
      setSelectedValues(p => {
         let newArr = [...p]
         if (isChecked === true) {
            if (p.indexOf(value) === -1) newArr.push(value)
         } else if (isChecked === false) {
            newArr = newArr.filter(v => v !== value)
         }
         return newArr
      })
   }, [selectedValues])
   
   return (
      <>
         <CheckboxGroupProvider value={{ group_selectedValues: selectedValues, group_handleValueChange: handleValueChange, group_size: size }}>
            <BasicField
               {...basicFieldProps}
               ref={ref}
            >
               <div className={cn("gap-1", stackClassName)}>
                  {options.map((opt) => (
                     <Checkbox
                        key={opt.value}
                        label={opt.label}
                        value={opt.value}
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

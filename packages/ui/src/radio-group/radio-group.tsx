"use client"

import { cn } from "@rahimstack/tailwind-utils"
import * as radio from "@zag-js/radio-group"
import { normalizeProps, useMachine } from "@zag-js/react"
import { cva, VariantProps } from "class-variance-authority"
import React, { useEffect, useId } from "react"
import { BasicField, BasicFieldOptions, defineStyleAnatomy, extractBasicFieldProps, useStyleLibrary } from ".."
import { ComponentWithAnatomy } from "../core"

export const RadioGroupAnatomy = defineStyleAnatomy({
   stack: cva("UI-RadioGroup__stack w-full space-y-1"),
   radioControl: cva([
      "UI-RadioGroup__radioControl",
      "inline-flex flex-none justify-center items-center border border-gray-300 rounded-full text-white bg-white cursor-pointer transition duration-10 relative",
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
   radioLabel: cva("UI-RadioGroup__radioLabel font-normal", {
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
   radioHelp: cva("UI-RadioGroup__radioHelp text-gray-500 data-disabled:text-gray-300"),
   radioWrapper: cva("UI-RadioGroup__radioWrapper inline-flex w-full gap-2 items-center relative"),
   radioIcon: cva("UI-RadioGroup__radioIcon text-white", {
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


export interface RadioGroupProps extends BasicFieldOptions, ComponentWithAnatomy<typeof RadioGroupAnatomy>,
   VariantProps<typeof RadioGroupAnatomy.radioLabel> {
   value?: string
   defaultValue?: string
   options: { value: string, label?: React.ReactNode, help?: React.ReactNode }[]
   onChange?: (value: string | null) => void
   checkedIcon?: React.ReactNode
}

export const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>((props, ref) => {
   
   const [{
      size = "md",
      value,
      defaultValue,
      onChange,
      options,
      stackClassName,
      radioLabelClassName,
      radioControlClassName,
      radioWrapperClassName,
      radioHelpClassName,
      radioIconClassName,
      checkedIcon,
   }, basicFieldProps] = extractBasicFieldProps<RadioGroupProps>(props, useId())
   
   const StyleLibrary = useStyleLibrary()
   
   const [state, send] = useMachine(radio.machine({
      id: basicFieldProps.id,
      value,
      name: basicFieldProps.name,
      disabled: basicFieldProps.isDisabled,
      readOnly: basicFieldProps.isReadOnly,
      onChange(details) {
         onChange && onChange(details.value)
      },
   }))
   
   const api = radio.connect(state, send, normalizeProps)
   
   useEffect(() => {
      if (!value && defaultValue) {
         api.setValue(defaultValue)
      }
   }, [])
   
   useEffect(() => {
      value && api.setValue(value)
   }, [value])
   
   return (
      <>
         <BasicField
            {...basicFieldProps}
            ref={ref}
         >
            <div className={cn(StyleLibrary.RadioGroup.stack(), stackClassName)} {...api.rootProps}>
               
               {options.map((opt) => (
                  
                  <label
                     key={opt.value}
                     {...api.getRadioProps({ value: opt.value })}
                     className={cn(
                        StyleLibrary.RadioGroup.radioWrapper(),
                        radioWrapperClassName,
                     )}
                  >
                     
                     <div
                        className={cn(
                           StyleLibrary.RadioGroup.radioControl({ size, hasError: !!basicFieldProps.error }),
                           radioControlClassName,
                        )}
                        {...api.getRadioControlProps({ value: opt.value })}>
                        {checkedIcon ? checkedIcon :
                           <span
                              className={cn(StyleLibrary.RadioGroup.radioIcon({
                                 untouchable: !!basicFieldProps.isDisabled, isChecked: api.value === opt.value,
                              }), radioIconClassName)}
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 16 16"
                                 width="16"
                                 height="16"
                                 stroke="currentColor"
                                 fill="currentColor"
                              >
                                 <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                              </svg>
                           </span>}
                     </div>
                     
                     <div
                        className={cn(
                           StyleLibrary.RadioGroup.radioLabel({ size }),
                           radioLabelClassName,
                        )}
                        {...api.getRadioLabelProps({ value: opt.value })}
                     >
                        {opt.label ?? opt.value}
                     </div>
                     
                     {!!opt.help && <div
                         className={cn(
                            StyleLibrary.RadioGroup.radioLabel(),
                            radioHelpClassName,
                         )}
                         {...api.getRadioLabelProps({ value: opt.value })}
                     >
                        {opt.help}
                     </div>}
                     
                     <input {...api.getRadioInputProps({ value: opt.value })} ref={ref} />
                  
                  </label>
               
               ))}
            
            </div>
         </BasicField>
      </>
   )
   
})

RadioGroup.displayName = "RadioGroup"

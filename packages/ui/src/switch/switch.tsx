"use client"

import { cn } from "@rahimstack/tailwind-utils"
import * as checkbox from "@zag-js/checkbox"
import { normalizeProps, useMachine } from "@zag-js/react"
import { cva, VariantProps } from "class-variance-authority"
import React, { useId, useState } from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { ComponentWithAnatomy, defineStyleAnatomy } from "../core"

export const SwitchAnatomy = defineStyleAnatomy({
   controlWrapper: cva("UI-Switch__controlWrapper relative h-8 w-14 overflow-hidden cursor-pointer flex-none", {
      variants: {
         size: {
            sm: "h-5 w-8",
            md: "h-6 w-10",
            lg: "h-7 w-12",
         },
      },
      defaultVariants: {
         size: "md",
      },
   }),
   rootLabel: cva("UI-Switch__rootLabel relative inline-flex gap-2 items-center flex-none"),
   control: cva([
         "UI-Switch__control border",
         // Light
         "absolute inset-0 rounded-full bg-gray-300 border-gray-300 transition",
         "data-checked:bg-brand-500 data-checked:border-brand-500",
         "hover:bg-gray-400 hover:border-gray-400",
         "data-disabled:bg-gray-200 data-disabled:text-gray-200 data-disabled:cursor-default",
         // Dark
         "dark:bg-gray-700 dark:hover:bg-gray-600",
         "dark:border-gray-700 dark:hover:border-gray-600",
         "dark:data-disabled:bg-gray-800 dark:data-disabled:border-gray-800 dark:data-disabled:hover:bg-gray-800 dark:data-disabled:hover:border-gray-800",
         
         "dark:data-checked:bg-brand-500 dark:data-checked:border-brand-500",
      ],
      {
         variants: {
            hasError: {
               true: "border-red-500 dark:border-red-500",
               false: null,
            },
         },
         defaultVariants: {
            hasError: true,
         },
      }),
   controlKnob: cva("UI-Switch__controlKnob absolute inset-0 rounded-full bg-white transition dark:data-disabled:bg-gray-500", {
      variants: {
         size: {
            sm: "m-1 h-3 w-3 data-checked:translate-x-3",
            md: "m-1 h-4 w-4 data-checked:translate-x-4",
            lg: "m-1 h-5 w-5 data-checked:translate-x-5",
         },
      },
      defaultVariants: {
         size: "md",
      },
   }),
   label: cva([
      "UI-Switch__label",
      "relative font-normal",
      "data-disabled:text-gray-300",
   ], {
      variants: {
         size: {
            sm: "text-sm",
            md: "text-md",
            lg: "text-lg",
         },
      },
      defaultVariants: {
         size: "md",
      },
   }),
})

export interface SwitchProps
   extends ComponentWithAnatomy<typeof SwitchAnatomy>,
      VariantProps<typeof SwitchAnatomy.controlWrapper>,
      BasicFieldOptions {
   defaultChecked?: boolean
   value?: string
   onChange?: (value: boolean) => void
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
   
   const [{
      size = "md",
      defaultChecked = false,
      value,
      onChange,
      controlClassName,
      labelClassName,
      rootLabelClassName,
      controlWrapperClassName,
      controlKnobClassName,
   }, { label, ...basicFieldProps }] = extractBasicFieldProps(props, useId())
   
   const [control, setControl] = useState<boolean>(defaultChecked)
   
   const [state, send] = useMachine(checkbox.machine({
      id: basicFieldProps.id,
      name: basicFieldProps.name,
      disabled: basicFieldProps.isDisabled,
      readOnly: basicFieldProps.isReadOnly,
      checked: control,
      onChange({ checked: UNUSED_checked }) {
         /**
          * /!\ Use React to control that state of the component
          * since the value provided by the machine's `onChange` is duplicated
          */
         
         setControl(s => {
            onChange && onChange(!s)
            return !s
         })
         
         // if(typeof checked === 'boolean') {
         //    onChange && onChange(checked)
         // }
      },
   }))
   
   const api = checkbox.connect(state, send, normalizeProps)
   
   return (
      <>
         <BasicField
            {...basicFieldProps} // We do not include the label
            id={api.inputProps.id}
         >
            <label className={cn(SwitchAnatomy.rootLabel(), rootLabelClassName)} {...api.rootProps}>
               <input type="checkbox" {...api.inputProps} ref={ref} />
               
               <div
                  className={cn(
                     SwitchAnatomy.controlWrapper({ size }),
                     controlWrapperClassName,
                  )}
               >
                  
                  <span
                     className={cn(
                        SwitchAnatomy.control({ hasError: !!basicFieldProps.error }),
                        controlClassName,
                     )} {...api.controlProps} />
                  <span
                     className={cn(
                        SwitchAnatomy.controlKnob({ size }),
                        controlKnobClassName,
                     )}
                     {...api.controlProps}
                  />
               </div>
               
               
               {(!!label || !!value) && <span
                   className={cn(
                      SwitchAnatomy.label({ size }),
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

Switch.displayName = "Switch"

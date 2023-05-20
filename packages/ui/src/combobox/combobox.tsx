"use client"

import { cn } from "@rahimstack/tailwind-utils"
import * as combobox from "@zag-js/combobox"
import { normalizeProps, useMachine } from "@zag-js/react"
import { cva } from "class-variance-authority"
import _find from "lodash/find"
import _isEmpty from "lodash/isEmpty"
import React, { useEffect, useId, useMemo, useState } from "react"
import {
   BasicField, BasicFieldOptions, defineStyleAnatomy, extractBasicFieldProps, InputAddon, inputContainerStyle, InputIcon, InputStyling,
   useStyleLibrary,
} from ".."
import { ComponentWithAnatomy } from "../core"

export const ComboboxAnatomy = defineStyleAnatomy({
   menuContainer: cva([
      "UI-Combobox__menuContainer",
      "absolute z-20 -bottom-0.5",
      "left-0 translate-y-full max-h-56 w-full overflow-auto rounded-md p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
      // Light
      "bg-white",
      // Dark
      "dark:bg-gray-800",
   ]),
   menuItem: cva([
      "UI-Combobox__menuItem",
      "relative cursor-pointer py-2 pl-3 pr-9 rounded-md data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-700 text-base",
   ]),
   menuNoOptionText: cva([
      "UI-Combobox__menuNoOptionText",
      "text-base text-center py-1 text-gray-500 dark:text-gray-700",
   ]),
})

export interface ComboboxProps extends Omit<React.ComponentPropsWithRef<"input">, "onChange" | "size" | "defaultChecked">,
   BasicFieldOptions,
   InputStyling,
   ComponentWithAnatomy<typeof ComboboxAnatomy> {
   options: { value: string, label?: string }[]
   /* Filter the specified options as the user is typing */
   withFiltering?: boolean
   /* Get the value on of the input as the user is typing */
   onInputChange?: (value: string) => void
   /* Get the selected value */
   onChange?: (value: string | undefined) => void
   placeholder?: string
   /* Message to display when there is no option */
   noOptionsMessage?: string
   /* Allow the user to enter custom values that are not specified in the options */
   allowCustomValue?: boolean
   /* Either value or label */
   defaultValue?: string
   valueInputRef?: React.Ref<HTMLInputElement>
   /**
    * We can either return the value or label of the options.
    * Returning the label is useful when you allow users to put custom values or if the selection doesn't depend on IDs but the visible text.
    */
   returnValueOrLabel?: "value" | "label"
}

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>((props, ref) => {
   
   const [{
      size,
      intent,
      leftIcon,
      leftAddon,
      rightIcon,
      rightAddon,
      children,
      className,
      options,
      withFiltering = true,
      placeholder,
      noOptionsMessage,
      allowCustomValue = false,
      onInputChange,
      valueInputRef,
      defaultValue,
      onChange,
      value, // /!\ Unused
      returnValueOrLabel = "value",
      menuContainerClassName,
      menuItemClassName,
      menuNoOptionTextClassName,
      ...rest
   }, { id, ...basicFieldProps }] = extractBasicFieldProps<ComboboxProps>(props, useId())
   
   const StyleLibrary = useStyleLibrary()
   
   const [data, setData] = useState(options)
   
   const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)
   
   const [state, send] = useMachine(
      combobox.machine({
         id: useId(),
         allowCustomValue: allowCustomValue,
         inputBehavior: "autohighlight",
         openOnClick: true,
         loop: true,
         blurOnSelect: true,
         placeholder: placeholder,
         onOpen() {
            setData(options)
         },
         onSelect: (details) => {
            if (returnValueOrLabel === "value") {
               setSelectedValue(details.value)
               onChange && onChange(details.value)
               
            } else if (returnValueOrLabel === "label") {
               setSelectedValue(details.label)
               onChange && onChange(details.label)
            }
         },
         onInputChange({ value }) {
            if (withFiltering) {
               const filtered = options.filter((item) => {
                     if (item.label) {
                        return item.label.toLowerCase().includes(value.toLowerCase())
                     } else {
                        return item.value.toLowerCase().includes(value.toLowerCase())
                     }
                  },
               )
               setData(filtered.length > 0 ? filtered : data)
            }
            onInputChange && onInputChange(value)
         },
      }),
   )
   
   const api = combobox.connect(state, send, normalizeProps)
   
   useEffect(() => {
      if (returnValueOrLabel === "value") {
         if (defaultValue) {
            setSelectedValue(defaultValue)
            api.setInputValue(_find(options, ["value", defaultValue])?.label ?? "")
            api.setValue(_find(options, ["value", defaultValue])?.value ?? "")
         }
      }
      if (returnValueOrLabel === "label") {
         if (defaultValue) {
            setSelectedValue(_find(options, ["label", defaultValue])?.value ?? defaultValue)
            api.setInputValue(_find(options, ["label", defaultValue])?.label ?? defaultValue)
            api.setValue(_find(options, ["label", defaultValue])?.value ?? defaultValue)
         }
      }
   }, [defaultValue])
   
   const list = useMemo(() => {
      return withFiltering ? data : options
   }, [options, withFiltering, data])
   
   return (
      <>
         <BasicField
            {...basicFieldProps}
            id={api.inputProps.id}
            ref={ref}
         >
            <input type="text" hidden value={selectedValue ?? ""} onChange={() => {}} ref={valueInputRef} />
            
            <div {...api.rootProps}>
               <div {...api.controlProps} className={cn(inputContainerStyle())}>
                  
                  <InputAddon addon={leftAddon} rightIcon={rightIcon} leftIcon={leftIcon} size={size} side={"left"} />
                  <InputIcon icon={leftIcon} size={size} side={"left"} props={api.triggerProps} />
                  
                  <input
                     className={cn(
                        "unstyled",
                        StyleLibrary.Input.input({
                           size,
                           intent,
                           hasError: !!basicFieldProps.error,
                           untouchable: !!basicFieldProps.isDisabled,
                           hasRightAddon: !!rightAddon,
                           hasRightIcon: !!rightIcon,
                           hasLeftAddon: !!leftAddon,
                           hasLeftIcon: !!leftIcon,
                        }),
                     )}
                     onBlur={() => {
                        /* If we do not allow custom values and the user blurs the input, we reset the input */
                        if (!allowCustomValue) {
                           if (options.length === 0 && !api.selectedValue || (api.selectedValue && api.selectedValue.length === 0)) {
                              api.setInputValue("")
                           }
                           
                           if (
                              options.length > 0 &&
                              (!_isEmpty(_find(options, ["value", api.selectedValue])?.label)
                                 || !_isEmpty(_find(options, ["value", api.selectedValue])?.value)
                              )
                           ) {
                              api.selectedValue && api.setValue(api.selectedValue)
                           }
                        }
                     }}
                     {...rest}
                     ref={ref}
                     {...api.inputProps}
                  />
                  
                  <InputAddon addon={rightAddon} rightIcon={rightIcon} leftIcon={leftAddon} size={size} side={"right"} />
                  <InputIcon icon={rightIcon} size={size} side={"right"} props={api.triggerProps} />
               
               </div>
            </div>
            
            {/* Menu */}
            <div {...api.positionerProps} className="z-10">
               {(!!noOptionsMessage || list.length > 0) && (
                  <ul
                     className={cn(StyleLibrary.Combobox.menuContainer(), menuContainerClassName)}
                     {...api.contentProps}
                  >
                     {(list.length === 0 && !!noOptionsMessage) &&
                         <div className={cn(StyleLibrary.Combobox.menuNoOptionText(), menuNoOptionTextClassName)}>{noOptionsMessage}</div>}
                     {list.map((item, index) => (
                        <li
                           className={cn(
                              StyleLibrary.Combobox.menuItem(),
                              menuItemClassName,
                           )}
                           key={`${item.value}:${index}`}
                           {...api.getOptionProps({
                              label: item.label ?? item.value,
                              value: item.value,
                              index,
                              disabled: basicFieldProps.isDisabled,
                           })}
                        >
                           {item.label}
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         </BasicField>
      </>
   )
   
})

Combobox.displayName = "Combobox"

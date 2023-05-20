"use client"

import { cn } from "@rahimstack/tailwind-utils"
import { CountryCode, E164Number } from "libphonenumber-js"
import React, { useId } from "react"
import PhoneInput from "react-phone-number-input"
import { BasicField, extractBasicFieldProps, InputAddon, inputContainerStyle, InputIcon, TextInputProps, useStyleLibrary } from ".."

export interface PhoneNumberInputProps extends Omit<TextInputProps, "value" | "onChange"> {
   value?: string | null | undefined
   onChange?: (value: E164Number | undefined) => void
   defaultCountry?: CountryCode
   countrySelectRef?: React.Ref<HTMLSelectElement>
}

export type { CountryCode, E164Number }

export const PhoneNumberInput = React.forwardRef<HTMLInputElement, PhoneNumberInputProps>((props, ref) => {
   
   const [{
      className,
      size = "md",
      intent = "basic",
      value,
      onChange,
      defaultCountry = "US",
      leftIcon,
      leftAddon,
      rightAddon,
      rightIcon,
      countrySelectRef,
   }, basicFieldProps] = extractBasicFieldProps<PhoneNumberInputProps>(props, useId())
   
   const StyleLibrary = useStyleLibrary()
   
   return (
      <>
         <BasicField
            className={cn("w-full gap-1")}
            {...basicFieldProps}
         >
            
            <div className={cn(inputContainerStyle())}>
               
               <InputAddon addon={leftAddon} rightIcon={rightIcon} leftIcon={leftIcon} size={size} side={"left"} />
               <InputIcon icon={leftIcon} size={size} side={"left"} />
               
               <PhoneInput
                  id={basicFieldProps.id}
                  className={cn(
                     "flex w-full relative",
                     className,
                  )}
                  defaultCountry={defaultCountry as CountryCode}
                  addInternationalOption={false}
                  control={null}
                  style={{ display: "flex", position: "relative" }}
                  countrySelectProps={{
                     className: cn(
                        "form-select",
                        StyleLibrary.Input.input({
                           size,
                           intent,
                           hasError: !!basicFieldProps.error,
                           untouchable: !!basicFieldProps.isDisabled,
                           hasRightAddon: !!rightAddon,
                           // hasRightIcon: !!rightIcon,
                           hasLeftAddon: !!leftAddon,
                           hasLeftIcon: !!leftIcon,
                        }),
                        "flex-none w-[4.5rem] truncate rounded-r-none border-r-transparent",
                     ),
                     disabled: basicFieldProps.isDisabled,
                     // ref: countrySelectRef, /!\ Bug where ref is undefined when we pass it
                  }}
                  numberInputProps={{
                     className: cn(
                        "form-input",
                        StyleLibrary.Input.input({
                           size,
                           intent,
                           hasError: !!basicFieldProps.error,
                           untouchable: !!basicFieldProps.isDisabled,
                           hasRightAddon: !!rightAddon,
                           hasRightIcon: !!rightIcon,
                           hasLeftAddon: !!leftAddon,
                           // hasLeftIcon: !!leftIcon,
                        }),
                        "rounded-l-none border-l-transparent",
                     ),
                     disabled: basicFieldProps.isDisabled,
                     // ref: ref, /!\ Bug where ref is undefined when we pass it
                  }}
                  flagComponent={(flag) => (
                     <img
                        className="w-6 absolute h-full inset-y-0 ml-3"
                        src={flag.flagUrl?.replace("{XX}", flag.country)}
                     />
                  )}
                  value={value as E164Number}
                  onChange={value => {
                     onChange && onChange(value)
                  }}
                  // ref={ref as any}
               />
               
               <InputAddon addon={rightAddon} rightIcon={rightIcon} leftIcon={leftAddon} size={size} side={"right"} />
               <InputIcon icon={rightIcon} size={size} side={"right"} />
            
            </div>
         
         </BasicField>
      </>
   )
   
})

PhoneNumberInput.displayName = "PhoneNumberInput"

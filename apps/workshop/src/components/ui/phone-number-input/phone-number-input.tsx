"use client"

import { cn } from "../core"
import { CountryCode, E164Number } from "libphonenumber-js"
import React, { useId } from "react"
import PhoneInput from "react-phone-number-input"
import { BasicField, extractBasicFieldProps } from "../basic-field"
import { InputAddon, InputAnatomy, inputContainerStyle, InputIcon } from "../input"
import type { TextInputProps } from "../text-input"

/* -------------------------------------------------------------------------------------------------
 * PhoneNumberInput
 * -----------------------------------------------------------------------------------------------*/

export interface PhoneNumberInputProps extends Omit<TextInputProps, "value" | "onChange"> {
    value?: string | null | undefined
    onChange?: (value: E164Number | undefined) => void
    defaultCountry?: CountryCode
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
    }, basicFieldProps] = extractBasicFieldProps<PhoneNumberInputProps>(props, useId())

    return (
        <>
            <BasicField
                className={cn("w-full gap-1")}
                {...basicFieldProps}
            >

                <div className={cn(inputContainerStyle())}>

                    <InputAddon addon={leftAddon} rightIcon={rightIcon} leftIcon={leftIcon} size={size} side={"left"}/>
                    <InputIcon icon={leftIcon} size={size} side={"left"}/>

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
                                InputAnatomy.input({
                                    size,
                                    intent,
                                    hasError: !!basicFieldProps.error,
                                    untouchable: !!basicFieldProps.isDisabled,
                                    hasRightAddon: !!rightAddon,
                                    // hasRightIcon: !!rightIcon, /!\ Not included
                                    hasLeftAddon: !!leftAddon,
                                    hasLeftIcon: !!leftIcon,
                                }),
                                "flex-none w-[4.5rem] truncate rounded-r-none border-r-transparent",
                            ),
                            disabled: basicFieldProps.isDisabled,
                        }}
                        numberInputProps={{
                            className: cn(
                                "form-input",
                                InputAnatomy.input({
                                    size,
                                    intent,
                                    hasError: !!basicFieldProps.error,
                                    untouchable: !!basicFieldProps.isDisabled,
                                    hasRightAddon: !!rightAddon,
                                    hasRightIcon: !!rightIcon,
                                    hasLeftAddon: !!leftAddon,
                                    // hasLeftIcon: !!leftIcon, /!\ Not included
                                }),
                                "rounded-l-none border-l-transparent",
                            ),
                            disabled: basicFieldProps.isDisabled,
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
                    />

                    <InputAddon addon={rightAddon} rightIcon={rightIcon} leftIcon={leftAddon} size={size}
                                side={"right"}/>
                    <InputIcon icon={rightIcon} size={size} side={"right"}/>

                </div>

            </BasicField>
        </>
    )

})

PhoneNumberInput.displayName = "PhoneNumberInput"

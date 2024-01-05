"use client"

import { cva } from "class-variance-authority"
import { CountryCode, E164Number } from "libphonenumber-js"
import * as React from "react"
import PhoneInputPrimitive, { Country } from "react-phone-number-input"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { cn } from "../core/classnames"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"
import { extractInputPartProps, InputAddon, InputAnatomy, InputContainer, InputIcon, InputStyling } from "../input"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

const PhoneInputAnatomy = defineStyleAnatomy({
    root: cva([
        "UI-PhoneInput__root",
        "rounded-l-none z-[2]",
    ]),
    container: cva([
        "UI-PhoneInput__container",
        "relative flex items-center w-full",
    ]),
    countrySelect: cva([
        "UI-PhoneInput__countrySelect",
        "w-[3rem] z-[3] relative flex-none cursor-pointer truncate rounded-r-none border-r-transparent opacity-0",
        "focus-visible:opacity-100 transition duration-200 ease-in-out",
    ], {
        variants: {
            hasLeftAddon: {
                true: "rounded-l-none",
                false: null,
            },
        },
    }),
    flagSelect: cva([
        "UI-PhoneInput__flagSelect",
        "absolute top-0 left-0 w-[3rem] z-[0] flex-none cursor-pointer truncate rounded-r-none border-r-0",
    ], {
        variants: {
            hasLeftAddon: {
                true: "rounded-l-none border-l-0",
                false: null,
            },
        },
    }),
    flagImage: cva([
        "UI-PhoneInput__flagImage",
        "w-6 absolute h-full inset-y-0 z-[0]",
    ]),
})

/* -------------------------------------------------------------------------------------------------
 * PhoneInput
 * -----------------------------------------------------------------------------------------------*/

export interface PhoneInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "value" | "size">,
    Omit<ComponentAnatomy<typeof PhoneInputAnatomy>, "rootClass">,
    InputStyling,
    BasicFieldOptions {
    /**
     * The phone number value.
     */
    value: string | null | undefined
    /**
     * The default country to select if the value is empty.
     */
    defaultCountry?: CountryCode
    /**
     * Callback when the phone number value changes.
     */
    onValueChange: (value: E164Number | undefined) => void
    /**
     * Callback when the country changes.
     */
    onCountryChange?: (country: Country) => void
    /**
     * The countries to display in the dropdown.
     */
    countries?: CountryCode[]
}

export type { CountryCode, E164Number, Country }

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>((props, ref) => {

    const [props1, basicFieldProps] = extractBasicFieldProps<PhoneInputProps>(props, React.useId())

    const [{
        size,
        intent,
        rightAddon,
        rightIcon,
        leftAddon,
        leftIcon,
        className,
        value,
        onValueChange,
        defaultCountry,
        onCountryChange,
        countries,
        /**/
        countrySelectClass,
        flagSelectClass,
        flagImageClass,
        containerClass,
        ...rest
    }, {
        inputContainerProps,
        rightAddonProps,
        rightIconProps,
        leftIconProps,
        leftAddonProps,
    }] = extractInputPartProps<PhoneInputProps>({
        ...props1,
        size: props1.size ?? "md",
        intent: props1.intent ?? "basic",
        rightAddon: props1.rightAddon,
        rightIcon: props1.rightIcon,
    })

    const handleOnCountryChange = React.useCallback((country: Country) => {
        onCountryChange?.(country)
    }, [])


    return (
        <BasicField {...basicFieldProps}>
            <InputContainer {...inputContainerProps}>
                <InputAddon {...leftAddonProps} />
                {leftAddon && <InputIcon {...leftIconProps} />}

                <PhoneInputPrimitive
                    ref={ref as any}
                    id={basicFieldProps.id}
                    className={cn(
                        PhoneInputAnatomy.container(),
                        containerClass,
                    )}
                    countries={countries}
                    defaultCountry={defaultCountry}
                    onCountryChange={handleOnCountryChange}
                    addInternationalOption={false}
                    international={false}
                    disabled={basicFieldProps.disabled || basicFieldProps.readonly}
                    countrySelectProps={{
                        className: cn(
                            "form-select",
                            InputAnatomy.root({
                                size,
                                intent,
                                hasError: !!basicFieldProps.error,
                                isDisabled: !!basicFieldProps.disabled,
                                hasLeftAddon: !!leftAddon,
                                hasLeftIcon: !!leftIcon,
                            }),
                            PhoneInputAnatomy.countrySelect({
                                hasLeftAddon: !!leftAddon,
                            }),
                        ),
                        disabled: basicFieldProps.disabled || basicFieldProps.readonly,
                        "data-disabled": basicFieldProps.disabled,
                    }}
                    numberInputProps={{
                        className: cn(
                            "form-input",
                            InputAnatomy.root({
                                size,
                                intent,
                                hasError: !!basicFieldProps.error,
                                isDisabled: !!basicFieldProps.disabled,
                                hasRightAddon: !!rightAddon,
                                hasRightIcon: !!rightIcon,
                            }),
                            PhoneInputAnatomy.root(),
                            className,
                        ),
                        disabled: basicFieldProps.disabled || basicFieldProps.readonly,
                        "data-disabled": basicFieldProps.disabled,
                        ...rest,
                    }}
                    flagComponent={flag => (
                        <button
                            className={cn(
                                InputAnatomy.root({
                                    size,
                                    intent,
                                    hasError: !!basicFieldProps.error,
                                    isDisabled: !!basicFieldProps.disabled,
                                }),
                                PhoneInputAnatomy.flagSelect({
                                    hasLeftAddon: !!leftAddon,
                                }),
                                flagSelectClass,
                            )}
                            disabled={basicFieldProps.disabled || basicFieldProps.readonly}
                            data-disabled={basicFieldProps.disabled}
                            tabIndex={-1}
                        >
                            <img
                                aria-hidden="true"
                                className={cn(PhoneInputAnatomy.flagImage(), flagImageClass)}
                                src={flag.flagUrl?.replace("{XX}", flag.country)}
                                alt={flag.country}
                            />
                        </button>
                    )}
                    value={value as E164Number}
                    onChange={onValueChange}
                />

                <InputAddon {...rightAddonProps} />
                <InputIcon {...rightIconProps} />
            </InputContainer>
        </BasicField>
    )

})

PhoneInput.displayName = "PhoneInput"

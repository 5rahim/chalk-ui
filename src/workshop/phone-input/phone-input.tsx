"use client"

import { cva } from "class-variance-authority"
import { CountryCode, E164Number } from "libphonenumber-js"
import * as React from "react"
import PhoneInputPrimitive from "react-phone-number-input"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { cn } from "../core/classnames"
import { mergeRefs } from "../core/refs"
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
    ]),
    flagSelect: cva([
        "UI-PhoneInput__flagSelect",
        "absolute top-0 left-0 w-[3rem] z-[0] flex-none cursor-pointer truncate rounded-r-none border-r-0",
    ]),
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
    Omit<InputStyling, "leftIcon" | "leftAddon">,
    BasicFieldOptions {
    value: string | null | undefined
    onValueChange: (value: E164Number | undefined) => void
    defaultCountry?: CountryCode
    countrySelectRef?: React.Ref<HTMLSelectElement>
}

export type { CountryCode, E164Number }

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>((props, ref) => {

    const [props1, basicFieldProps] = extractBasicFieldProps<PhoneInputProps>(props, React.useId())

    const [{
        size,
        intent,
        rightAddon,
        rightIcon,
        className,
        value,
        onValueChange,
        defaultCountry,
        countrySelectRef,
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
    }] = extractInputPartProps<PhoneInputProps>({
        ...props1,
        size: props1.size ?? "md",
        intent: props1.intent ?? "basic",
        rightAddon: props1.rightAddon,
        rightIcon: props1.rightIcon,
    })

    const _countrySelectRef = React.useRef<HTMLSelectElement>(null)

    return (
        <BasicField {...basicFieldProps}>
            <InputContainer {...inputContainerProps}>

                <PhoneInputPrimitive
                    id={basicFieldProps.id}
                    className={cn(
                        PhoneInputAnatomy.container(),
                        containerClass,
                    )}
                    defaultCountry={defaultCountry as CountryCode}
                    addInternationalOption={false}
                    style={{ display: "flex", position: "relative" }}
                    disabled={basicFieldProps.disabled || basicFieldProps.readonly}
                    countrySelectProps={{
                        className: cn(
                            "form-select",
                            InputAnatomy.root({
                                size,
                                intent,
                                hasError: !!basicFieldProps.error,
                                isDisabled: !!basicFieldProps.disabled,
                            }),
                            PhoneInputAnatomy.countrySelect(),
                        ),
                        disabled: basicFieldProps.disabled || basicFieldProps.readonly,
                        "data-disabled": basicFieldProps.disabled,
                        ref: mergeRefs([countrySelectRef, _countrySelectRef]),
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
                        ref: ref,
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
                                PhoneInputAnatomy.flagSelect(),
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

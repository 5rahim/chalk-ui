"use client"

import Dinero, { Currency } from "dinero.js"
import React, { ChangeEvent, useCallback, useEffect, useId, useMemo, useState } from "react"
import { extractBasicFieldProps } from "../basic-field"
import { useUILocaleConfig } from "../core"
import { TextInput, TextInputProps } from "../text-input"
import { currencies } from "./currencies"


export interface PriceInputProps extends Omit<TextInputProps, "value" | "onChange" | "defaultValue"> {
   value?: number
   defaultValue?: number
   onChange?: (value: number) => void
   locale?: string
   currency?: Currency
}

export const PriceInput = React.forwardRef<HTMLInputElement, PriceInputProps>((props, ref) => {
   
   const [{
      value,
      defaultValue = 0,
      locale: _locale,
      currency: _currency,
      onChange,
      ...rest
   }, basicFieldProps] = extractBasicFieldProps<PriceInputProps>(props, useId())
   
   const { locale: lng, country } = useUILocaleConfig()
   
   const locale = useMemo(() => _locale ?? lng, [_locale, lng])
   const currency = useMemo(() => _currency ?? currencies[country], [_currency, country])
   
   const [amount, setAmount] = useState<number>(value ?? defaultValue)
   const [isEditing, setIsEditing] = useState(false)
   
   const dineroObject = Dinero({ amount: amount, currency }).setLocale(locale)
   
   const formattedValue = dineroObject.toFormat()
   
   const [inputValue, setInputValue] = useState(formatNumber(dineroObject.toUnit().toString(), locale))
   
   useEffect(() => {
      onChange && onChange((dineroObject.toUnit() * 100))
   }, [dineroObject])
   
   const localizedPattern = useCallback((value: string) => {
      let incorrectSeparator = ","
      // Locale that use ',' as separator add it to the condition: if(locale.includes('fr') || locales.includes('xx'))
      if (locale.includes("fr")) incorrectSeparator = "."
      return truncateAfterSecondDecimal(removeNonNumericCharacters(value)).replaceAll(incorrectSeparator, "")
   }, [locale])
   
   const toFloat = useCallback((value: string) => {
      return extractFloat(truncateAfterSecondDecimal(removeNonNumericCharacters(value)).replaceAll(",", "."))
   }, [])
   
   function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
      
      let _amount = 0
      let _value = ""
      try {
         _value = localizedPattern(event.target.value)
         _amount = _value.length > 0 ? toFloat(event.target.value) : 0
      }
      catch (e) {
         setInputValue("0")
         setAmount((_amount ?? 0) * 100)
      }
      setAmount(_amount * 100)
      setInputValue(_value)
   }
   
   
   return (
      <>
         <TextInput
            value={isEditing ? inputValue : formattedValue}
            onChange={handleOnChange}
            onBlur={() => {
               setInputValue(v => formatNumber(dineroObject.toUnit().toString(), locale))
               setIsEditing(false)
            }}
            onFocus={() => {
               setIsEditing(true)
            }}
            ref={ref}
            {...basicFieldProps}
            {...rest}
         />
      </>
   )
   
})

function extractFloat(input: string): number {
   // Use a regular expression to remove any non-numeric characters
   const floatString = input.replace(/[^\d.-]/g, "")
   
   // Convert the extracted string to a float and return it
   return parseFloat(floatString)
}

function removeNonNumericCharacters(input: string): string {
   return input.replace(/[^0-9,.]\s/g, "") ?? input
}

function truncateAfterSecondDecimal(input: string): string {
   if (input.length === 0) return ""
   const regex = /^([^,.]+)?([,.]\d{0,2})?/
   const match = regex.exec(input)
   if (!match) {
      return input
   }
   return match[1] + (match[2] || "")
}

function formatNumber(input: string | undefined, lang: string): string {
   // Parse the input string to a number
   let inputAsNumber = parseFloat(input ?? "0")
   if (isNaN(inputAsNumber)) {
      // If the input is not a valid number, return an empty string
      return "0"
   }
   
   // Multiply the input by 100 to ensure that it has 2 decimal places
   const inputWithDecimals = inputAsNumber
   
   // Use the Intl object to format the number with 2 decimal places
   const formattedNumber = new Intl.NumberFormat(lang, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   }).format(inputWithDecimals)
   
   // Return the formatted number as a string
   // return formattedNumber.replaceAll(/\s/g, '')
   return formattedNumber
}

PriceInput.displayName = "PriceInput"

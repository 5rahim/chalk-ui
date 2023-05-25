"use client"

import Dinero, { Currency } from "dinero.js"
import React, { ChangeEvent, useCallback, useEffect, useId, useMemo, useState } from "react"
import { extractBasicFieldProps } from "../basic-field"
import { useUILocaleConfig } from "../core"
import { TextInput, TextInputProps } from "../text-input"
import { currencies } from "./currencies"

/* -------------------------------------------------------------------------------------------------
 * PriceInput
 * -----------------------------------------------------------------------------------------------*/

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

   // 1. Get language and currency
   const locale = useMemo(() => _locale ?? lng, [_locale, lng])
   const currency = useMemo(() => _currency ?? currencies[country], [_currency, country])
   // 2. Track the amount (int)
   const [amount, setAmount] = useState<number>(value ?? defaultValue)
   // 3. Track editing state
   const [isEditing, setIsEditing] = useState(false)
   // 4. Dinero object depends on amount
   const dineroObject = Dinero({ amount: amount, currency }).setLocale(locale)
   // 5. Get formatted value (string) from dinero object
   const formattedValue = dineroObject.toFormat()
   // 6. Track user input (what the user sees), the initial state is formatted
   const [inputValue, setInputValue] = useState(formatNumber(dineroObject.toUnit().toString(), locale))
   // -------------------------------------------------------------------------------------------------
   // Emit updates as dinero object changes
   useEffect(() => {
      onChange && onChange((dineroObject.toUnit() * 100))
   }, [dineroObject])

   // Function to format the input as the user is typing
   // - Enforce correct separator by locale (e.g: comma or dot)
   // - Truncate after second decimal
   // - Remove non-numeric characters
   const localizedPattern = useCallback((value: string) => {
      let incorrectSeparator = ","
      // Locale that use ',' as separator add it to the condition: if(locale.includes('fr') || locales.includes('xx'))
      if (locale.includes("fr")) incorrectSeparator = "." // In French, only ',' is the correct separator
      return truncateAfterSecondDecimal(removeNonNumericCharacters(value)).replaceAll(incorrectSeparator, "")
   }, [locale])

   // Function to parse dinero numeric amount (precision 2) to float
   const toFloat = useCallback((value: string) => {
      // We replace any comma with a dot to have a valid input
      return extractFloat(truncateAfterSecondDecimal(removeNonNumericCharacters(value)).replaceAll(",", "."))
   }, [])

   function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
      // Example input flow -> (e.g: "2.99")

      let _amount = 0 // Dinero numeric value (e.g: 0)
      let _value = "" // Input string value (e.g: "2.99")
      try {
         // Enforce formatting on value entered (correct separator, numeric, truncate after second decimal)
         _value = localizedPattern(event.target.value) // (e.g: "2.99")
         // Convert the value entered to a float
         _amount = _value.length > 0 ? toFloat(event.target.value) : 0 // (e.g: 2.99)
      } catch (e) {
         setInputValue("0")
         setAmount((_amount ?? 0) * 100)
      }
      // Multiply by 100 to keep a precision of 2
      setAmount(_amount * 100) // (e.g: 299)
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

/* -------------------------------------------------------------------------------------------------
 * Helper functions
 * -----------------------------------------------------------------------------------------------*/

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

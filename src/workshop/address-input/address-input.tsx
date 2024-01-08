"use client"

import { Autocomplete, AutocompleteOption, AutocompleteProps } from "../autocomplete"
import { LoaderOptions } from "@googlemaps/js-api-loader"
import * as React from "react"
import { extractBasicFieldProps } from "../basic-field"
import { GoogleMapsAutocompletionRequest, useGoogleMapsAutocomplete } from "./use-address-autocomplete"

/* -------------------------------------------------------------------------------------------------
 * AddressInput
 * -----------------------------------------------------------------------------------------------*/

export interface AddressInputProps extends Omit<AutocompleteProps, "options" | "onInputChange" | "onChange" | "defaultValue"> {
    /**
     * Custom autocompletion request
     */
    autocompletionRequest?: GoogleMapsAutocompletionRequest
    /**
     * Additional options to pass to the Google Maps API Loader
     */
    loaderOptions?: Partial<LoaderOptions>
    /**
     * List of allowed countries
     *
     * e.g. `["us", "ci"]`
     */
    allowedCountries?: string | string[]
    /**
     * Callback triggered when the value changes
     */
    onValueChange?: (value: AutocompleteOption | undefined) => void
    /**
     * Message to display when there are no results
     */
    emptyMessage?: string
    /**
     * Field placeholder
     */
    placeholder?: string
    /**
     * Google Maps API key
     *
     * Optionally, you could remove this parameter and get the key from an environment variable
     * @see https://developers.google.com/maps/documentation/javascript/get-api-key
     */
    apiKey: string
    /**
     * Default value when uncontrolled
     *
     * e.g: `{ value: null, label: "Abidjan, Côte d'Ivoire" }`
     */
    defaultValue?: AutocompleteOption
}

export const AddressInput = React.forwardRef<HTMLInputElement, AddressInputProps>((props, ref) => {

    const [{
        children,
        className,
        autocompletionRequest,
        loaderOptions,
        defaultValue,
        allowedCountries = [],
        onValueChange,
        apiKey,
        placeholder = "Enter an address",
        emptyMessage = "No results",
        onTextChange,
        type = "options",
        ...rest
    }, basicFieldProps] = extractBasicFieldProps<AddressInputProps>(props, React.useId())

    const { suggestions, fetchSuggestions, isFetching } = useGoogleMapsAutocomplete({
        apiKey: apiKey,
        minLengthAutocomplete: 0,
        withSessionToken: false,
        debounce: 300,
        autocompletionRequest: autocompletionRequest || {
            componentRestrictions: { country: allowedCountries },
        },
        loaderApiOptions: loaderOptions,
    })

    React.useEffect(() => {
        console.log(onTextChange)
    }, [onTextChange])

    return (
        <Autocomplete
            ref={ref}
            options={suggestions}
            defaultValue={defaultValue}
            onTextChange={v => {
                onTextChange?.(v)
                fetchSuggestions(v)
            }}
            onValueChange={onValueChange}
            placeholder={placeholder}
            emptyMessage={emptyMessage}
            autoFilter={false}
            isFetching={isFetching}
            type={type}
            {...basicFieldProps}
            {...rest}
        />
    )

})

AddressInput.displayName = "AddressInput"

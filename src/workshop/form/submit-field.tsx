import React from "react"
import { useFormContext } from "react-hook-form"
import { Button, ButtonProps } from "../button"
import { LoadingOverlay } from "../loading-spinner"
import locales from "./locales.json"

/* -------------------------------------------------------------------------------------------------
 * SubmitField
 * -----------------------------------------------------------------------------------------------*/

export interface SubmitFieldProps extends Omit<ButtonProps, "type"> {
    uploadHandler?: any
    /**
     * Role of the button.
     * - If "create", a loading overlay will be shown when the submission is successful.
     * @default "save"
     */
    role?: "submit" | "save" | "create" | "add" | "search" | "update"
    /**
     * If true, the button will be disabled when the submission is successful.
     */
    disableOnSuccess?: boolean
    /**
     * If true, the button will be disabled if the form is invalid.
     */
    disableIfInvalid?: boolean
    /**
     * If true, a loading overlay will be shown when the submission is successful.
     */
    showLoadingOverlayOnSuccess?: boolean
    /**
     * If true, a loading overlay will be shown when the form is submitted when the role is "create".
     *
     * @default true
     */
    showLoadingOverlayOnCreate?: boolean
    /**
     * A loading overlay to show when the form is submitted.
     */
    loadingOverlay?: React.ReactNode
    /**
     * The locale to use.
     */
    locale?: "fr" | "en"
}

export const SubmitField = React.forwardRef<HTMLButtonElement, SubmitFieldProps>((props, ref) => {

    const {
        children,
        loading,
        disabled,
        uploadHandler,
        role = "save",
        disableOnSuccess = role === "create",
        disableIfInvalid = false,
        showLoadingOverlayOnSuccess = false,
        showLoadingOverlayOnCreate = true,
        loadingOverlay,
        locale = "en",
        ...rest
    } = props

    const { formState } = useFormContext()

    const disableSuccess = disableOnSuccess ? formState.isSubmitSuccessful : false
    const disableInvalid = disableIfInvalid ? !formState.isValid : false

    return (
        <>
            {showLoadingOverlayOnSuccess && loadingOverlay || (
                <LoadingOverlay show={formState.isSubmitSuccessful} />
            )}
            {role === "create" && loadingOverlay || (
                <LoadingOverlay show={formState.isSubmitSuccessful} />
            )}

            <Button
                type="submit"
                loading={formState.isSubmitting || loading || uploadHandler?.isLoading}
                disabled={disableInvalid || disabled || disableSuccess}
                ref={ref}
                {...rest}
            >
                {children ? children : locales["form"][role][locale]}
            </Button>
        </>
    )

})
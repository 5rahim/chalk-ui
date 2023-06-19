import React, { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import locales from "./locales.json"
import { useUILocaleConfig } from "../core"
import { ShowOnly } from "../show-only"
import { LoadingOverlay } from "../loading-spinner"
import { Button, ButtonProps } from "../button"

/* -------------------------------------------------------------------------------------------------
 * SubmitField
 * -----------------------------------------------------------------------------------------------*/

export interface SubmitFieldProps extends Omit<ButtonProps, "type"> {
    uploadHandler?: any
    role?: "submit" | "save" | "create" | "add" | "search" | "update"
    disabledOnSuccess?: boolean
    disableIfInvalid?: boolean
    showLoadingScreenOnSuccess?: boolean
    loadingScreen?: React.ReactNode
}

export const SubmitField = React.forwardRef<HTMLButtonElement, SubmitFieldProps>((props, ref) => {

    const {
        children,
        isLoading,
        isDisabled,
        uploadHandler,
        role = "save",
        disabledOnSuccess = role === "create",
        disableIfInvalid = false,
        showLoadingScreenOnSuccess = false,
        loadingScreen,
        ...rest
    } = props

    const { formState } = useFormContext()
    const { locale } = useUILocaleConfig()

    const disableSuccess = useMemo(() => disabledOnSuccess ? formState.isSubmitSuccessful : false, [formState.isSubmitSuccessful])
    const disableInvalid = useMemo(() => disableIfInvalid ? !formState.isValid : false, [formState.isValid])

    return (
        <>
            <ShowOnly when={role === "create" || showLoadingScreenOnSuccess}>
                {loadingScreen ?? <LoadingOverlay show={formState.isSubmitSuccessful}/>}
            </ShowOnly>

            <Button
                type="submit"
                isLoading={formState.isSubmitting || isLoading || uploadHandler?.isLoading} // || ml.mutationLoading}
                isDisabled={disableInvalid || isDisabled || disableSuccess}
                ref={ref}
                {...rest}
            >
                {children ? children : locales["form"][role][locale as "fr" | "en"]}
            </Button>
        </>
    )

})

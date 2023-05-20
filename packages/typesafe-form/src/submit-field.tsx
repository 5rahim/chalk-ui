import { Button, ButtonProps, LoadingOverlay, ShowOnly, useUILocaleConfig } from '@rahimstack/ui'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { UILocales } from './locales'

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
      disabledOnSuccess = role === 'create',
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
         <ShowOnly when={role === 'create' || showLoadingScreenOnSuccess}>
            {loadingScreen ?? <LoadingOverlay show={formState.isSubmitSuccessful} />}
         </ShowOnly>
         
         <Button
            type="submit"
            isLoading={formState.isSubmitting || isLoading || uploadHandler?.isLoading} // || ml.mutationLoading}
            isDisabled={disableInvalid || isDisabled || disableSuccess}
            ref={ref}
            {...rest}
         >
            {children ? children : UILocales.submit[role][locale as 'fr' | 'en']}
         </Button>
      </>
   )
   
})

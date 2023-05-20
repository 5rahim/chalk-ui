import { cn } from "@rahimstack/tailwind-utils"
import React from "react"
import { BasicFieldAnatomy, ComponentWithAnatomy, useStyleLibrary } from "../core"
import { ShowOnly } from "../show-only"

export function extractBasicFieldProps<Props extends BasicFieldOptions>(props: Props, id: string) {
   const {
      name,
      label,
      labelProps,
      help,
      error,
      isRequired,
      isDisabled = false,
      isReadOnly = false,
      fieldDetailsClassName,
      fieldLabelClassName,
      fieldClassName,
      fieldErrorTextClassName,
      fieldHelpTextClassName,
      id: _id,
      ...rest
   } = props
   return [
      rest,
      {
         id: _id ?? id,
         name,
         label,
         help,
         error,
         isDisabled,
         isRequired,
         isReadOnly,
         fieldErrorTextClassName,
         fieldHelpTextClassName,
         fieldDetailsClassName,
         fieldLabelClassName,
         fieldClassName,
         labelProps,
      },
   ] as [
      Omit<Props,
         "label" | "name" | "help" | "error" |
         "isDisabled" | "isRequired" | "isReadOnly" |
         "fieldDetailsClassName" | "fieldLabelClassName" | "fieldClassName" | "fieldHelpTextClassName" |
         "fieldErrorTextClassName" | "id" | "labelProps"
      >,
         Omit<BasicFieldOptions, "id"> & {
         id: string
      }
   ]
}

export interface BasicFieldOptions extends ComponentWithAnatomy<typeof BasicFieldAnatomy> {
   id?: string | undefined
   name?: string
   label?: React.ReactNode
   labelProps?: object
   help?: React.ReactNode
   error?: string
   isRequired?: boolean
   isDisabled?: boolean
   isReadOnly?: boolean
}

export interface BasicFieldProps extends React.ComponentPropsWithRef<"div">, BasicFieldOptions {
}

export const BasicField: React.FC<BasicFieldProps> = React.memo(React.forwardRef<HTMLDivElement, BasicFieldProps>((props, ref) => {
   
   const {
      children,
      className,
      labelProps,
      id,
      label,
      error,
      help,
      isDisabled,
      isReadOnly,
      isRequired,
      fieldClassName,
      fieldDetailsClassName,
      fieldLabelClassName,
      fieldAsteriskClassName,
      fieldErrorTextClassName,
      fieldHelpTextClassName,
      ...rest
   } = props
   
   const StyleLibrary = useStyleLibrary()
   
   
   return (
      <>
         <div
            className={cn(
               StyleLibrary.BasicField.field(),
               className,
               fieldClassName,
            )}
            {...rest}
            ref={ref}
         >
            <ShowOnly when={!!label}>
               <label
                  htmlFor={isDisabled ? undefined : id}
                  className={cn(StyleLibrary.BasicField.fieldLabel({ hasError: !!error }), fieldLabelClassName)}
                  {...labelProps}
               >
                  {label}
                  <ShowOnly when={isRequired}>
                     <span className={cn(StyleLibrary.BasicField.fieldAsterisk(), fieldAsteriskClassName)}>*</span>
                  </ShowOnly>
               </label>
            </ShowOnly>
            
            {children}
            
            <ShowOnly when={!!help || !!error}>
               <div className={cn(StyleLibrary.BasicField.fieldDetails(), fieldDetailsClassName)}>
                  {!!help && <p className={cn(StyleLibrary.BasicField.fieldHelpText(), fieldHelpTextClassName)}>{help}</p>}
                  {!!error && <p className={cn(StyleLibrary.BasicField.fieldErrorText(), fieldErrorTextClassName)}>{error}</p>}
               </div>
            </ShowOnly>
         </div>
      </>
   )
   
}))

BasicField.displayName = "BasicField"

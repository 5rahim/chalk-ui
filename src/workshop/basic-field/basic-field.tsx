import { cn } from "../core/classnames"
import { cva } from "class-variance-authority"
import React from "react"
import { ComponentAnatomy, defineStyleAnatomy } from "../core/styling"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const BasicFieldAnatomy = defineStyleAnatomy({
    fieldLabel: cva([
        "UI-BasicField__fieldLabel",
        "block text-md sm:text-lg font-semibold self-start",
        "data-[error=true]:text-red-500",
    ]),
    fieldAsterisk: cva("UI-BasicField__fieldAsterisk ml-1 text-red-500 text-sm"),
    fieldDetails: cva("UI-BasicField__fieldDetails"),
    field: cva("UI-BasicField__field w-full space-y-1"),
    fieldHelpText: cva("UI-BasicField__fieldHelpText text-sm text-[--muted]"),
    fieldErrorText: cva("UI-BasicField__fieldErrorText text-sm text-red-500"),
})

/* -------------------------------------------------------------------------------------------------
 * BasicFieldOptions
 * - Field components inherit these props
 * -----------------------------------------------------------------------------------------------*/

export interface BasicFieldOptions extends ComponentAnatomy<typeof BasicFieldAnatomy> {
    id?: string | undefined
    name?: string
    label?: React.ReactNode
    labelProps?: { [key: string]: any }
    help?: React.ReactNode
    error?: string
    required?: boolean
    disabled?: boolean
    readonly?: boolean
}

/* -------------------------------------------------------------------------------------------------
 * Extract BasicFieldProps
 * -----------------------------------------------------------------------------------------------*/

export function extractBasicFieldProps<Props extends BasicFieldOptions>(props: Props, id: string) {
    const {
        name,
        label,
        labelProps,
        help,
        error,
        required,
        disabled = false,
        readonly = false,
        fieldDetailsClass,
        fieldLabelClass,
        fieldAsteriskClass,
        fieldClass,
        fieldErrorTextClass,
        fieldHelpTextClass,
        id: _id,
        ...rest
    } = props
    return [
        rest,
        {
            id: _id || id,
            name,
            label,
            help,
            error,
            disabled,
            required,
            readonly,
            fieldAsteriskClass,
            fieldErrorTextClass,
            fieldHelpTextClass,
            fieldDetailsClass,
            fieldLabelClass,
            fieldClass,
            labelProps,
        },
    ] as [
        Omit<Props,
            "label" | "name" | "help" | "error" |
            "disabled" | "required" | "readonly" |
            "fieldDetailsClass" | "fieldLabelClass" | "fieldClass" | "fieldHelpTextClass" |
            "fieldErrorTextClass" | "id" | "labelProps" | "fieldAsteriskClass"
        >,
            Omit<BasicFieldOptions, "id"> & {
            id: string
        }
    ]
}

/* -------------------------------------------------------------------------------------------------
 * BasicField
 * -----------------------------------------------------------------------------------------------*/

export interface BasicFieldProps extends React.ComponentPropsWithoutRef<"div">, BasicFieldOptions {
}

export const BasicField = React.memo(React.forwardRef<HTMLDivElement, BasicFieldProps>((props, ref) => {

    const {
        children,
        className,
        labelProps,
        id,
        label,
        error,
        help,
        disabled,
        readonly,
        required,
        fieldClass,
        fieldDetailsClass,
        fieldLabelClass,
        fieldAsteriskClass,
        fieldErrorTextClass,
        fieldHelpTextClass,
        ...rest
    } = props

    return (
        <>
            <div
                className={cn(
                    BasicFieldAnatomy.field(),
                    className,
                    fieldClass,
                )}
                {...rest}
                ref={ref}
            >
                {!!label &&
                    <label
                        htmlFor={disabled ? undefined : id}
                        className={cn(BasicFieldAnatomy.fieldLabel(), fieldLabelClass)}
                        data-error={!!error}
                        {...labelProps}
                    >
                        {label}
                        {required &&
                            <span className={cn(BasicFieldAnatomy.fieldAsterisk(), fieldAsteriskClass)}>*</span>
                        }
                    </label>
                }

                {children}

                {(!!help || !!error) &&
                    <div className={cn(BasicFieldAnatomy.fieldDetails(), fieldDetailsClass)}>
                        {!!help &&
                            <p className={cn(BasicFieldAnatomy.fieldHelpText(), fieldHelpTextClass)}>{help}</p>}
                        {!!error &&
                            <p className={cn(BasicFieldAnatomy.fieldErrorText(), fieldErrorTextClass)}>{error}</p>}
                    </div>
                }
            </div>
        </>
    )

}))

BasicField.displayName = "BasicField"

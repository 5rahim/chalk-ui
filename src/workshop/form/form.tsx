"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import _isEmpty from "lodash/isEmpty"
import * as React from "react"
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm, UseFormProps, UseFormReturn, WatchObserver } from "react-hook-form"
import { z, ZodObject } from "zod"
import { cn } from "../core/classnames"
import { getZodDefaults } from "./zod-resolver"

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

/**
 * @internal
 */
const __FormSchemaContext = React.createContext<{
    shape: z.ZodRawShape,
    schema: z.ZodObject<z.ZodRawShape>
} | undefined>(undefined)

export const useFormSchema = (): { shape: z.ZodRawShape, schema: z.ZodObject<z.ZodRawShape> } => {
    return React.useContext(__FormSchemaContext)!
}

/* -------------------------------------------------------------------------------------------------
 * Form
 * -----------------------------------------------------------------------------------------------*/

export interface FormProps<Schema extends z.ZodObject<z.ZodRawShape> = ZodObject<any>>
    extends UseFormProps<z.infer<Schema>>,
        Omit<React.ComponentPropsWithRef<"form">, "children" | "onChange" | "onSubmit" | "onError" | "ref"> {
    /**
     * The schema of the form.
     */
    schema: Schema
    onSubmit: SubmitHandler<z.infer<Schema>>
    /**
     * Triggers when any of the field change.
     */
    onChange?: WatchObserver<z.infer<Schema>>
    /**
     * Triggers when there are validation errors.
     */
    onError?: SubmitErrorHandler<z.infer<Schema>>
    /**
     * Ref to the form element.
     */
    formRef?: React.RefObject<HTMLFormElement>

    children?: MaybeRenderProp<UseFormReturn<z.infer<Schema>>>
    /**
     * @default w-full space-y-3
     */
    stackClassName?: string
    mRef?: React.Ref<UseFormReturn<z.infer<Schema>>>
}

/**
 * @example
 * <Form
 *     schema={definedSchema}
 *     onSubmit={console.log}
 *     onError={console.log}
 *     onChange={console.log}
 *     defaultValues={undefined}
 *  >
 *     <Field.Submit role="create" />
 *  </Form>
 * @param props
 * @constructor
 */
export const Form = <Schema extends z.ZodObject<z.ZodRawShape>>(props: FormProps<Schema>) => {

    const {
        mode = "onTouched",
        resolver,
        reValidateMode,
        shouldFocusError,
        shouldUnregister,
        shouldUseNativeValidation,
        criteriaMode,
        delayError,
        schema,
        defaultValues: _defaultValues,
        onChange,
        onSubmit,
        onError,
        formRef,
        children,
        mRef,

        stackClassName,
        ...rest
    } = props

    const defaultValues = React.useMemo(() => {
        if (_isEmpty(getZodDefaults(schema)) && _isEmpty(_defaultValues)) return undefined
        return {
            ...getZodDefaults(schema),
            ..._defaultValues,
        } as any
    }, [])

    const form = {
        mode,
        resolver,
        defaultValues,
        reValidateMode,
        shouldFocusError,
        shouldUnregister,
        shouldUseNativeValidation,
        criteriaMode,
        delayError,
    }

    form.resolver = zodResolver(schema)

    const methods = useForm(form)
    const { handleSubmit } = methods

    React.useImperativeHandle(mRef, () => methods, [mRef, methods])

    React.useEffect(() => {
        let subscription: any
        if (onChange) {
            subscription = methods.watch(onChange)
        }
        return () => subscription?.unsubscribe()
    }, [methods, onChange])

    return (
        <FormProvider {...methods}>
            <__FormSchemaContext.Provider value={{ schema, shape: schema.shape }}>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit, onError)}
                    {...rest}
                >
                    <div className={cn("w-full space-y-3", stackClassName)}>
                        {runIfFn(children, methods)}
                    </div>
                </form>
            </__FormSchemaContext.Provider>
        </FormProvider>
    )

}

Form.displayName = "Form"

/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/

type MaybeRenderProp<P> =
    | React.ReactNode
    | ((props: P) => React.ReactNode)

const isFunction = <T extends Function = Function>(value: any): value is T => typeof value === "function"

function runIfFn<T, U>(
    valueOrFn: T | ((...fnArgs: U[]) => T),
    ...args: U[]
): T {
    return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

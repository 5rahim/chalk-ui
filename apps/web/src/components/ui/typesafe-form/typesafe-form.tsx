"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../core"
import _isEmpty from "lodash/isEmpty"
import React, { createContext, useContext, useEffect, useMemo } from "react"
import {
    DeepPartial,
    FieldValues,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
    UseFormProps,
    UseFormReturn,
    WatchObserver,
} from "react-hook-form"
import { z } from "zod"
import { getZodDefaults } from "./zod-resolver"

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

/**
 * @internal
 */
const __FormSchemaContext = createContext<{ shape: z.ZodRawShape, schema: z.ZodObject<z.ZodRawShape> } | undefined>(undefined)

export const useFormSchema = (): { shape: z.ZodRawShape, schema: z.ZodObject<z.ZodRawShape> } => {
    return useContext(__FormSchemaContext)!
}

/* -------------------------------------------------------------------------------------------------
 * TypesafeForm
 * -----------------------------------------------------------------------------------------------*/

export interface TypesafeFormProps<TFields extends FieldValues = FieldValues>
    extends UseFormProps<TFields>,
        Omit<React.ComponentPropsWithRef<"form">, "children" | "onChange" | "onSubmit" | "onError" | "ref"> {
    schema: z.ZodObject<z.ZodRawShape>
    onSubmit: SubmitHandler<TFields>
    onChange?: WatchObserver<TFields> // Triggers when any of the field change.
    onError?: SubmitErrorHandler<TFields> // Triggers when there are validation errors.
    formRef?: React.RefObject<HTMLFormElement>
    children?: MaybeRenderProp<UseFormReturn<TFields>>
    /**
     * @default w-full gap-3
     */
    stackClassName?: string
    mRef?: React.Ref<UseFormReturn<TFields>>
}

/**
 * @example
 * <TypesafeForm<InferType<typeof definedSchema>>
 *     schema={definedSchema}
 *     onSubmit={console.log}
 *     onError={console.log}
 *     onChange={console.log}
 *     defaultValues={undefined}
 *  >
 *     <Field.Submit role="create" />
 *  </TypesafeForm>
 * @param props
 * @constructor
 */
export const TypesafeForm = <TFields extends FieldValues>(props: TypesafeFormProps<TFields>) => {

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

    const defaultValues = useMemo(() => {
        if (_isEmpty(getZodDefaults(schema)) && _isEmpty(_defaultValues)) return undefined
        return {
            ...getZodDefaults(schema),
            ..._defaultValues,
        } as DeepPartial<TFields>
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

    useEffect(() => {
        let subscription: any
        if (onChange) {
            subscription = methods.watch(onChange)
        }
        return () => subscription?.unsubscribe()
    }, [methods, onChange])

    return (
        <>
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
        </>
    )

}

TypesafeForm.displayName = "TypesafeForm"

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

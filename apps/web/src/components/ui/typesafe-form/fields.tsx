"use client"

import { DateValue, getLocalTimeZone, parseDate, Time } from "@internationalized/date"
import { RangeValue } from "@react-types/shared"
import addDays from "date-fns/addDays"
import React, { forwardRef, useEffect, useMemo, useState } from "react"
import { Controller, FormState, get, useController, useFormContext } from "react-hook-form"
import { createPolymorphicComponent } from "./polymorphic-component"
import { SubmitField } from "./submit-field"
import { useFormSchema } from "./typesafe-form"
import { BasicFieldOptions } from "@/components/ui/basic-field"
import { TextInput, TextInputProps } from "@/components/ui/text-input"
import { Textarea, TextareaProps } from "@/components/ui/textarea"
import { DatePicker, DatePickerProps, DateRangePicker, DateRangePickerProps, TimeInput, TimeInputProps } from "@/components/ui/date-time"
import { Select, SelectProps } from "@/components/ui/select"
import { NumberInput, NumberInputProps } from "@/components/ui/number-input"
import { MultiSelect, MultiSelectProps } from "@/components/ui/multi-select"
import { Combobox, ComboboxProps } from "@/components/ui/combobox"
import { Switch, SwitchProps } from "@/components/ui/switch"
import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupProps } from "@/components/ui/radio-group"
import { PhoneNumberInput, PhoneNumberInputProps } from "@/components/ui/phone-number-input"
import { PriceInput, PriceInputProps } from "@/components/ui/price-input"
import { useUILocaleConfig } from "@/components/ui/core"
import { currencies } from "@/components/ui/price-input/currencies"
import { AddressInput, AddressInputProps } from "@/components/ui/address-input"
import { ColorInput, ColorInputProps } from "@/components/ui/color-input"
import { Dropzone, DropzoneProps, FileUploadHandler } from "@/components/ui/file-upload"

type Args<T extends Function> = T extends (...args: infer R) => any ? R : never

function callAllHandlers<T extends (event: any) => void>(
    ...fns: (T | undefined)[]
) {
    return function func(event: Args<T>[0]) {
        fns.some((fn) => {
            fn?.(event)
            return event?.defaultPrevented
        })
    }
}

/**
 * Add the BasicField types to any Field since they are children
 */
interface FieldBaseProps extends Omit<BasicFieldOptions, "name"> {
    name: string
    onChange?: any
    onBlur?: any
    isRequired?: boolean
}

type FieldComponent<T> = T & FieldBaseProps

interface FieldProps extends React.ComponentPropsWithRef<"div"> {
}

const _Field: any = {}

/**
 * @description This wrapper makes it easier to work with custom form components by controlling their state.
 * @example
 * // Props order
 * <Controller>
 *    <InputComponent
 *       defaultValue={}   // Can be overridden
 *       onChange={}       // Can be overridden
 *       onBlur={}         // Can be overridden
 *       {...props}        // <FieldComponent {...} /> -> <Field.Component {...} />
 *       error={}          // Cannot be overridden
 *    />
 * </Controller>
 * @param InputComponent
 */
function withControlledInput<T extends FieldBaseProps>(InputComponent: React.FC<T>) {
    return forwardRef<FieldProps, T>(
        (inputProps, ref) => {
            const { control, formState } = useFormContext()
            const { shape } = useFormSchema()

            /* Automatically get the required status from the Zod Schema */
            const isRequired = useMemo(() => !!get(shape, inputProps.name)?.nonempty, [shape])

            return (
                <Controller
                    name={inputProps.name}
                    control={control}
                    rules={{ required: inputProps.isRequired }}
                    render={(render) => (
                        /**
                         * We pass "value, onChange, onBlur, error, isRequired" to all components that will be defined using the wrapper.
                         * For other components like "Switch" and "Checkbox" which do not use the "value" prop, you need to deconstruct it to avoid it
                         * being passed.
                         */
                        <InputComponent
                            // defaultValue={get(formState.defaultValues, inputProps.name)} // Default prop, can be overridden in Field component definition
                            value={render.field.value} // Default prop, can be overridden in Field component definition
                            onChange={callAllHandlers(inputProps.onChange, render.field.onChange)} // Default prop, can be overridden in Field component
                            // definition
                            onBlur={callAllHandlers(inputProps.onBlur, render.field.onBlur)} // Default prop, can be overridden in Field component definition
                            isRequired={isRequired}
                            {...inputProps} // Props passed in <FieldComponent /> then props passed in <Field.Component />
                            // The props below will not be overridden.
                            // e.g: <Field.ComponentField error="Error" /> will not work
                            error={getFormError(render.field.name, render.formState)?.message}
                            ref={useMergeRefs(ref, render.field.ref)}
                        />
                    )}
                />
            )
        },
    )
}

/**
 * Causes hydration issues because it populates the input once the component is rendered on the client
 */
const withUncontrolledInput = <T extends FieldBaseProps>(InputComponent: React.FC<T>) => {
    return forwardRef<HTMLInputElement, T>(
        (props, ref) => {
            const { register, formState } = useFormContext()
            const { ref: _ref, ...field } = register(props.name)

            return (
                <InputComponent
                    {...props}
                    onChange={callAllHandlers(props.onChange, field.onChange)}
                    onBlur={callAllHandlers(props.onBlur, field.onBlur)}
                    error={getFormError(props.name, formState)?.message}
                    name={field.name}
                    ref={useMergeRefs(ref, _ref)}
                />
            )
        },
    )
}


const TextInputField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<TextInputProps>>(
    ({ value, ...props }, ref) => {
        return <TextInput
            value={value ?? ""}
            {...props}
            ref={ref}
        />
    },
)))

const TextareaField = React.memo(withControlledInput(forwardRef<HTMLTextAreaElement, FieldComponent<TextareaProps>>(
    ({ value, ...props }, ref) => {
        return <Textarea
            value={value ?? ""}
            {...props}
            ref={ref}
        />
    },
)))

const ColorInputField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<ColorInputProps>>((props, ref) => {
    const context = useFormContext()
    const controller = useController({ name: props.name })

    const defaultValue = useMemo(() => get(context.formState.defaultValues, props.name) ?? "#000000", [])

    useEffect(() => {
        controller.field.onChange(defaultValue)
    }, [])

    return <ColorInput
        {...props}
        defaultValue={defaultValue}
        ref={ref}
    />
})))

/**
 * @zod z.date()
 * @example
 * <Field.DateRangePicker
 *    name="name"
 *    label="Appointment date"
 *    minValue={today(getLocalTimeZone())}
 * />
 */
const DatePickerField = React.memo(withControlledInput(forwardRef<HTMLDivElement, FieldComponent<DatePickerProps>>((props, ref) => {
    const context = useFormContext()
    const controller = useController({ name: props.name })

    const defaultValue = useMemo(() => get(context.formState.defaultValues, props.name), [])

    const [value, setValue] = React.useState<DateValue | undefined>(defaultValue ? parseDate(defaultValue.toISOString().split("T")[0]!) : undefined)

    useEffect(() => {
        controller.field.onChange(value?.toDate(getLocalTimeZone()))
    }, [value])

    return <DatePicker
        {...props}
        value={value}
        onChange={setValue}
        ref={ref}
    />
})))

/**
 * @zod z.object({ start: z.custom<Date>(), end: z.custom<Date>() })
 * @example
 * <Field.DateRangePicker
 *    name="name"
 *    label="Appointment date"
 *    minValue={today(getLocalTimeZone())}
 *    leftAddon="Date range"
 * />
 */
const DateRangePickerField = React.memo(withControlledInput(forwardRef<HTMLDivElement, FieldComponent<DateRangePickerProps>>((props, ref) => {
    const context = useFormContext()
    const controller = useController({ name: props.name })

    const defaultValue = useMemo(() => get(context.formState.defaultValues, props.name), [])

    const [value, setValue] = React.useState<RangeValue<DateValue> | undefined>(defaultValue ? {
        start: defaultValue.start ? parseDate(defaultValue.start.toISOString().split("T")[0]!) : parseDate(new Date().toISOString().split("T")[0]!),
        end: defaultValue.end
            ? parseDate(defaultValue.end.toISOString().split("T")[0]!)
            : parseDate(addDays(new Date(), 1).toISOString().split("T")[0]!),
    } : undefined)

    useEffect(() => {
        controller.field.onChange({ start: value?.start.toDate(getLocalTimeZone()), end: value?.end.toDate(getLocalTimeZone()) })
    }, [value])

    return <DateRangePicker
        {...props}
        value={value}
        onChange={setValue}
        ref={ref}
    />
})))


export type TimeFieldObject = { hour: number, minute: number }

const dateValueToTimeObject = (value: DateValue): TimeFieldObject => {
    return { hour: (value as any).hour, minute: (value as any).minute }
}

/**
 * @zod presets.time | z.object({ hour: z.number().min(0).max(23), minute: z.number().min(0).max(59) })
 * @example
 * <Field.Time name="time" leftAddon="Time" />
 */
const TimeField = React.memo(withControlledInput(forwardRef<HTMLDivElement, FieldComponent<TimeInputProps>>((props, ref) => {
    const context = useFormContext()
    const controller = useController({ name: props.name })

    const defaultValue = useMemo<TimeFieldObject | undefined>(() => get(context.formState.defaultValues, props.name), [])

    const [value, setValue] = useState<any | undefined>(defaultValue ? new Time(defaultValue.hour, defaultValue.minute) : undefined)

    useEffect(() => {
        controller.field.onChange(dateValueToTimeObject(value))
    }, [value])

    return <TimeInput
        {...props}
        value={value}
        onChange={setValue}
        ref={ref}
    />
})))

const SelectField = React.memo(withControlledInput(forwardRef<HTMLSelectElement, FieldComponent<SelectProps>>(
    (props, ref) => {
        const context = useFormContext()
        const controller = useController({ name: props.name })

        /* Set the default value as the first option if no default value is passed */
        useEffect(() => {
            if (!get(context.formState.defaultValues, props.name) && !controller.field.value) {
                controller.field.onChange(props.options?.[0]?.value)
            }
        }, [controller.field])

        return <Select
            {...props}
            ref={ref}
        />
    },
)))

const NumberField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<NumberInputProps>>(
    (props, ref) => {
        const context = useFormContext()
        return <NumberInput
            {...props}
            defaultValue={get(context.formState.defaultValues, props.name)} // Cannot be overridden
            ref={ref}
        />
    },
)))

const MultiSelectField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<MultiSelectProps>>(
    (props, ref) => {
        const context = useFormContext()
        return <MultiSelect
            {...props}
            defaultValue={get(context.formState.defaultValues, props.name)} // Cannot be overridden
            ref={ref}
        />
    },
)))

/**
 * @example
 * <Field.Combobox options={[]} />
 */
const ComboboxField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<ComboboxProps>>(
    (props, ref) => {
        const context = useFormContext()
        return <Combobox
            {...props}
            value={get(context.formState.defaultValues, props.name)} // Cannot be overridden
            ref={ref}
        />
    },
)))

/**
 * @example
 * <Field.Switch />
 */
const SwitchField = React.memo(withControlledInput(forwardRef<HTMLButtonElement, FieldComponent<SwitchProps>>(
    (props, ref) => {
        const context = useFormContext()
        return <Switch
            {...props}
            defaultChecked={get(context.formState.defaultValues, props.name)} // Cannot be overridden
            ref={ref}
        />
    },
)))

/**
 * @example
 * <Field.Checkbox />
 */
const CheckboxField = React.memo(withControlledInput(forwardRef<HTMLButtonElement, FieldComponent<CheckboxProps>>(
    (props, ref) => {
        const context = useFormContext()
        return <Checkbox
            {...props}
            defaultChecked={get(context.formState.defaultValues, props.name)} // Cannot be overridden
            ref={ref}
        />
    },
)))

/**
 * @zod presets.checkboxGroup | z.array(z.string())
 * @example
 * <Field.CheckboxGroup options={[{ value: '', label: '' }]} />
 */
const CheckboxGroupField = React.memo(withControlledInput(forwardRef<HTMLDivElement, FieldComponent<CheckboxGroupProps>>(
    (props, ref) => {
        const context = useFormContext()
        const controller = useController({ name: props.name })

        useEffect(() => {
            if (!get(context.formState.defaultValues, props.name) && !controller.field.value) {
                controller.field.onChange([])
            }
        }, [controller.field])

        return <CheckboxGroup
            {...props}
            defaultValue={get(context.formState.defaultValues, props.name) ?? []} // Cannot be overridden
            ref={ref}
        />
    },
)))

/**
 * @zod presets.radioGroup | z.string()
 * @example
 * <Field.RadioGroup options={[{ value: '', label: '' }]} />
 */
const RadioGroupField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<RadioGroupProps>>(
    (props, ref) => {
        const context = useFormContext()
        const controller = useController({ name: props.name })

        /* Set the default value as the first option if no default value is passed */
        useEffect(() => {
            if (!get(context.formState.defaultValues, props.name) && !controller.field.value) {
                controller.field.onChange(props.options?.[0]?.value)
            }
        }, [controller.field])

        return <RadioGroup
            {...props}
            ref={ref}
        />
    },
)))

/**
 * @zod z.string()
 * @example
 * fieldClassName="flex w-full"
 * fieldLabelClassName="text-base sm:text-base md:text-base"
 * stackClassName="flex flex-col md:flex-row gap-2"
 * radioWrapperClassName="block w-full p-4 cursor-pointer transition border border-gray-200 rounded-md data-checked:bg-white data-checked:ring-2
 *    data-checked:ring-brand-500" radioControlClassName="absolute right-2 top-2 h-5 w-5 text-xs"
 * radioLabelClassName="font-semibold flex-none flex"
 * radioHelpClassName="text-sm"
 *
 */
const RadioCardsField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<RadioGroupProps>>(
    (props, ref) => {
        const context = useFormContext()
        const controller = useController({ name: props.name })

        /* Set the default value as the first option if no default value is passed */
        useEffect(() => {
            if (!get(context.formState.defaultValues, props.name) && !controller.field.value) {
                controller.field.onChange(props.options?.[0]?.value)
            }
        }, [controller.field])

        return <RadioGroup
            fieldClassName="w-full"
            fieldLabelClassName="text-md"
            stackClassName="flex flex-col md:flex-row gap-2 space-y-0"
            radioContainerClassName="block w-full p-4 cursor-pointer transition border border-gray-200 rounded-md data-checked:bg-white data-checked:ring-2 data-checked:ring-brand-500"
            radioControlClassName="absolute right-2 top-2 h-5 w-5 text-xs"
            radioLabelClassName="font-semibold flex-none flex"
            radioHelpClassName="text-sm"
            {...props}
            ref={ref}
        />
    },
)))


/**
 * @zod z.string()
 *
 * @example
 * fieldClassName="flex w-full"
 * fieldLabelClassName="text-md"
 * stackClassName="flex flex-row gap-2 p-1 bg-gray-50 rounded-md border w-[fit-content]"
 * radioWrapperClassName="block w-[fit-content] py-1 px-3 cursor-pointer border border-transparent transition rounded-md data-checked:bg-white
 *    data-checked:border-gray-300 data-checked:shadow-sm text-gray-500 data-checked:text-black"
 * radioControlClassName="hidden"
 * radioLabelClassName="font-semibold flex-none flex" radioHelpClassName="text-base"
 *
 */
const SegmentedControlField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<RadioGroupProps>>(
    (props, ref) => {
        const context = useFormContext()
        const controller = useController({ name: props.name })

        /* Set the default value as the first option if no default value is passed */
        useEffect(() => {
            if (!get(context.formState.defaultValues, props.name) && !controller.field.value) {
                controller.field.onChange(props.options?.[0]?.value)
            }
        }, [controller.field])

        return <RadioGroup
            fieldClassName="w-full"
            fieldLabelClassName="text-md"
            stackClassName="flex flex-row gap-2 p-1 bg-gray-50 rounded-md border w-[fit-content] space-y-0"
            radioContainerClassName="block w-[fit-content] py-1 px-3 cursor-pointer border border-transparent transition rounded-md data-checked:bg-white data-checked:border-gray-300 data-checked:shadow-sm text-gray-500 data-checked:text-black"
            radioControlClassName="hidden"
            radioLabelClassName="font-semibold flex-none flex"
            radioHelpClassName="text-base"
            {...props}
            ref={ref}
        />
    },
)))


type PhoneNumberInputFieldProps = Omit<PhoneNumberInputProps, "onChange" | "value">
/**
 * @zod presets.phone | z.string()
 * @example
 * <Field.PhoneNumber name="phone" />
 */
const PhoneNumberInputField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<PhoneNumberInputFieldProps>>(
    (props, ref) => {
        const context = useFormContext()
        const controller = useController({ name: props.name })

        return <PhoneNumberInput
            {...props}
            onChange={callAllHandlers(props.onChange, controller.field.onChange)} // Cannot be overridden
            value={get(context.formState.defaultValues, props.name)} // Cannot be overridden
        />
    },
)))

/**
 * @zod presets.price | z.number()
 * @example
 * <Field.Price name="price" />
 */
const PriceInputField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<PriceInputProps>>(
    (props, ref) => {
        const context = useFormContext()
        const { country, locale } = useUILocaleConfig()
        return <PriceInput
            currency={currencies[country?.toUpperCase()] ?? undefined}
            locale={locale}
            {...props}
            defaultValue={get(context.formState.defaultValues, props.name) ?? 0} // Cannot be overridden
            ref={ref}
        />
    },
)))


type AddressInputFieldProps = Omit<AddressInputProps, "onChange" | "value"> & { restrictToCurrentCountry?: boolean }
/**
 * @zod z.string()
 * @example
 * <Field.Address
 *    name="address"
 *    allowedCountries={['ci', 'us']}
 *    restrictToCurrentCountry         //=> uses UIContext // Overrides allowedCountries
 * />
 */
const AddressField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<AddressInputFieldProps>>(
    ({ allowedCountries, restrictToCurrentCountry = false, ...props }, ref) => {
        const context = useFormContext()
        const { country } = useUILocaleConfig()
        return <AddressInput
            allowedCountries={(restrictToCurrentCountry && country) ? [country] : allowedCountries} // Can be overridden
            {...props}
            defaultValue={get(context.formState.defaultValues, props.name)} // Cannot be overridden
            ref={ref}
        />
    },
)))

type DropzoneFieldProps = Omit<DropzoneProps, "onChange" | "uploadHandler"> & { uploadHandler: FileUploadHandler }
/**
 * @zod presets.dropzone.min(1)
 * @example
 * const uploadHandler = useDropzoneHandler("single", { accept: { "application/*": ['.pdf', '.doc', '.docx'] } })
 *
 * const file = await uploadHandler.uploadSingleFile()
 *
 * <Field.Dropzone
 *    label="Curriculum vitae"
 *    name="resume"
 *    handler={uploadHandler}
 *    help="Document de 1 à 5 pages. (.pdf, .docx, .doc). < 5 MB."
 * />
 */
const DropzoneField = React.memo(withControlledInput(forwardRef<HTMLInputElement, FieldComponent<DropzoneFieldProps>>((props, ref) => {

        const controller = useController({ name: props.name! })

        return <Dropzone
            maxSize={5242880} // Can be overridden (5MB)
            {...props}
            onChange={(v) => { // Overrides the default onChange prop
                controller.field.onChange(v) // Change the underlying field so we can manage errors
            }}
            ref={ref}
        />
    },
)))


_Field.Text = TextInputField
_Field.Textarea = TextareaField
_Field.Select = SelectField
_Field.Switch = SwitchField
_Field.Checkbox = CheckboxField
_Field.CheckboxGroup = CheckboxGroupField
_Field.RadioGroup = RadioGroupField
_Field.RadioCards = RadioCardsField
_Field.SegmentedControl = SegmentedControlField
_Field.PhoneNumber = PhoneNumberInputField
_Field.Price = PriceInputField
_Field.Address = AddressField
_Field.Number = NumberField
_Field.MultiSelect = MultiSelectField
_Field.DatePicker = DatePickerField
_Field.DateRangePicker = DateRangePickerField
_Field.Combobox = ComboboxField
_Field.Time = TimeField
_Field.ColorInput = ColorInputField
_Field.Dropzone = DropzoneField
_Field.Submit = SubmitField

export const Field = createPolymorphicComponent<"div", FieldProps, {
    Text: typeof TextInputField,
    Textarea: typeof TextareaField,
    Select: typeof SelectField,
    Switch: typeof SwitchField,
    Checkbox: typeof CheckboxField,
    CheckboxGroup: typeof CheckboxGroupField,
    RadioGroup: typeof RadioGroupField,
    RadioCards: typeof RadioCardsField,
    SegmentedControl: typeof SegmentedControlField,
    PhoneNumber: typeof PhoneNumberInputField,
    Price: typeof PriceInputField,
    Address: typeof AddressField,
    Number: typeof NumberField,
    MultiSelect: typeof MultiSelectField
    DatePicker: typeof DatePickerField
    DateRangePicker: typeof DateRangePickerField
    Time: typeof TimeField
    Combobox: typeof ComboboxField
    ColorInput: typeof ColorInputField
    Dropzone: typeof DropzoneField,
    Submit: typeof SubmitField
}>(_Field)

Field.displayName = "Field"

// Utils
const getFormError = (name: string, formState: FormState<{ [x: string]: any }>) => {
    return get(formState.errors, name)
}


export type ReactRef<T> = React.RefCallback<T> | React.MutableRefObject<T>

export function assignRef<T = any>(
    ref: ReactRef<T> | null | undefined,
    value: T,
) {
    if (ref == null) return

    if (typeof ref === "function") {
        ref(value)
        return
    }

    try {
        ref.current = value
    } catch (error) {
        throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
    }
}

export function mergeRefs<T>(...refs: (ReactRef<T> | null | undefined)[]) {
    return (node: T | null) => {
        refs.forEach((ref) => {
            assignRef(ref, node)
        })
    }
}

export function useMergeRefs<T>(...refs: (ReactRef<T> | null | undefined)[]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => mergeRefs(...refs), refs)
}

const isTouched = (
    name: string,
    formState: FormState<{ [x: string]: any }>,
) => {
    return get(formState.touchedFields, name)
}

export type As<Props = any> = React.ElementType<Props>

"use client"

import { cn } from "@rahimstack/tailwind-utils"
import { cva } from "class-variance-authority"
import React, { useId } from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps } from "../basic-field"
import { ComponentWithAnatomy, defineStyleAnatomy } from "../core"
import type { SwitchProps as SwitchPrimitiveProps } from "@radix-ui/react-switch"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { ShowOnly } from "@/components/ui/show-only"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const SwitchAnatomy = defineStyleAnatomy({
    container: cva([
        "UI-Checkbox__rootLabel inline-flex gap-2 items-center"
    ]),
    control: cva([
        "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        "outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] focus-visible:ring-offset-1",
        "data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700", // Unchecked
        "data-[state=unchecked]:hover:bg-gray-300 dark:data-[state=unchecked]:hover:bg-gray-600", // Unchecked hover
        "data-[state=checked]:bg-brand", // Checked
    ], {
        variants: {
            hasError: {
                true: "border-red-500 dark:border-red-500",
                false: null,
            },
        },
        defaultVariants: {
            hasError: false,
        },
    }),
    thumb: cva([
        "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.4rem] data-[state=unchecked]:translate-x-1"
    ]),
    label: cva([
        "UI-Switch__label",
        "relative font-normal",
        "data-disabled:text-gray-300",
    ])
})

/* -------------------------------------------------------------------------------------------------
 * Switch
 * -----------------------------------------------------------------------------------------------*/

export interface SwitchProps
    extends Omit<SwitchPrimitiveProps, "disabled" | "required" | "onCheckedChange" | "onChange">,
        ComponentWithAnatomy<typeof SwitchAnatomy>,
        BasicFieldOptions {
    onChange?: (value: boolean) => void
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(({ className, ...props }, ref) => {

    const [{
        value,
        onChange,
        controlClassName,
        labelClassName,
        containerClassName,
        thumbClassName,
        ...rest
    }, { label, ...basicFieldProps }] = extractBasicFieldProps(props, useId())

    return (
        <BasicField
            {...basicFieldProps} // We do not include the label
            id={basicFieldProps.id}
        >
            <div
                className={cn(
                    SwitchAnatomy.container(),
                    containerClassName,
                )}
            >
                <SwitchPrimitive.Root
                    id={basicFieldProps.id}
                    ref={ref}
                    className={cn(
                        SwitchAnatomy.control({
                            hasError: !!basicFieldProps.error
                        }),
                        controlClassName,
                        className
                    )}
                    disabled={basicFieldProps.isDisabled}
                    required={basicFieldProps.isRequired}
                    onCheckedChange={(checked) => {
                        onChange && onChange(checked)
                    }}
                    {...rest}
                >
                    <SwitchPrimitive.Thumb
                        className={cn(
                            SwitchAnatomy.thumb(),
                            thumbClassName
                        )}
                    />
                </SwitchPrimitive.Root>
                <ShowOnly when={!!label || !!value}>
                    <label
                        className={cn(
                            SwitchAnatomy.label(),
                            labelClassName,
                        )}
                        htmlFor={basicFieldProps.id}
                    >
                        {label ?? value}
                    </label>
                </ShowOnly>
            </div>
        </BasicField>
    )

})

// export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
//
//     const [{
//         size = "md",
//         checked,
//         defaultChecked = false,
//         value,
//         onChange,
//         controlClassName,
//         labelClassName,
//         rootLabelClassName,
//         controlWrapperClassName,
//         controlKnobClassName,
//     }, { label, ...basicFieldProps }] = extractBasicFieldProps(props, useId())
//
//     const _default = useMemo(() => {
//         return (checked !== undefined) ? checked : defaultChecked
//     }, [])
//
//     const [state, send] = useMachine(checkbox.machine({
//         id: basicFieldProps.id,
//         name: basicFieldProps.name,
//         disabled: basicFieldProps.isDisabled,
//         // @ts-expect-error zag.js type error FIXME
//         readOnly: basicFieldProps.isReadOnly,
//         checked: _default,
//         onChange({ checked }) {
//
//             if (typeof checked === "boolean") {
//                 onChange && onChange(checked)
//             }
//         },
//     }))
//
//     const api = checkbox.connect(state, send, normalizeProps)
//
//     // Control the state
//     useEffect(() => {
//         if (checked !== undefined) api.setChecked(checked)
//     }, [checked])
//
//     return (
//         <>
//             <BasicField
//                 {...basicFieldProps} // We do not include the label
//                 id={api.inputProps.id}
//             >
//                 <label className={cn(SwitchAnatomy.rootLabel(), rootLabelClassName)} {...api.rootProps}>
//                     <input type="checkbox" {...api.inputProps} ref={ref}/>
//
//                     <div
//                         className={cn(
//                             SwitchAnatomy.controlWrapper({ size }),
//                             controlWrapperClassName,
//                         )}
//                     >
//
//                   <span
//                       className={cn(
//                           SwitchAnatomy.control({ hasError: !!basicFieldProps.error }),
//                           controlClassName,
//                       )} {...api.controlProps} />
//                         <span
//                             className={cn(
//                                 SwitchAnatomy.controlKnob({ size }),
//                                 controlKnobClassName,
//                             )}
//                             {...api.controlProps}
//                         />
//                     </div>
//
//
//                     {(!!label || !!value) && <span
//                         className={cn(
//                             SwitchAnatomy.label({ size }),
//                             labelClassName,
//                         )}
//                         {...api.labelProps}
//                     >
//                   {label ?? value}
//                </span>}
//                 </label>
//             </BasicField>
//         </>
//     )
//
// })

Switch.displayName = "Switch"

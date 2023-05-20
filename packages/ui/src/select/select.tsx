import { cn } from "@rahimstack/tailwind-utils"
import React, { useId } from "react"
import { BasicField, BasicFieldOptions, extractBasicFieldProps, InputAddon, inputContainerStyle, InputIcon, InputStyling, useStyleLibrary } from ".."

export interface SelectProps extends Omit<React.ComponentPropsWithRef<"select">, "size">, InputStyling, BasicFieldOptions {
   options?: { value: string | number, label?: string }[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
   
   const [{
      children,
      className,
      size = "md",
      intent = "basic",
      leftIcon,
      leftAddon,
      rightAddon,
      rightIcon,
      defaultValue,
      options = [],
      placeholder,
      ...rest
   }, basicFieldProps] = extractBasicFieldProps<SelectProps>(props, useId())
   
   const StyleLibrary = useStyleLibrary()
   
   return (
      <>
         <BasicField
            {...basicFieldProps}
         >
            <div className={cn(inputContainerStyle())}>
               
               <InputAddon addon={leftAddon} rightIcon={rightIcon} leftIcon={leftIcon} size={size} side={"left"} />
               <InputIcon icon={leftIcon} size={size} side={"left"} />
               
               <select
                  // type="text"
                  id={basicFieldProps.id}
                  name={basicFieldProps.name}
                  className={cn(
                     "form-select",
                     StyleLibrary.Input.input({
                        size,
                        intent,
                        hasError: !!basicFieldProps.error,
                        untouchable: !!basicFieldProps.isDisabled,
                        hasRightAddon: !!rightAddon,
                        hasRightIcon: !!rightIcon,
                        hasLeftAddon: !!leftAddon,
                        hasLeftIcon: !!leftIcon,
                     }),
                     className,
                  )}
                  disabled={basicFieldProps.isDisabled}
                  {...rest}
                  // defaultValue={defaultValue ? defaultValue : options[0]?.value} /!\ Select elements must be either controlled or uncontrolled.
                  ref={ref}
               >
                  {placeholder && <option value="">{placeholder}</option>}
                  {options.map(opt => (
                     <option key={opt.value} value={opt.value}>{opt.label ?? opt.value}</option>
                  ))}
               </select>
               
               <InputAddon addon={rightAddon} rightIcon={rightIcon} leftIcon={leftAddon} size={size} side={"right"} />
               <InputIcon icon={rightIcon} size={size} side={"right"} />
            
            </div>
         </BasicField>
      </>
   )
   
})

Select.displayName = "Select"

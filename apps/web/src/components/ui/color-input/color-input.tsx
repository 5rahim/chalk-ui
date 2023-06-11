"use client"

import React, { useRef, useState } from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "@/components/ui/core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { HexColorPicker } from "react-colorful"
import { TextInput, TextInputProps } from "@/components/ui/text-input"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const ColorInputAnatomy = defineStyleAnatomy({
    colorInput: cva([
        "UI-ColorInput__root",
        "w-6 h-6 rounded-md -ml-1 border border-[--border]"
    ]),
    colorPickerContainer: cva([
        "UI-ColorInput__colorPickerContainer",
        "flex w-full justify-center p-2"
    ])
})

/* -------------------------------------------------------------------------------------------------
 * ColorInput
 * -----------------------------------------------------------------------------------------------*/

export interface ColorInputProps extends ComponentWithAnatomy<typeof ColorInputAnatomy>,
    TextInputProps {
    children?: React.ReactNode
}

export const ColorInput: React.FC<ColorInputProps> = React.forwardRef((props, ref) => {

    const {
        children,
        colorInputClassName,
        colorPickerContainerClassName,
        className,
        ...rest
    } = props

    const [color, setColor] = useState("#aabbcc")

    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <DropdownMenu
            trigger={
                <TextInput
                    value={color}
                    onChange={e => setColor(e.target.value)}
                    leftIcon={
                        <div className={cn(ColorInputAnatomy.colorInput(), colorInputClassName)} style={{ backgroundColor: color }}/>
                    }
                    rightIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <circle cx="13.5" cy="6.5" r=".5"/>
                            <circle cx="17.5" cy="10.5" r=".5"/>
                            <circle cx="8.5" cy="7.5" r=".5"/>
                            <circle cx="6.5" cy="12.5" r=".5"/>
                            <path
                                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                        </svg>
                    }
                    ref={inputRef}
                    {...rest}
                />
            }
            dropdownClassName={"right-[inherit] left-0"}
        >
            <div className={cn(ColorInputAnatomy.colorPickerContainer(), colorPickerContainerClassName)}>
                <HexColorPicker color={color} onChange={setColor}/>
            </div>
        </DropdownMenu>
    )

})

ColorInput.displayName = "ColorInput"

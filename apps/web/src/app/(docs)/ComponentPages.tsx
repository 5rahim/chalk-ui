"use client"
import React from "react"
import components from "./components"

interface ComponentPagesProps {
    children?: React.ReactNode
    selectedComponent: string
}

export const ComponentPages: React.FC<ComponentPagesProps> = (props) => {

    const { children, selectedComponent, ...rest } = props

    return (
        <div>
            <h2>{components[selectedComponent]["title"]}</h2>
            {components[selectedComponent]["baseComponent"]()}
        </div>
    )

}

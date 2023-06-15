"use client"

import React from "react"
import { Alert } from "@/components/ui/alert"

interface AlertDemoProps {
    children?: React.ReactNode
}

export const AlertDemo: React.FC<AlertDemoProps> = (props) => {

    const { children, ...rest } = props

    return (
        <>
            <Alert title={"Title"} description={"Description"}/>
        </>
    )

}

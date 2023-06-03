"use client"

import React from "react"
import { useToast } from "@/components/ui/toast"

interface UITestProps {
    children?: React.ReactNode
}


export const UITest: React.FC<UITestProps> = (props) => {

    const { children, ...rest } = props
    const toast = useToast()

    return (
        <>
            <div className={"container max-w-5xl mt-10 space-y-4"}>
                <h2>Layouts</h2>


            </div>
        </>
    )

}

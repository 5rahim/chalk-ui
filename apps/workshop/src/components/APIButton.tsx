"use client"

import React from "react"
import { Button } from "./ui/button"
import { AiOutlineApi } from "@react-icons/all-files/ai/AiOutlineApi"

interface APIButtonProps {
    children?: React.ReactNode
    href: string
}

export const APIButton: React.FC<APIButtonProps> = (props) => {

    const { children, href, ...rest } = props

    return (
        <a href={href} target={"_blank"}>
            <Button rounded intent="primary-outline" size="sm" leftIcon={<AiOutlineApi/>}>{children}</Button>
        </a>
    )

}

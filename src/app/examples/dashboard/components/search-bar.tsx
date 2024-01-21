"use client"

import { TextInput } from "@/workshop/text-input"
import React from "react"
import { BiSearch } from "react-icons/bi"


export function SearchBar() {
    return (
        <TextInput
            className="shadow-none border-none focus:border-none focus:ring-0"
            placeholder="Search..."
            leftIcon={<BiSearch className={"w-5 h-5 text-[--muted]"} />}
            intent="unstyled"
        />
    )
}

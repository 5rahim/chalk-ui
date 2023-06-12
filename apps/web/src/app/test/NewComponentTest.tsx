"use client"

import React from "react"
import { ColorInput } from "@/components/ui/color-input"
import { Dropzone, useFileUploadHandler } from "@/components/ui/file-upload"

interface NewComponentTestProps {
    children?: React.ReactNode
}

export const NewComponentTest: React.FC<NewComponentTestProps> = (props) => {

    const { children, ...rest } = props

    const imageUploader = useFileUploadHandler("multiple")

    return (
        <>
            <Dropzone
                label={"Files"}
                // withImagePreview
                accept={{ "image/*": [".png", ".jpeg", ".jpg"] }}
                uploadHandler={imageUploader}
            />
            <ColorInput/>
        </>
    )

}

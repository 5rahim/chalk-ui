"use client"

import React from "react"
import { ColorInput } from "@/components/ui/color-input"
import { useFileUploadHandler } from "@/components/ui/file-upload"
import { createTypesafeFormSchema, Field, InferType, TypesafeForm } from "@/components/ui/typesafe-form"

interface NewComponentTestProps {
    children?: React.ReactNode
}

export const NewComponentTest: React.FC<NewComponentTestProps> = (props) => {

    const { children, ...rest } = props

    const imageUploader = useFileUploadHandler("multiple")
    const profilePictureUploader = useFileUploadHandler("single")

    const testSchema = createTypesafeFormSchema(({ z, presets }) => z.object({
        color: z.string(),
        profilePicture: presets.dropzone.min(1).max(1)
    }))

    return (
        <>
            <TypesafeForm<InferType<typeof testSchema>>
                schema={testSchema}
                onSubmit={console.log}
                onError={console.log}
            >
                <Field.CheckboxGroup
                    name={"group"}
                    options={[
                        { value: "1", label: "Option 1" },
                        { value: "2", label: "Option 2" },
                        { value: "3", label: "Option 3" },
                    ]}
                />
                <Field.Dropzone
                    label={"Profile picture"}
                    name={"profilePicture"}
                    uploadHandler={profilePictureUploader}
                />
                <Field.ColorInput
                    label={"Color"}
                    name={"color"}
                />
                <Field.Submit/>
            </TypesafeForm>
            {/*<Dropzone*/}
            {/*    label={"Files"}*/}
            {/*    // withImagePreview*/}
            {/*    accept={{ "image/*": [".png", ".jpeg", ".jpg"] }}*/}
            {/*    uploadHandler={imageUploader}*/}
            {/*/>*/}
            <ColorInput/>
        </>
    )

}

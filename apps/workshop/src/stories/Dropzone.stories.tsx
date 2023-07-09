import type { Meta, StoryObj } from "@storybook/react"
import { createTypesafeFormSchema, Field, InferType, TypesafeForm, TypesafeFormProps } from "../components/ui/typesafe-form"
import { Dropzone, useFileUploadHandler } from "../components/ui/file-upload"


const testSchema = createTypesafeFormSchema(({ z, presets }) => z.object({
    profilePicture: presets.dropzone
}))

const meta = {
    title: "Components/Forms/Dropzone",
    component: Dropzone,
    tags: ["autodocs"],
    // @ts-ignore
    render: (args: TypesafeFormProps<InferType<typeof testSchema>>) => {
        const pfpHandler = useFileUploadHandler("single")
        const documentHandler = useFileUploadHandler("multiple")
        return (
            <TypesafeForm<InferType<typeof testSchema>>
                schema={testSchema}
                onSubmit={console.log}
            >
                <Field.Dropzone
                    label={"Documents"}
                    name={"profilePicture"}
                    accept={{ "application/*": [".pdf", ".docx", ".doc"] }}
                    uploadHandler={documentHandler}
                />
                <Field.Dropzone
                    label={"Profile picture"}
                    name={"profilePicture"}
                    accept={{ "image/*": [".png", ".jpeg", ".jpg"] }}
                    withImagePreview
                    uploadHandler={pfpHandler}
                />
            </TypesafeForm>
        )
    },
    args: {},
} satisfies Meta<typeof Dropzone>


export default meta
type Story = StoryObj<Omit<TypesafeFormProps, "trigger">>;

export const Basic: Story = {
    args: {}
}

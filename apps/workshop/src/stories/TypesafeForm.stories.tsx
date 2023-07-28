import type { Meta, StoryObj } from "@storybook/react"
import { createTypesafeFormSchema, Field, TypesafeForm, TypesafeFormProps } from "../components/ui/typesafe-form"
import { useFileUploadHandler } from "../components/ui/file-upload"


const testSchema = createTypesafeFormSchema(({ z, presets }) => z.object({
    name: z.string().min(2),
    birthday: presets.datePicker,
    phone: presets.phone,
    profilePicture: presets.dropzone,
}))

const meta = {
    title: "Advanced/Typesafe Form",
    component: TypesafeForm,
    tags: ["autodocs"],
    parameters: {
        docs: {
            source: {
                code: null,
            },
        },
    },
    // @ts-ignore
    render: (args) => {
        const uploadHandler = useFileUploadHandler("single")
        return (
            <TypesafeForm
                schema={testSchema}
                onSubmit={data => {
                    console.log(data)
                }}
            >
                <Field.Text
                    label={"Name"}
                    name={"name"}
                />
                <Field.DatePicker
                    label={"Birthday"}
                    name={"birthday"}
                />
                <Field.PhoneNumber
                    label={"Phone"}
                    name={"phone"}
                />
                <Field.SegmentedControl
                    label={"Phone"}
                    name={"test"}
                    options={[{ value: "F" }, { value: "H" }]}
                />
                <Field.Dropzone
                    label={"Profile picture"}
                    name={"profilePicture"}
                    accept={{ "image/*": [".png", ".jpeg", ".jpg"] }}
                    withImagePreview
                    uploadHandler={uploadHandler}
                />
                <Field.Submit>Submit</Field.Submit>
            </TypesafeForm>
        )
    },
    args: {},
} satisfies Meta<typeof TypesafeForm>


export default meta
type Story = StoryObj<Omit<TypesafeFormProps, "trigger">>;

export const Basic: Story = {
    args: {},
}

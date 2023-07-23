import type { Meta, StoryObj } from "@storybook/react"
import { createTypesafeFormSchema, Field, InferType, TypesafeForm, TypesafeFormProps } from "../components/ui/typesafe-form"
import { useFileUploadHandler } from "../components/ui/file-upload"


const testSchema = createTypesafeFormSchema(({ z, presets }) => z.object({
    name: z.string().min(2),
    birthday: presets.datePicker,
    phone: presets.phone,
    profilePicture: presets.dropzone
}))

const meta = {
    title: "Advanced/Typesafe Form",
    component: TypesafeForm,
    tags: ["autodocs"],
    // @ts-ignore
    render: (args: TypesafeFormProps<InferType<typeof testSchema>>) => {
        const uploadHandler = useFileUploadHandler("single")
        return (
            <TypesafeForm<InferType<typeof testSchema>>
                {...args}
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
                <Field.Combobox
                    label={"Gender"}
                    name={"test"}
                    options={[{ value: "F" }, { value: "H" }]}
                />
                <Field.MultiSelect
                    label={"Gender"}
                    name={"test2"}
                    options={[{ value: "F" }, { value: "H" }]}
                />
                <Field.CheckboxGroup
                    label={"Gender"}
                    name={"gender2"}
                    options={[{ value: "F" }, { value: "H" }]}
                />
                <Field.RadioGroup
                    label={"Gender"}
                    name={"gender3"}
                    options={[{ value: "F" }, { value: "H" }]}
                />
                <Field.SegmentedControl
                    label={"Gender"}
                    name={"gender"}
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
    args: {
        onSubmit: console.log,
        schema: testSchema
    },
} satisfies Meta<typeof TypesafeForm>


export default meta
type Story = StoryObj<Omit<TypesafeFormProps, "trigger">>;

export const Basic: Story = {
    args: {}
}

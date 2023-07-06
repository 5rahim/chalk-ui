import type { Meta, StoryObj } from "@storybook/react"
import { createTypesafeFormSchema, Field, InferType, TypesafeForm, TypesafeFormProps } from "../components/ui/typesafe-form"


const testSchema = createTypesafeFormSchema(({ z }) => z.object({
    gender: z.string()
}))

const meta = {
    title: "Components/Advanced/Typesafe Form",
    component: TypesafeForm,
    tags: ["autodocs"],
    // @ts-ignore
    render: (args: TypesafeFormProps<InferType<typeof testSchema>>) => {
        return (
            <TypesafeForm<InferType<typeof testSchema>>
                {...args}
            >
                <Field.RadioCards
                    name={"gender"}
                    options={[
                        { value: "H" },
                        { value: "F" },
                        { value: "H/F" },
                    ]}
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

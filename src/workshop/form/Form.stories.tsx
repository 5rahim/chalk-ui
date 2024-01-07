import type { Meta, StoryObj } from "@storybook/react"
import { addDays } from "date-fns"
import { Field, Form } from "."
import { defineSchema } from "../form/define-schema"


const testSchema = defineSchema(({ z, presets }) => z.object({
    name: z.string().min(2),
    birthday: presets.datePicker,
    booking: presets.dateRangePicker,
    country: presets.select,
    countries: presets.multiSelect.min(2),
}))

const meta = {
    title: "Advanced/Form",
    component: Form,
    tags: ["autodocs"],
    parameters: {
        docs: {
            source: {
                code: null,
            },
        },
        layout: "centered",
    },
    render: (args) => {
        return (
            <div className="sm:w-[400px] w-full">
                <Form {...args}>
                    <Field.Text label="Name" name="name" />
                    <Field.DatePicker label="Birthday" name="birthday" />
                    <Field.DateRangePicker label="Booking" name="booking" />
                    <Field.NativeSelect
                        label="Country" name="country" placeholder="Select a country..." options={[
                        { value: "us", label: "United States" },
                        { value: "ci", label: "Côte d'Ivoire" },
                        { value: "ca", label: "Canada" },
                        { value: "jp", label: "Japan" },
                        { value: "br", label: "Brazil" },
                    ]}
                    />
                    <Field.Select
                        label="Country" name="country" placeholder="Select a country..." options={[
                        { value: "us", label: "United States" },
                        { value: "ci", label: "Côte d'Ivoire" },
                        { value: "ca", label: "Canada" },
                        { value: "jp", label: "Japan" },
                        { value: "br", label: "Brazil" },
                    ]}
                    />
                    <Field.Combobox
                        label="Countries" name="countries" placeholder="Select countries..." emptyMessage="No countries found" multiple options={[
                        { value: "us", label: "United States" },
                        { value: "ci", label: "Côte d'Ivoire" },
                        { value: "ca", label: "Canada" },
                        { value: "jp", label: "Japan" },
                        { value: "br", label: "Brazil" },
                    ]}
                    />
                    <Field.Submit role="create" />
                </Form>
            </div>
        )
    },
    args: {
        schema: testSchema,
        onSubmit: console.log,
        onError: console.log,
        onChange: console.log,
    },
} satisfies Meta<typeof Form>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}


export const DefaultValues: Story = {
    args: {
        defaultValues: {
            name: "John Doe",
            birthday: new Date(),
            booking: {
                from: new Date(),
                to: addDays(new Date(), 7),
            },
            country: "ci",
            countries: ["jp", "ci"],
        },
    },
}

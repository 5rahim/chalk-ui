import type { Meta, StoryObj } from "@storybook/react"
import { addDays } from "date-fns"
import { Field, Form } from "@/workshop/form"
import { defineSchema } from "@/workshop/form"

const testSchema = defineSchema(({ z, presets }) => z.object({
    name: z.string().min(2),
    birthday: z.date(),
    booking: presets.dateRangePicker,
    price: z.string(),
    number: z.number(),
    phone: presets.phone,
    country: presets.select,
    countries: presets.multiSelect.min(2),
    day: presets.autocomplete,
    profilePicture: presets.filesOrEmpty,
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
            <div className="sm:w-[450px] w-full relative p-4">
                <Form {...args}>
                    <Field.Text label="Name" name="name" />
                    <Field.DatePicker label="Birthday" name="birthday" />
                    <Field.DateRangePicker label="Booking" name="booking" />
                    <Field.Address apiKey={process.env.STORYBOOK_GOOGLE_MAPS_API_KEY || ""} label="Address" name="address" />
                    <Field.Phone label="Phone number" name="phone" />
                    <Field.Number label="Number" name="number" />
                    <Field.Currency label="Price" name="price" intlConfig={{ locale: "US", currency: "USD" }} />
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
                    <Field.RadioGroup
                        label="Country" name="country" options={[
                        { value: "us", label: "United States" },
                        { value: "ci", label: "Côte d'Ivoire" },
                        { value: "ca", label: "Canada" },
                        { value: "jp", label: "Japan" },
                        { value: "br", label: "Brazil" },
                    ]}
                    />
                    <Field.Combobox
                        label="Countries" name="countries" placeholder="Select countries..." emptyMessage="No countries found" multiple options={[
                        { value: "us", textValue: "United States", label: "United States" },
                        { value: "ci", textValue: "Côte d'Ivoire", label: "Côte d'Ivoire" },
                        { value: "ca", textValue: "Canada", label: "Canada" },
                        { value: "jp", textValue: "Japan", label: "Japan" },
                        { value: "br", textValue: "Brazil", label: "Brazil" },
                    ]}
                    />
                    <Field.CheckboxGroup
                        label="Countries" name="countries" options={[
                        { value: "us", label: "United States" },
                        { value: "ci", label: "Côte d'Ivoire" },
                        { value: "ca", label: "Canada" },
                        { value: "jp", label: "Japan" },
                        { value: "br", label: "Brazil" },
                    ]}
                    />
                    <Field.Autocomplete
                        label="Day" name="day" placeholder="Select a day" options={[
                        { value: "mo", label: "Monday" },
                        { value: "tu", label: "Tuesday" },
                    ]}
                    />
                    <Field.SimpleDropzone
                        label="Profile picture" name="profilePicture"
                    />
                    <Field.Submit role="create">Create</Field.Submit>
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
            phone: "+1 (240) 999 9999",
            address: { value: null, label: "Abidjan, Côte d'Ivoire" },
            number: 50,
            price: "350.99",
            booking: {
                from: new Date(),
                to: addDays(new Date(), 7),
            },
            country: "ci",
            countries: ["jp", "ci"],
            day: { value: null, label: "Monday" },
        },
    },
}

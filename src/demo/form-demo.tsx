import { defineSchema, Field, Form } from "@/workshop/form"
import { ScrollArea } from "@/workshop/scroll-area"

const schema = defineSchema(({ z, presets }) => z.object({
    name: z.string().min(2),
    birthday: presets.datePicker,
    booking: presets.dateRangePicker,
    price: z.string(),
    number: z.number(),
    phone: presets.phone,
    country: presets.select,
    countries: presets.multiSelect.min(2),
    day: presets.autocomplete,
    profilePicture: presets.filesOrEmpty,
}))

export default function FormDemo() {
    return (
        <div className="max-w-[600px] mx-auto w-full relative p-4">
            <ScrollArea className="h-[520px] w-full p-4 border rounded-[--radius]" type="always">
                <Form
                    schema={schema}
                    onSubmit={(data) => {
                        console.log(data)
                    }}
                    stackClass="px-2"
                >
                    <Field.Text label="Name" name="name" />
                    <Field.DatePicker label="Birthday" name="birthday" />
                    <Field.DateRangePicker label="Booking" name="booking" />
                    <Field.Address apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} label="Address" name="address" />
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
                        withImagePreview
                    />
                    <Field.Submit role="submit">Submit</Field.Submit>
                </Form>
            </ScrollArea>
        </div>
    )
}

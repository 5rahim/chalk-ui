import { Select } from "@/workshop/select"

export default function SelectDemo() {
    return (
        <Select
            label="Country"
            placeholder="Select a country..."
            options={[
                { value: "us", label: "United States" },
                { value: "ci", label: "Côte d'Ivoire" },
                { value: "ca", label: "Canada" },
                { value: "jp", label: "Japan" },
                { value: "br", label: "Brazil", disabled: true },
            ]}
        />
    )
}

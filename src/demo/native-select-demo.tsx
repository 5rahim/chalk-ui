import { NativeSelect } from "@/workshop/native-select"

export default function NativeSelectDemo() {
    return (
        <NativeSelect
            label="Country"
            options={[
                { value: "us", label: "United States" },
                { value: "ci", label: "Côte d'Ivoire" },
                { value: "ca", label: "Canada" },
                { value: "jp", label: "Japan" },
                { value: "br", label: "Brazil" },
            ]}
        />
    )
}

import { Autocomplete, AutocompleteOption } from "@/workshop/autocomplete"

const options: AutocompleteOption[] = [
    { label: "United States", value: "us" },
    { label: "Côte d'Ivoire", value: "ci" },
    { label: "Canada", value: "ca" },
    { label: "Japan", value: "jp" },
    { label: "Brazil", value: "br" },
]

export default function AutocompleteDemo() {
    return (
        <Autocomplete
            label="Country"
            options={options}
            placeholder="Enter a country..."
            autoFilter={false}
        />
    )
}

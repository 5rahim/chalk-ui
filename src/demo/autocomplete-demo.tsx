import { Autocomplete, AutocompleteOption } from "@/workshop/autocomplete"
import * as React from "react"

const options: AutocompleteOption[] = [
    { label: "United States", value: "us" },
    { label: "Côte d'Ivoire", value: "ci" },
    { label: "Canada", value: "ca" },
    { label: "Japan", value: "jp" },
    { label: "Brazil", value: "br" },
]

export default function AutocompleteDemo() {

    const [value, setValue] = React.useState<AutocompleteOption | undefined>(undefined)

    return (
        <Autocomplete
            label="Country"
            options={options}
            value={value}
            onValueChange={setValue}
            placeholder="Enter a country..."
        />
    )
}

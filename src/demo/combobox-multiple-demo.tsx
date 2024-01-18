import { Combobox } from "@/workshop/combobox"
import * as React from "react"
import { BiSolidMapPin } from "react-icons/bi"

export default function ComboboxMultipleDemo() {
    const [values, setValues] = React.useState<string[]>([])

    return (
        <Combobox
            multiple
            label="Country"
            value={values}
            onValueChange={setValues}
            options={[{
                value: "us",
                textValue: "United States",
                label: <div className="flex gap-2 items-center font-semibold"><BiSolidMapPin /> United States</div>,
            },
                { value: "ci", textValue: "Côte d'Ivoire", label: "Côte d'Ivoire" },
                { value: "jp", textValue: "Japan", label: "Japan" },
                { value: "br", textValue: "Brazil", label: "Brazil" },
                { value: "uk", textValue: "United Kingdom", label: "United Kingdom" },
                { value: "sn", textValue: "Sénégal", label: "Sénégal" },
                { value: "fr", textValue: "France", label: "France" },
                { value: "de", textValue: "Germany", label: "Germany" },
                { value: "ng", textValue: "Nigeria", label: "Nigeria" },
                { value: "ca", textValue: "Canada", label: "Canada" },
                { value: "gh", textValue: "Ghana", label: "Ghana" },
                { value: "za", textValue: "South Africa", label: "South Africa" },
            ]}
            emptyMessage="No countries found"
        />
    )
}


import { RadioGroup } from "@/workshop/radio-group"
import * as React from "react"

export default function RadioGroupDemo() {
    const [value, setValue] = React.useState<string | undefined>("us")

    return (
        <RadioGroup
            value={value}
            onValueChange={setValue}
            options={[
                { value: "us", label: "United States" },
                { value: "ci", label: "Côte d'Ivoire" },
                { value: "ca", label: "Canada" },
                { value: "jp", label: "Japan" },
                { value: "br", label: "Brazil", disabled: true },
            ]}
            fieldClass="w-fit"
        />
    )
}

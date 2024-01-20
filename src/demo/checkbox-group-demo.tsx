import { CheckboxGroup } from "@/workshop/checkbox"
import * as React from "react"

export default function CheckboxGroupDemo() {
    const [value, setValue] = React.useState<string[]>(["us"])

    return (
        <CheckboxGroup
            label="Country"
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

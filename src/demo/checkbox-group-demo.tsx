import { CheckboxGroup } from "@/workshop/checkbox"
import * as React from "react"

export default function CheckboxGroupDemo() {
    const [value, setValue] = React.useState<string[]>(["1"])

    return (
        <CheckboxGroup
            label="Label"
            value={value}
            onValueChange={setValue}
            options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
                { value: "3", label: "Option 3" },
                { value: "4", label: "Option 4", disabled: true },
            ]}
            fieldClass="w-fit"
        />
    )
}

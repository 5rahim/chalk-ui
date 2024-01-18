import { Checkbox } from "@/workshop/checkbox"
import * as React from "react"

export default function CheckboxDemo() {
    const [value, setValue] = React.useState<boolean | "indeterminate">("indeterminate")

    return (
        <Checkbox
            label="Checkbox"
            value={value}
            onValueChange={setValue}
            fieldClass="w-fit"
        />
    )
}

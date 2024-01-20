import { NumberInput } from "@/workshop/number-input"
import * as React from "react"

export default function NumberInputDemo() {
    const [value, setValue] = React.useState(20)
    const [stringValue, setStringValue] = React.useState("20")

    return (
        <NumberInput
            value={value}
            onValueChange={(value, valueAsString) => {
                setValue(value)
                setStringValue(valueAsString)
            }}
        />
    )
}

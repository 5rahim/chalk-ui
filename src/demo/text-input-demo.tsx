import { TextInput } from "@/workshop/text-input"
import * as React from "react"

export default function TextInputDemo() {
    const [value, setValue] = React.useState<string>("")

    return (
        <TextInput
            label="Text Input"
            value={value}
            onValueChange={setValue}
        />
    )
}

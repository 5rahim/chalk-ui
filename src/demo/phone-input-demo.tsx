import { PhoneInput } from "@/workshop/phone-input"
import { E164Number } from "libphonenumber-js"
import * as React from "react"

export default function PhoneInputDemo() {
    const [value, setValue] = React.useState<E164Number | undefined>("+1 (909) 606 9999")

    return (
        <PhoneInput
            value={value}
            onValueChange={setValue}
        />
    )
}

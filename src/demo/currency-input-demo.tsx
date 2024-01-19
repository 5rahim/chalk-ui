import { CurrencyInput } from "@/workshop/currency-input"
import * as React from "react"

export default function CurrencyInputDemo() {
    const [value, setValue] = React.useState<string | undefined>("1000")

    return (
        <CurrencyInput
            label="Price"
            value={value}
            onValueChange={(value, values) => {
                console.log("value", value, values)
                setValue(value)
            }}
            intlConfig={{ locale: "en-US", currency: "USD" }}
        />
    )
}

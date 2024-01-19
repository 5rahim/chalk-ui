import { DatePicker } from "@/workshop/date-picker"
import * as React from "react"

export default function DatePickerDemo() {
    const [value, setValue] = React.useState<Date | undefined>(new Date())

    return (
        <DatePicker
            value={value}
            onValueChange={setValue}
        />
    )
}

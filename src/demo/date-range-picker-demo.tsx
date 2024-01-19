import { DateRangePicker } from "@/workshop/date-picker"
import { addDays } from "date-fns"
import * as React from "react"
import { DateRange } from "react-day-picker"

export default function DateRangePickerDemo() {
    const [value, setValue] = React.useState<DateRange | undefined>({ from: new Date(), to: addDays(new Date(), 7) })

    return (
        <DateRangePicker
            value={value}
            onValueChange={setValue}
        />
    )
}

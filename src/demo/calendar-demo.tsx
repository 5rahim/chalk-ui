import { Calendar } from "@/workshop/calendar"
import * as React from "react"

export default function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    return (
        <div className="min-[900px]:w-[800px] flex justify-center w-full">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
            />
        </div>
    )
}

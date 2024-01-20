import { ProgressBar } from "@/workshop/progress-bar"
import * as React from "react"

export default function ProgressBarDemo() {
    const [value, setValue] = React.useState(30)

    React.useEffect(() => {
        const t = setTimeout(() => {
            setValue(80)
        }, 1000)
        return () => clearTimeout(t)
    }, [])

    return (
        <ProgressBar value={value} />
    )
}

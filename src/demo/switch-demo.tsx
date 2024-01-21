import { Switch } from "@/workshop/switch"
import * as React from "react"

export default function SwitchDemo() {
    const [value, setValue] = React.useState<boolean>(true)

    return (
        <Switch
            label="Switch"
            value={value}
            onValueChange={setValue}
            fieldClass="w-fit"
        />
    )
}

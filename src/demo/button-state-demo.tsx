import { Button } from "@/workshop/button"
import { Switch } from "@/workshop/switch"
import * as React from "react"

export default function ButtonDemo() {
    const [disabled, setDisabled] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    return (
        <div>
            <Button disabled={disabled} loading={loading}>Button</Button>

            <div className="p-2 border rounded-[--radius] mt-4 space-y-2">
                <Switch value={disabled} onValueChange={setDisabled} label="Disabled" />
                <Switch value={loading} onValueChange={setLoading} label="Loading" />
            </div>
        </div>
    )
}

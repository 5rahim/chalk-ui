import { Checkbox } from "@/workshop/checkbox"
import { Switch } from "@/workshop/switch"
import { TextInput } from "@/workshop/text-input"
import * as React from "react"

export default function CheckboxDemo() {
    const [value, setValue] = React.useState<boolean | "indeterminate">("indeterminate")

    const [disabled, setDisabled] = React.useState(true)
    const [readonly, setReadonly] = React.useState(false)
    const [error, setError] = React.useState("")
    const [help, setHelp] = React.useState("")

    return (
        <div className="w-full">
            <Checkbox
                label="Checkbox"
                value={value}
                onValueChange={setValue}
                fieldClass="w-fit"
                disabled={disabled}
                readonly={readonly}
                error={error}
                help={help}
            />
            <div className="p-4 border rounded-[--radius] mt-4 space-y-2">
                <div className="flex gap-2">
                    <Switch value={disabled} onValueChange={setDisabled} label="Disabled" />
                    <Switch value={readonly} onValueChange={setReadonly} label="Readonly" />
                </div>
                <div className="flex gap-2">
                    <TextInput value={error} onValueChange={setError} label="Error" size="sm" />
                    <TextInput value={help} onValueChange={setHelp} label="Help/Description" size="sm" />
                </div>
            </div>
        </div>
)
}

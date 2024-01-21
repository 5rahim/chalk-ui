import { Switch } from "@/workshop/switch"
import { TextInput } from "@/workshop/text-input"
import * as React from "react"
import { BiSearch, BiUser } from "react-icons/bi"

export default function TextInputDemo() {
    const [value, setValue] = React.useState<string>("")


    return (
        <div className="w-full space-y-2">
            <TextInput
                value={value}
                onValueChange={setValue}
                leftIcon={<BiSearch />}
            />
            <TextInput
                value={value}
                onValueChange={setValue}
                rightIcon={<BiSearch />}
            />
            <TextInput
                value={value}
                onValueChange={setValue}
                leftAddon="https://"
                rightAddon=".com"
            />
            <TextInput
                value={value}
                onValueChange={setValue}
                leftAddon="Username"
                leftIcon={<BiUser />}
            />
        </div>
    )
}

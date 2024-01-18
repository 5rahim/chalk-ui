//@ts-nocheck
import { Button } from "@/workshop/button"
import { CheckboxGroup } from "@/workshop/checkbox"
import * as React from "react"

export default function CheckboxGroupUncontrolledDemo() {

    return (
        <form
            action="#"
            method="get"
            onSubmit={e => {
                e.preventDefault()
                alert(JSON.stringify(e.currentTarget.elements["group"].value, null, 2))
            }}
            className="space-y-2 w-full"
        >
            <CheckboxGroup
                name="group"
                label="Checkbox Group"
                required
                options={[
                    { value: "1", label: "Option 1" },
                    { value: "2", label: "Option 2" },
                    { value: "3", label: "Option 3" },
                    { value: "4", label: "Option 4", disabled: true },
                ]}
            />
            <Button type="submit" size="sm">Submit</Button>
        </form>
    )
}

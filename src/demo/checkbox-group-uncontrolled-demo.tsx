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
                label="Country"
                required
                options={[
                    { value: "us", label: "United States" },
                    { value: "ci", label: "Côte d'Ivoire" },
                    { value: "ca", label: "Canada" },
                    { value: "jp", label: "Japan" },
                    { value: "br", label: "Brazil", disabled: true },
                ]}
            />
            <Button type="submit" size="sm">Submit</Button>
        </form>
    )
}

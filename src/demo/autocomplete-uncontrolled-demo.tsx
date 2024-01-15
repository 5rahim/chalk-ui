//@ts-nocheck
import { Autocomplete, AutocompleteOption } from "@/workshop/autocomplete"
import { Button } from "@/workshop/button"
import * as React from "react"

const options: AutocompleteOption[] = [
    { label: "United States", value: "us" },
    { label: "Côte d'Ivoire", value: "ci" },
    { label: "Canada", value: "ca" },
    { label: "Japan", value: "jp" },
    { label: "Brazil", value: "br" },
]

export default function AutocompleteDemo() {
    return (
        <form
            action="#"
            method="get"
            onSubmit={e => {
                e.preventDefault()
                alert(JSON.stringify(e.currentTarget.elements["country"].value, null, 2))
            }}
            className="space-y-2 w-full"
        >
            <Autocomplete
                label="Country"
                name="country"
                options={options}
                required
            />
            <Button type="submit" size="sm">Submit</Button>
        </form>
    )
}

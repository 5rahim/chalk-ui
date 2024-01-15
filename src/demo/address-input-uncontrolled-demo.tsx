//@ts-nocheck
import { AddressInput } from "@/workshop/address-input"
import { AutocompleteOption } from "@/workshop/autocomplete"
import { Button } from "@/workshop/button"
import * as React from "react"

export default function AddressInputCustomDemo() {

    return (
        <form
            action="#"
            method="get"
            onSubmit={e => {
                e.preventDefault()
                alert(JSON.stringify(e.currentTarget.elements["address"].value, null, 2))
            }}
            className="space-y-4 w-full"
        >
            <AddressInput
                label="Address"
                name="address"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
            />
            <Button type="submit">Submit</Button>
        </form>
    )
}

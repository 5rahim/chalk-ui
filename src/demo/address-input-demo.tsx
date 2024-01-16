import { AddressInput } from "@/workshop/address-input"
import { AutocompleteOption } from "@/workshop/autocomplete"
import * as React from "react"

export default function AddressInputDemo() {
    const [address, setAddress] = React.useState<AutocompleteOption | undefined>({ value: null, label: "" })

    return (
        <AddressInput
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
            label="Address"
            value={address}
            onValueChange={setAddress}
        />
    )
}

import { Alert } from "@/workshop/alert"
import * as React from "react"

export default function AlertDemo() {
    const [isOpen, setIsOpen] = React.useState(true)

    return (
        <>
            {isOpen && (
                <Alert
                    title="Alert"
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae deserunt facilis."
                    intent="info"
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    )

}

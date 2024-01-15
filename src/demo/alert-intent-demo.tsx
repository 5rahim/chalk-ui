//@ts-nocheck
import { Alert } from "@/workshop/alert"
import * as React from "react"

export default function AlertIntentDemo() {

    const intents = ["info", "info-basic", "success", "success-basic", "warning", "warning-basic", "alert", "alert-basic"]

    return (
        <div className="space-y-2">
            {intents.map((intent) => (
                <Alert
                    key={intent}
                    title="Alert"
                    description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae deserunt facilis."
                    intent={intent}
                />
            ))}
        </div>
    )

}

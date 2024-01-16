//@ts-nocheck
import { Button } from "@/workshop/button"

export default function ButtonDemo() {
    const intents = ["primary", "primary-outline", "primary-subtle", "primary-link", "primary-basic",
        "warning", "warning-outline", "warning-subtle", "warning-link", "warning-basic",
        "success", "success-outline", "success-subtle", "success-link", "success-basic",
        "alert", "alert-outline", "alert-subtle", "alert-link", "alert-basic",
        "gray", "gray-outline", "gray-subtle", "gray-link", "gray-basic",
        "white", "white-outline", "white-subtle", "white-link", "white-basic",
    ]

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {intents.slice(0, -5).map(intent => (
                    <Button key={intent} intent={intent}>{intent}</Button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-indigo-950 p-4 rounded-[--radius] mt-4">
                {intents.slice(-5).map(intent => (
                    <Button key={intent} intent={intent}>{intent}</Button>
                ))}
            </div>
        </div>
    )
}

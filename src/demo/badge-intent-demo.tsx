//@ts-nocheck
import { Badge } from "@/workshop/badge"

export default function BadgeDemo() {
    const intents = [
        "primary",
        "primary-solid",
        "alert",
        "alert-solid",
        "success",
        "success-solid",
        "warning",
        "warning-solid",
        "blue",
        "blue-solid",
        "gray",
        "gray-solid",
        "white",
        "white-solid",
    ]

    return (
        <div className="flex flex-wrap items-center gap-4">
            {intents.map(intent => (
                <Badge key={intent} intent={intent}>Badge</Badge>
            ))}
        </div>
    )
}

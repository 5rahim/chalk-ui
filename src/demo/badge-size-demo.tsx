//@ts-nocheck
import { Badge } from "@/workshop/badge"

export default function BadgeDemo() {
    const sizes = ["sm", "md", "lg", "xl"]

    return (
        <div className="flex flex-wrap items-center gap-4">
            {sizes.map(size => (
                <Badge key={size} size={size}>Badge</Badge>
            ))}
        </div>
    )
}

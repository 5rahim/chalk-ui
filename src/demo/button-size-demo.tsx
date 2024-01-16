//@ts-nocheck
import { Button } from "@/workshop/button"

export default function ButtonDemo() {
    const sizes = ["xs", "sm", "md", "lg", "xl"]

    return (
        <div className="flex gap-4 flex-wrap items-center">
            {sizes.map(size => (
                <Button key={size} size={size}>Button</Button>
            ))}
        </div>
    )
}

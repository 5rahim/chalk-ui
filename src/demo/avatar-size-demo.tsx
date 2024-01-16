//@ts-nocheck
import { Avatar } from "@/workshop/avatar"

export default function AvatarDemo() {
    const sizes = ["xs", "sm", "md", "lg", "xl"]

    return (
        <div className="flex flex-wrap items-center gap-4">
            {sizes.map(size => (
                <Avatar key={size} size={size} src="/images/wano-luffy.jpg" />
            ))}
        </div>
    )
}

import { Avatar } from "@/workshop/avatar"

export default function AvatarDemo() {
    return (
        <Avatar
            fallback={<span className="font-bold text-white">5R</span>}
            fallbackClass="bg-[--brand]"
        />
    )
}

import { Avatar } from "@/workshop/avatar"
import { HoverCard } from "@/workshop/hover-card"

export default function HoverCardDemo() {
    return (
        <HoverCard trigger={<Avatar src="/images/wano-luffy.jpg" />}>
            <div className="flex gap-2 items-center">
                <Avatar size="xs" src="/images/wano-luffy.jpg" />
                <h5>Monkey D. Luffy</h5>
            </div>
            <p className="mt-2 text-[--muted]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur eaque sequi sit.
            </p>
        </HoverCard>
    )
}

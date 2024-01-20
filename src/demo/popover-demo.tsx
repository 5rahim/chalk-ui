import { Avatar } from "@/workshop/avatar"
import { Popover } from "@/workshop/popover"

export default function PopoverDemo() {
    return (
        <Popover trigger={<Avatar src="/images/wano-luffy.jpg" className="cursor-pointer" />}>
            <div className="flex gap-2 items-center">
                <Avatar size="xs" src="/images/wano-luffy.jpg" />
                <h5>Monkey D. Luffy</h5>
            </div>
            <p className="mt-2 text-[--muted] text-pretty leading-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur eaque sequi sit.
            </p>
        </Popover>
    )
}

import { Badge } from "@/workshop/badge"
import { Timeline } from "@/workshop/timeline"
import { BiLock, BiReply, BiUser } from "react-icons/bi"

export default function TimelineDemo() {
    return (
        <Timeline
            items={[
                {
                    title: "John doe",
                    description: "Locked the thread 2 hours ago",
                    icon: <BiLock className="text-white text-lg font-bold" />,
                    iconClass: "bg-[--zinc] border-[--zinc]",
                    lineClass: "bg-[--zinc] w-0.5",
                },
                {
                    title: "Jack",
                    description: <div className="flex gap-1 items-center"><BiReply className="text-lg text-[--muted]" /> Replied 2d ago</div>,
                    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                    icon: <BiUser />,
                },
                {
                    title: <span className="flex items-center gap-1">
                        <span className="font-semibold">John Doe</span>
                        <Badge size="sm">Owner</Badge>
                    </span>,
                    description: "Opened the thread 2d ago",
                    icon: <BiUser />,
                    unstyledTitle: true,
                },
            ]}
        />
    )
}

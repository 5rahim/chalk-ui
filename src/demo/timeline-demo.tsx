import { Timeline } from "@/workshop/timeline"
import { BiUser } from "react-icons/bi"

export default function TimelineDemo() {
    return (
        <Timeline
            items={[
                { title: "John doe", description: "Commented 2d ago", icon: <BiUser /> },
                { title: "Jane doe", description: "Commented 4d ago", icon: <BiUser /> },
                { title: "John doe", description: "Commented 6d ago", icon: <BiUser /> },
            ]}
        />
    )
}

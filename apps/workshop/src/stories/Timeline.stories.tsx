import type { Meta, StoryObj } from "@storybook/react"
import { Timeline, TimelineProps } from "../components/ui/timeline"
import { BiUser } from "@react-icons/all-files/bi/BiUser"
import { BiLock } from "@react-icons/all-files/bi/BiLock"
import { BiReply } from "@react-icons/all-files/bi/BiReply"
import { Badge } from "../components/ui/badge"

const meta = {
    title: "Components/Data Display/Timeline",
    component: Timeline,
    tags: ["autodocs"],
    args: {
        items: [
            { title: "John doe", description: "Commented 2d ago", icon: <BiUser/> },
            { title: "Jane doe", description: "Commented 4d ago", icon: <BiUser/> },
            { title: "John doe", description: "Commented 6d ago", icon: <BiUser/> },
        ],
    },
} satisfies Meta<TimelineProps>

export default meta
type Story = StoryObj<TimelineProps>;

export const Basic: Story = {
    args: {}
}

export const Customized: Story = {
    args: {
        items: [
            {
                title: "John doe",
                description: "Locked the thread 2 hours ago",
                icon: <BiLock className="text-white text-lg font-bold"/>,
                iconClassName: "bg-[--violet] border-[--violet]",
                titleClassName: "text-[--violet]"
            },
            {
                title: "Jack",
                description: "Replied 2d ago",
                content: <div className="flex gap-2"><BiReply className="text-xl text-[--muted]"/> <span>Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit.</span></div>,
                icon: <BiUser/>,
            },
            {
                title: <span className="flex items-center text-[--muted] gap-1">
                    <span className="font-semibold text-[--text-color]">John Doe</span>
                    <Badge size="sm">Owner</Badge>
                </span>,
                description: "Opened the thread 2d ago",
                icon: <BiUser/>,
                unstyledTitle: true
            },
        ],
    }
}

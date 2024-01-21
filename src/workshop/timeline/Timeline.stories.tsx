import type { Meta, StoryObj } from "@storybook/react"
import { BiLock, BiReply, BiUser } from "react-icons/bi"
import { Timeline } from "@/workshop/timeline"
import { Badge } from "@/workshop/badge"

const meta = {
    title: "Components/Data Display/Timeline",
    component: Timeline,
    tags: ["autodocs"],
    args: {
        items: [
            { title: "John doe", description: "Commented 2d ago", icon: <BiUser /> },
            { title: "Jane doe", description: "Commented 4d ago", icon: <BiUser /> },
            { title: "John doe", description: "Commented 6d ago", icon: <BiUser /> },
        ],
    },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Customized: Story = {
    args: {
        items: [
            {
                title: "John doe",
                description: "Locked the thread 2 hours ago",
                icon: <BiLock className="text-white text-lg font-bold" />,
                iconClass: "bg-[--zinc] border-[--zinc]",
                titleClass: "text-[--zinc]",
                lineClass: "bg-[--zinc] w-1",
            },
            {
                title: "Jack",
                description: "Replied 2d ago",
                content: <div className="flex gap-2">
                    <BiReply className="text-xl text-[--muted]" />
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                </div>,
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
        ],
    },
}

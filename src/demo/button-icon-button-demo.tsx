import { IconButton } from "@/workshop/button"
import { BiSolidStar } from "react-icons/bi"

export default function ButtonDemo() {
    return (
        <IconButton
            intent="gray-outline"
            icon={<BiSolidStar className="text-xl text-[--yellow]" />}
        />
    )
}

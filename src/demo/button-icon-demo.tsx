import { Button } from "@/workshop/button"
import { BiStar } from "react-icons/bi"

export default function ButtonDemo() {
    return (
       <div className="flex gap-2">
           <Button intent="gray-outline" leftIcon={<BiStar />}>Button</Button>
           <Button intent="gray-outline" rightIcon={<BiStar />}>Button</Button>
       </div>
    )
}

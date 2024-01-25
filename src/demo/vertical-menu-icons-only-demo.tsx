import { Badge } from "@/workshop/badge"
import { VerticalMenu } from "@/workshop/vertical-menu"
import { BiBox, BiBriefcase, BiCog, BiMessage, BiReceipt, BiSolidKeyboard, BiTable, BiUser } from "react-icons/bi"

export default function VerticalMenuDemo() {
    return (
        <div className="max-w-[50px] w-full">
            <VerticalMenu
                collapsed
                items={[
                    {
                        name: "My Account", iconType: BiUser, isCurrent: true,
                        subContent: <VerticalMenu
                            items={[
                                { name: "Profile", href: "#", iconType: BiUser },
                                { name: "Orders", href: "#", iconType: BiReceipt, isCurrent: true },
                                { name: "Settings", href: "#", iconType: BiCog },
                            ]}
                        />,
                    },
                    {
                        name: "Products", iconType: BiBox,
                        subContent: <VerticalMenu
                            items={[
                                { name: "DataGrid", href: "#", iconType: BiTable },
                                { name: "Form", href: "#", iconType: BiSolidKeyboard },
                            ]}
                        />,
                    },
                    { name: "Company", href: "#", iconType: BiBriefcase },
                    {
                        name: "Messages",
                        href: "#",
                        iconType: BiMessage,
                        addon: <Badge size="sm" className="absolute right-0 top-1" intent="alert-solid">5</Badge>,
                    },
                ]}
            />
        </div>
    )
}

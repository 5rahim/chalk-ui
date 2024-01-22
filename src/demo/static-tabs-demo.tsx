import { StaticTabs } from "@/workshop/tabs"
import React from "react"
import { BiReceipt } from "react-icons/bi"

export default function StaticTabsDemo() {
    return (
        <div className="max-w-[600px] border rounded-full">
            <StaticTabs
                className="px-2 py-2"
                items={[
                    { name: "All", href: "#", isCurrent: false },
                    { name: "Products", href: "#", isCurrent: true },
                    { name: "Subscriptions", href: "#", isCurrent: false },
                    { name: "Transactions", href: "#", iconType: BiReceipt, isCurrent: false },
                ]}
            />
        </div>

    )
}

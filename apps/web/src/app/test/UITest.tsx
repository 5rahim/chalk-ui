"use client"

import React from "react"
import { Paper } from "@/components/ui/paper"
import { Card } from "@/components/ui/card"
import { DividerWithLabel } from "@/components/ui/divider"
import { Stats } from "@/components/ui/stats"

interface UITestProps {
    children?: React.ReactNode
}

const stats = [
    { name: "Total Subscribers", value: "71,897", previousValue: "70,946", change: "12%", trend: "up" },
    { name: "Avg. Open Rate", value: "58.16%", previousValue: "56.14%", change: "2.02%", trend: "up" },
    { name: "Avg. Click Rate", value: "24.57%", previousValue: "28.62%", change: "4.05%", trend: "down" },
]


export const UITest: React.FC<UITestProps> = (props) => {

    const { children, ...rest } = props

    return (
        <>
            <div className={"container max-w-5xl mt-10 space-y-4"}>
                <h2>Layouts</h2>

                <Stats
                    values={[
                        { name: "Total Subscribers", value: "71,897", unit: "70,946", change: "12%", trend: "up" },
                        { name: "Avg. Open Rate", value: "58.16%", unit: "56.14%", change: "2.02%", trend: "up" },
                        { name: "Avg. Click Rate", value: "24.57%", unit: "28.62%", change: "4.05%", trend: "down" },
                    ]}
                />

                <Paper>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci asperiores consequatur ducimus exercitationem
                    explicabo iure, magni nihil numquam optio, quae qui quidem quis quo repudiandae similique veniam vitae voluptatum.
                </Paper>
                <DividerWithLabel>Divider</DividerWithLabel>
                <Card
                    header={<div>
                        This is a header
                    </div>}
                    footer={<div>
                        This is a footer
                    </div>}
                    headerClassName={"bg-gray-50 dark:bg-gray-800"}
                    footerClassName={"bg-gray-50 dark:bg-gray-800"}
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci asperiores consequatur ducimus exercitationem
                    explicabo iure, magni nihil numquam optio, quae qui quidem quis quo repudiandae similique veniam vitae voluptatum.
                </Card>
            </div>
        </>
    )

}

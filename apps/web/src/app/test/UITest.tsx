"use client"

import React from "react"
import { Paper } from "@/components/ui/paper"
import { Card } from "@/components/ui/card"
import { DividerWithLabel } from "@/components/ui/divider"
import { Stats } from "@/components/ui/stats"
import { Pagination } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"

interface UITestProps {
    children?: React.ReactNode
}


export const UITest: React.FC<UITestProps> = (props) => {

    const { children, ...rest } = props
    const toast = useToast()

    return (
        <>
            <div className={"container max-w-5xl mt-10 space-y-4"}>
                <h2>Layouts</h2>

                <Button
                    onClick={() => toast.success("Success message")}
                >
                    Toast success
                </Button>
                <Button
                    onClick={() => toast.error("Error message")}
                >
                    Toast error
                </Button>

                <Pagination>
                    <Pagination.Trigger direction="left" data-disabled={true}/>
                    <Pagination.Item value={1} data-selected={true}/>
                    <Pagination.Item value={2}/>
                    <Pagination.Ellipsis/>
                    <Pagination.Item value={8}/>
                    <Pagination.Item value={10}/>
                    <Pagination.Trigger direction="right"/>
                </Pagination>

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

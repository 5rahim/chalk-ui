"use client"

import React from "react"
import { Paper } from "@/components/ui/paper"
import { Card } from "@/components/ui/card"
import { DividerWithLabel } from "@/components/ui/divider"

interface UITestProps {
    children?: React.ReactNode
}


export const UITest: React.FC<UITestProps> = (props) => {

    const { children, ...rest } = props

    return (
        <>
            <div className={"container max-w-5xl mt-10 space-y-2"}>
                <h2>Layouts</h2>
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

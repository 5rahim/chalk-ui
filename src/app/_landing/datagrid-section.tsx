"use client"
import DatagridServerSideDemo from "@/demo/datagrid/datagrid-server-side-demo"
import { AppLayoutStack } from "@/workshop/app-layout"
import { Card } from "@/workshop/card"
import { defineSchema } from "@/workshop/form"
import React from "react"
import { BiCheckCircle } from "react-icons/bi"

const schema = defineSchema(({ z, presets }) => z.object({
    name: z.string().min(2),
    birthday: z.date(),
    bounty: z.string()
        .refine(v => Number(v) >= 3_000_000_000,
            { message: "Bounty must be at least ฿3,000,000,000" }),
}))

export function DatagridSection() {

    return (
        <div className="container max-w-8xl pb-20 lg:pb-32 relative z-[1]">

            <AppLayoutStack className="">

                <h1 className="text-pretty text-center">DataGrid</h1>
                <p className="text-center text-pretty text-lg lg:text-xl font-medium text-[--muted]">
                    Data Table with built-in features and server-side support. Powered by Tanstack's React Table.
                </p>

                <ul className="flex w-full items-center justify-center gap-4 flex-wrap">
                    <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg" />Type safe</li>
                    <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg" />Pagination</li>
                    <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg" />Filters</li>
                    <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg" />Selection</li>
                    <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg" />Sorting</li>
                    <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg" />Editing & Validation</li>
                    <li className="flex items-center gap-1"><BiCheckCircle className="text-[--green] text-lg" />Server-side support</li>
                </ul>

                <Card className="p-4 relative overflow-hidden">
                    <DatagridServerSideDemo />
                </Card>

            </AppLayoutStack>

        </div>
    )
}

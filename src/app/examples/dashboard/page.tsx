"use client"

import { DashboardHeader } from "@/app/examples/dashboard/components/dashboard-header"
import { DashboardSidebar } from "@/app/examples/dashboard/components/dashboard-sidebar"
import DatagridDemo from "@/demo/datagrid/datagrid-demo"
import { citiesDemoData, lineChartData } from "@/demo/demo-data"
import {
    AppLayout,
    AppLayoutContent,
    AppLayoutFooter,
    AppLayoutGrid,
    AppLayoutHeader,
    AppLayoutSidebar,
    AppLayoutStack,
    AppSidebarProvider,
} from "@/workshop/app-layout"
import { Button, IconButton } from "@/workshop/button"
import { Card, CardContent } from "@/workshop/card"
import { AreaChart, DonutChart, LineChart } from "@/workshop/charts"
import { DropdownMenu, DropdownMenuItem } from "@/workshop/dropdown-menu"
import { PageHeader } from "@/workshop/page-header"
import { Separator } from "@/workshop/separator"
import { Stats } from "@/workshop/stats"
import { Tooltip } from "@/workshop/tooltip"
import * as React from "react"
import { BiExpandVertical, BiInfoCircle, BiRefresh } from "react-icons/bi"

export default function Page() {

    return (
        <AppSidebarProvider>
            <AppLayout withSidebar sidebarSize="md" className="max-h-[800px] overflow-y-auto">
                <AppLayoutSidebar className="lg:absolute"> {/*Remove `lg:absolute`*/}
                    <DashboardSidebar /> {/*Custom*/}
                </AppLayoutSidebar>
                <AppLayout>
                    <AppLayoutHeader>
                        <DashboardHeader /> {/*Custom*/}
                    </AppLayoutHeader>
                    <AppLayoutContent>
                        <div>
                            <PageHeader
                                className="p-4 border-b"
                                title="Public shops"
                                size="md"
                                action={<Button
                                    intent="gray-outline"
                                    size="sm"
                                    leftIcon={<BiRefresh className="text-xl" />}
                                >
                                    Refresh
                                </Button>}
                            />
                            <div className="bg-[--paper]">
                                <Stats
                                    items={[
                                        {
                                            name: "Total Subscribers",
                                            value: "71,897",
                                            unit: "from 70,946",
                                            change: "12%",
                                            trend: "up",
                                        },
                                        { name: "Avg. Open Rate", value: "58.16%", unit: "from 56.14%", change: "2.02%", trend: "up" },
                                        { name: "Avg. Click Rate", value: "24.57%" },
                                    ]}
                                    className="border-b"
                                />
                            </div>
                            <div className="container max-w-full p-4">

                                <AppLayoutStack>

                                    <div className="flex items-center gap-2">
                                        <h4>Performance History</h4>
                                        <Tooltip trigger={<span><BiInfoCircle className={"w-5 h-5 text-[--gray]"} /></span>}>
                                            Shows the trends
                                        </Tooltip>
                                    </div>

                                    <AreaChart
                                        className="h-64 mt-6"
                                        data={lineChartData}
                                        index="year"
                                        categories={["Upward Trend", "Downward Trend"]}
                                        colors={["brand", "gray"]}
                                        yAxisWidth={40}
                                        valueFormatter={(number: number) => number.toFixed(2)}
                                        showDots={false}
                                        showGridLines
                                        showXAxis={false}
                                        showYAxis={false}
                                    />

                                    <Separator />

                                    <AppLayoutGrid cols={5}>
                                        <div className="col-span-2">

                                            <h4>Products</h4>
                                            <p className="text-sm text-[--muted]">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis
                                                deserunt.
                                                Consectetur adipisicing elit. Ad alias amet architecto culpa debitis deserunt.
                                            </p>
                                        </div>
                                        <div className="col-span-3">
                                            <Card>
                                                <div className="flex p-4 pb-2">
                                                    <Button
                                                        intent="gray-subtle"
                                                        size="sm"
                                                        className="w-full rounded-r-none border-r border-r-[--border]"
                                                    >By cities</Button>
                                                    <DropdownMenu
                                                        trigger={<IconButton
                                                            intent="gray-subtle"
                                                            size="sm"
                                                            className="rounded-l-none"
                                                            icon={<BiExpandVertical />}
                                                        />}
                                                    >
                                                        <DropdownMenuItem>By counties</DropdownMenuItem>
                                                        <DropdownMenuItem>By cities</DropdownMenuItem>
                                                        <DropdownMenuItem>By states</DropdownMenuItem>
                                                    </DropdownMenu>
                                                </div>
                                                <CardContent className="p-4 flex gap-2">
                                                    <DonutChart
                                                        data={citiesDemoData}
                                                        index="name"
                                                        category="sales"
                                                        colors={["brand", "orange", "gray", "zinc"]}
                                                        className="h-32"
                                                    />
                                                    <DonutChart
                                                        data={citiesDemoData}
                                                        index="name"
                                                        category="sales"
                                                        colors={["brand", "orange", "gray", "zinc"]}
                                                        variant="pie"
                                                        className="h-32"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </AppLayoutGrid>

                                    <Separator />

                                    <DatagridDemo
                                        tableProps={{
                                            tdClass: "text-sm",
                                            hideColumns: [
                                                { below: 850, hide: ["availability", "price"] },
                                                { below: 600, hide: ["_actions"] },
                                                { below: 515, hide: ["category"] },
                                                { below: 400, hide: ["visible"] },
                                            ],
                                        }}
                                    />
                                </AppLayoutStack>

                            </div>
                        </div>
                    </AppLayoutContent>
                    <AppLayoutFooter className="text-center font-medium text-[--muted] pb-10">
                        &copy; 2024
                    </AppLayoutFooter>
                </AppLayout>
            </AppLayout>
        </AppSidebarProvider>
    )

}

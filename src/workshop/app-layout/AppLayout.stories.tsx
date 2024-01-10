import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { BiInfoCircle, BiReceipt, BiSearch } from "react-icons/bi"
import {
    AppLayout,
    AppLayoutContent,
    AppLayoutFooter,
    AppLayoutGrid,
    AppLayoutHeader,
    AppLayoutSidebar,
    AppLayoutStack,
    AppSidebar,
    AppSidebarProvider,
    AppSidebarTrigger,
} from "."
import { DemoLineChart, DemoNavigationItems } from "../../demo/demo"
import { Card } from "../card"
import { Stats } from "../stats"
import { StaticTabs } from "../tabs"
import { TextInput } from "../text-input"
import { Tooltip } from "../tooltip"
import { VerticalMenu } from "../vertical-menu"
import { PageHeader } from "../page-header"
import { Button } from "../button"

const meta = {
    title: "Components/Layout/AppLayout",
    component: AppLayout,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
    args: {},
} satisfies Meta<typeof AppLayout>


export default meta
type Story = StoryObj<typeof meta>;

export const Sidebar: Story = {
    parameters: {
        previewTabs: {
            docs: {
                hidden: true,
            },
        },
    },
    render: () => {
        return (
            <AppSidebarProvider>
                <AppLayout withSidebar sidebarSize={"md"}>
                    <AppLayoutSidebar>
                        <AppSidebar className="p-4">
                            <div className="font-bold text-2xl mb-4">Dashboard</div>
                            <VerticalMenu items={DemoNavigationItems} />
                        </AppSidebar>
                    </AppLayoutSidebar>
                    <AppLayout>
                        <AppLayoutHeader>
                            <div className="w-full h-16 border-b border-[--border] flex items-center bg-[--paper] px-2">
                                <AppSidebarTrigger />
                                <TextInput
                                    className="shadow-none border-none focus:border-none focus:ring-0"
                                    placeholder="Search..."
                                    leftIcon={<BiSearch className={"w-5 h-5 text-[--muted]"} />}
                                />
                            </div>
                            <StaticTabs
                                className="border-b border-[--border] px-4"
                                items={[
                                    { name: "My Account", href: "#", isCurrent: false },
                                    { name: "Company", href: "#", isCurrent: false },
                                    { name: "Team Members", href: "#", isCurrent: true },
                                    { name: "Billing", href: "#", iconType: BiReceipt, isCurrent: false },
                                ]}
                            />
                            <PageHeader
                                className="p-4 border-b border-[--border]"
                                title={"Dashboard"}
                                size={"lg"}
                                action={<Button>Action</Button>}
                            />
                        </AppLayoutHeader>
                        <AppLayoutContent>
                            <div>
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
                                    className="border-b border-[--border]"
                                />
                            </div>
                            <div className="container max-w-full p-4">

                                <AppLayoutStack>

                                    <div className="flex items-center gap-2">
                                        <h4>Performance History</h4>
                                        <Tooltip trigger={<span><BiInfoCircle className={"w-5 h-5 text-[--blue]"} /></span>}>
                                            Shows the trends
                                        </Tooltip>
                                    </div>

                                    <DemoLineChart />

                                    <AppLayoutGrid cols={5}>
                                        <div className="col-span-1">
                                            <h4>Grid</h4>
                                            <p className="text-sm text-[--muted]">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                        </div>
                                        <div className="col-span-4">
                                            <Card className="p-4">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis
                                                deserunt
                                                distinctio earum explicabo, fugiat fugit id placeat quas quasi repudiandae sint totam unde vero
                                                voluptas!
                                            </Card>
                                        </div>
                                    </AppLayoutGrid>

                                    <AppLayoutGrid breakBelow={"lg"}>
                                        <div className="col-span-2">
                                            <Card className="p-4">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis
                                                deserunt
                                                distinctio earum explicabo, fugiat fugit id placeat quas quasi repudiandae sint totam unde vero
                                                voluptas!
                                            </Card>
                                        </div>
                                        <div className="col-span-1 basis-[40rem]">
                                            <Card className="p-4">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis
                                                deserunt
                                                distinctio earum explicabo, fugiat fugit id placeat quas quasi repudiandae sint totam unde vero
                                                voluptas!
                                            </Card>
                                        </div>
                                    </AppLayoutGrid>


                                </AppLayoutStack>

                            </div>
                        </AppLayoutContent>
                        <AppLayoutFooter className="text-center font-medium text-[--muted] pb-10">
                            &copy; 2023 5rahim
                        </AppLayoutFooter>
                    </AppLayout>
                </AppLayout>
            </AppSidebarProvider>
        )
    },
    args: {},
}
import React from "react"
import { useToast } from "@/components/ui/toast"
import { AppLayout, AppSidebar, AppSidebarProvider, AppSidebarTrigger } from "@/components/ui/app-layout"
import { TextInput } from "@/components/ui/text-input"
import { BiSearch } from "@react-icons/all-files/bi/BiSearch"
import { Stats } from "@/components/ui/stats"
import { VerticalNav } from "@/components/ui/vertical-nav"
import { DemoNavigationItems, DemoNavigationTabs } from "@/app/test/ClientTest"
import { DemoLineChart } from "@/app/test/ChartTest"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { BiInfoCircle } from "@react-icons/all-files/bi/BiInfoCircle"
import { Tooltip } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"

export const UITest_Sidebar: React.FC<{ children?: React.ReactNode }> = (props) => {

    const { children, ...rest } = props
    const toast = useToast()

    return (
        <AppSidebarProvider>
            <AppLayout withSidebar>
                <AppLayout.Sidebar>
                    <AppSidebar className="p-4">
                        <div className="tracking-tighter font-[900] text-2xl mb-4">LOGO</div>
                        <VerticalNav items={DemoNavigationItems}/>
                    </AppSidebar>
                </AppLayout.Sidebar>
                <AppLayout>
                    <AppLayout.Header>
                        <div className={"w-full h-16 border-b border-[--border] flex items-center bg-[--paper] px-2"}>
                            <AppSidebarTrigger/>
                            <TextInput
                                className="shadow-none border-none focus:border-none focus:ring-0"
                                placeholder="Search..."
                                leftIcon={<BiSearch className={"w-5 h-5 text-[--muted]"}/>}
                            />
                        </div>
                        <DemoNavigationTabs/>
                        <PageHeader
                            className={"p-4 border-b border-[--border]"}
                            title={"Dashboard"}
                            size={"lg"}
                            action={<Button>Action</Button>}
                        />
                    </AppLayout.Header>
                    <AppLayout.Content>
                        <div>
                            <Stats
                                values={[
                                    { name: "Total Subscribers", value: "71,897", unit: "from 70,946", change: "12%", trend: "up" },
                                    { name: "Avg. Open Rate", value: "58.16%", unit: "from 56.14%", change: "2.02%", trend: "up" },
                                    { name: "Avg. Click Rate", value: "24.57%" },
                                ]}
                                className={"border-b border-[--border]"}
                            />
                        </div>
                        <div className={"container max-w-full p-4 space-y-4"}>

                            {/*Stats*/}

                            <div className={"grid grid-cols-1 xl:grid-cols-3 gap-4"}>
                                <div className={""}>
                                    <h3>Section</h3>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequatur debitis ea eum laudantium libero
                                    nihil.
                                </div>
                                <div className={"col-span-2"}>
                                    <Card className={""}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis deserunt
                                        distinctio earum explicabo, fugiat fugit id placeat quas quasi repudiandae sint totam unde vero voluptas!
                                    </Card>
                                </div>
                            </div>

                            <div className={"grid grid-cols-1 xl:grid-cols-3 gap-4"}>
                                <div className={"col-span-2"}>
                                    <Card className={""}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis deserunt
                                        distinctio earum explicabo, fugiat fugit id placeat quas quasi repudiandae sint totam unde vero voluptas!
                                    </Card>
                                </div>
                                <div className={"col-span-1"}>
                                    <Card className={""}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis deserunt
                                        distinctio earum explicabo, fugiat fugit id placeat quas quasi repudiandae sint totam unde vero voluptas!
                                    </Card>
                                </div>
                            </div>


                            <div className={"flex items-center gap-2"}>
                                <h4>Performance History</h4>
                                <Tooltip trigger={<BiInfoCircle className={"w-5 h-5 text-[--blue]"}/>}>
                                    Shows the trends
                                </Tooltip>
                            </div>

                            <DemoLineChart/>
                        </div>
                    </AppLayout.Content>
                    <AppLayout.Footer className={"text-center font-medium text-[--muted] pb-10"}>
                        &copy; 2023 5rahim
                    </AppLayout.Footer>
                </AppLayout>
            </AppLayout>
        </AppSidebarProvider>
    )

}

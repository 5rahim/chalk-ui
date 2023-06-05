import React from "react"
import { useToast } from "@/components/ui/toast"
import { AppLayout, AppSidebar, AppSidebarProvider, AppSidebarTrigger } from "@/components/ui/app-layout"
import { TextInput } from "@/components/ui/text-input"
import { BiSearch } from "@react-icons/all-files/bi/BiSearch"
import { Stats } from "@/components/ui/stats"
import { VerticalNav } from "@/components/ui/vertical-nav"
import { DemoNavigationItems } from "@/app/test/ClientTest"
import { DemoLineChart } from "@/app/test/ChartTest"

export const UITest_Sidebar: React.FC<{ children?: React.ReactNode }> = (props) => {

    const { children, ...rest } = props
    const toast = useToast()

    return (
        <AppSidebarProvider>
            <AppLayout withSidebar>
                <AppLayout.Sidebar className="p-4">
                    <AppSidebar>
                        <VerticalNav items={DemoNavigationItems}/>
                    </AppSidebar>
                </AppLayout.Sidebar>
                <AppLayout>
                    <AppLayout.Header>
                        <div className={"w-full h-16 border-b border-[--border] flex items-center bg-[--paper]"}>
                            <AppSidebarTrigger/>
                            <TextInput
                                className="shadow-none border-none focus:border-none focus:ring-0"
                                placeholder="Search..."
                                leftIcon={<BiSearch className={"w-5 h-5 text-[--muted]"}/>}
                            />
                        </div>
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
                        <div className={"container max-w-full p-4"}>
                            <DemoLineChart/>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequatur debitis ea eum laudantium libero nihil
                            quasi quidem quis, recusandae ullam ut vero! Consequuntur id minima natus quo voluptas.
                        </div>
                    </AppLayout.Content>
                    <AppLayout.Footer className={"text-center font-medium text-[--muted] pb-10"}>
                        Copyright &copy; 5rahim
                    </AppLayout.Footer>
                </AppLayout>
            </AppLayout>
        </AppSidebarProvider>
    )

}

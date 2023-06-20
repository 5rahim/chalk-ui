import type { Meta, StoryObj } from "@storybook/react"
import { Card } from "../components/ui/card"
import { DemoLineChart, DemoNavbar, DemoNavigationItems, DemoNavigationTabs } from "../components/demo.tsx"
import { AppLayout, AppSidebar, AppSidebarProvider, AppSidebarTrigger } from "../components/ui/app-layout"
import { TextInput } from "../components/ui/text-input"
import { BiSearch } from "@react-icons/all-files/bi/BiSearch"
import { BiInfoCircle } from "@react-icons/all-files/bi/BiInfoCircle"
import { Stats } from "../components/ui/stats"
import { VerticalNav } from "../components/ui/vertical-nav"
import { PageHeader } from "../components/ui/page-header"
import { Button } from "../components/ui/button"
import { BiGroup } from "@react-icons/all-files/bi/BiGroup"
import { Tooltip } from "../components/ui/tooltip"

const meta = {
    title: "Components/Layout/AppLayout",
    component: AppLayout,
    // tags: ["autodocs"],
    render: (args) => {
        return (
            <div>

            </div>
        )
    },
    args: {
        triggerClassName: "",
        containerClassName: "",
        panelClassName: "",
        itemClassName: "",
    },
    parameters: {
        layout: "fullscreen"
    }
} satisfies Meta<typeof AppLayout>


export default meta
type Story = StoryObj<typeof meta>;

export const Stacked: Story = {
    render: () => {
        return (
            <AppLayout className="min-h-fit">
                <AppLayout.Header>
                    <DemoNavbar/>
                </AppLayout.Header>
                <AppLayout.Content>
                    <div className={"container max-w-7xl py-5"}>
                        <Card>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequatur debitis ea eum laudantium libero nihil
                            quasi quidem quis, recusandae ullam ut vero! Consequuntur id minima natus quo voluptas.
                        </Card>
                    </div>
                </AppLayout.Content>
                <AppLayout.Footer className={"text-center font-medium text-[--muted] pb-10"}>
                    Made with ❤️ by 5rahim
                </AppLayout.Footer>
            </AppLayout>
        )
    },
    args: {}
}


export const Sidebar: Story = {
    parameters: {
        previewTabs: {
            docs: {
                hidden: true
            }
        }
    },
    render: () => {
        return (
            <AppSidebarProvider>
                <AppLayout withSidebar sidebarSize={"md"}>
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
                                    items={[
                                        {
                                            name: "Total Subscribers",
                                            value: "71,897",
                                            unit: "from 70,946",
                                            change: "12%",
                                            trend: "up",
                                            icon: <BiGroup/>
                                        },
                                        { name: "Avg. Open Rate", value: "58.16%", unit: "from 56.14%", change: "2.02%", trend: "up" },
                                        { name: "Avg. Click Rate", value: "24.57%" },
                                    ]}
                                    className={"border-b border-[--border]"}
                                />
                            </div>
                            <div className={"container max-w-full p-4"}>

                                <AppLayout.Stack>

                                    <div className={"flex items-center gap-2"}>
                                        <h4>Performance History</h4>
                                        <Tooltip trigger={<BiInfoCircle className={"w-5 h-5 text-[--blue]"}/>}>
                                            Shows the trends
                                        </Tooltip>
                                    </div>

                                    <DemoLineChart/>

                                    <AppLayout.Grid cols={5}>
                                        <div className={"col-span-1"}>
                                            <h4>Grid</h4>
                                            <p className={"text-sm text-[--muted]"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                        </div>
                                        <div className={"col-span-4"}>
                                            <Card>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis
                                                deserunt
                                                distinctio earum explicabo, fugiat fugit id placeat quas quasi repudiandae sint totam unde vero
                                                voluptas!
                                            </Card>
                                        </div>
                                    </AppLayout.Grid>

                                    <AppLayout.Grid breakBelow={"lg"}>
                                        <div className={"col-span-2"}>
                                            <Card>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis
                                                deserunt
                                                distinctio earum explicabo, fugiat fugit id placeat quas quasi repudiandae sint totam unde vero
                                                voluptas!
                                            </Card>
                                        </div>
                                        <div className={"col-span-1 basis-[40rem]"}>
                                            <Card>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias amet architecto culpa debitis
                                                deserunt
                                                distinctio earum explicabo, fugiat fugit id placeat quas quasi repudiandae sint totam unde vero
                                                voluptas!
                                            </Card>
                                        </div>
                                    </AppLayout.Grid>


                                </AppLayout.Stack>

                            </div>
                        </AppLayout.Content>
                        <AppLayout.Footer className={"text-center font-medium text-[--muted] pb-10"}>
                            &copy; 2023 5rahim
                        </AppLayout.Footer>
                    </AppLayout>
                </AppLayout>
            </AppSidebarProvider>
        )
    },
    args: {}
}

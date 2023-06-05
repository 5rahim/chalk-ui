"use client"

import React, { useState } from "react"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BiEditAlt } from "@react-icons/all-files/bi/BiEditAlt"
import { BiTrash } from "@react-icons/all-files/bi/BiTrash"
import { BiDuplicate } from "@react-icons/all-files/bi/BiDuplicate"
import { BiLinkExternal } from "@react-icons/all-files/bi/BiLinkExternal"
import { RadioGroup } from "@/components/ui/radio-group"
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox"
import { PriceInput } from "@/components/ui/price-input"
import { Accordion } from "@/components/ui/accordion"
import { Drawer } from "@/components/ui/modal"
import { Switch } from "@/components/ui/switch"
import { TextInput } from "@/components/ui/text-input"
import { Combobox } from "@/components/ui/combobox"
import { MultiSelect } from "@/components/ui/multi-select"
import { Popover } from "@/components/ui/popover"
import { NavigationTabs, TabPanels } from "@/components/ui/tabs"
import { BiReceipt } from "@react-icons/all-files/bi/BiReceipt"
import { Tooltip } from "@/components/ui/tooltip"
import { BiCog } from "@react-icons/all-files/bi/BiCog"
import { Alert } from "@/components/ui/alert"
import { PhoneNumberInput } from "@/components/ui/phone-number-input"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Banner } from "@/components/ui/banner"
import { Timeline } from "@/components/ui/timeline"
import { BiCheck } from "@react-icons/all-files/bi/BiCheck"
import { Pagination } from "@/components/ui/pagination"
import { Stats } from "@/components/ui/stats"
import { Paper } from "@/components/ui/paper"
import { DividerWithLabel } from "@/components/ui/divider"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/toast"
import { VerticalNav } from "@/components/ui/vertical-nav"
import { BiUser } from "@react-icons/all-files/bi/BiUser"
import { BiGroup } from "@react-icons/all-files/bi/BiGroup"
import { BiBarChart } from "@react-icons/all-files/bi/BiBarChart"
import { Badge } from "@/components/ui/badge"
import { HorizontalNav } from "@/components/ui/horizontal-nav"
import { Navbar } from "@/components/ui/navbar"
import { BiHome } from "@react-icons/all-files/bi/BiHome"
import { Avatar, AvatarShowcase } from "@/components/ui/avatar"

export const DemoNavigationItems = [
    {
        name: "Home", icon: BiHome, isCurrent: true,
        content: <VerticalNav
            items={[
                { name: "My Account", href: "#", icon: BiUser, isCurrent: false },
                { name: "Company", href: "#", icon: BiBarChart, isCurrent: true },
                { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
            ]}
        />
    },
    {
        name: "Menu", icon: BiUser, isCurrent: false,
        content: <VerticalNav
            items={[
                { name: "My Account", href: "#", icon: BiUser, isCurrent: false },
                { name: "Company", href: "#", icon: BiBarChart, isCurrent: false },
                { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
            ]}
        />
    },
    { name: "Company", href: "#", icon: BiBarChart, isCurrent: false },
    {
        name: "Team Members",
        href: "#",
        icon: BiGroup,
        isCurrent: false,
        addon: <Badge className="ml-2" intent="gray-solid" size="sm">5</Badge>
    },
    { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
]

export const DemoNavbar = () => (
    <Navbar className={""}>
        <Navbar.Layout>
            <Navbar.Navigation>
                <div className="font-bold">Logo</div>
                <HorizontalNav
                    switchToDrawerBelow={"lg"}
                    items={DemoNavigationItems}
                />
            </Navbar.Navigation>
            <DropdownMenu
                trigger={<AvatarShowcase
                    avatar={<Avatar size="sm"/>} name={"John Doe"}
                    className="cursor-pointer p-1 sm:pr-3 rounded-full hover:bg-[--highlight]"
                    nameClassName={"text-sm font-semibold text-[--muted] group-hover:text-[--text-color]"}
                    detailsContainerClassName={"hidden sm:block"}
                />}
                mobilePlacement={"top"}
            >
                <DropdownMenu.Item>Sign out</DropdownMenu.Item>
            </DropdownMenu>
        </Navbar.Layout>
    </Navbar>
)

export const DemoNavigationTabs = () => (
    <NavigationTabs
        navClassName={"border-b border-[--border]"}
        items={[
            { name: "My Account", href: "#", icon: null, isCurrent: false },
            { name: "Company", href: "#", icon: null, isCurrent: false },
            { name: "Team Members", href: "#", icon: null, isCurrent: true },
            { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
        ]}
    />
)

interface ClientTestProps {
    children?: React.ReactNode
}

export const ClientTest: React.FC<ClientTestProps> = (props) => {

    const { children, ...rest } = props

    const [radio, setRadio] = useState("Option 1")
    const [checkbox, setCheckbox] = useState(["Option 1"])

    const [open, setOpen] = useState(false)

    const cb = <Checkbox id="terms"/>
    const toast = useToast()

    return (
        <>

            <Banner>
                We just launched our new product!
            </Banner>
            <div className="container max-w-5xl">
                <div className="mt-10 space-y-4 relative">

                    <div className="w-full bg-[--paper] p-2 border border-[--border]">
                        <HorizontalNav
                            switchToDrawerBelow={"sm"}
                            items={[
                                {
                                    name: "My Account", icon: BiUser, isCurrent: true,
                                    content: <VerticalNav
                                        items={[
                                            { name: "My Account", href: "#", icon: BiUser, isCurrent: false },
                                            { name: "Company", href: "#", icon: BiBarChart, isCurrent: true },
                                            { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
                                        ]}
                                    />
                                },
                                {
                                    name: "Menu", icon: BiUser, isCurrent: false,
                                    content: <VerticalNav
                                        items={[
                                            { name: "My Account", href: "#", icon: BiUser, isCurrent: false },
                                            { name: "Company", href: "#", icon: BiBarChart, isCurrent: false },
                                            { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
                                        ]}
                                    />
                                },
                                { name: "Company", href: "#", icon: BiBarChart, isCurrent: false },
                                {
                                    name: "Team Members",
                                    href: "#",
                                    icon: BiGroup,
                                    isCurrent: false,
                                    addon: <Badge className="ml-2" intent="gray-solid" size="sm">5</Badge>
                                },
                                { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
                            ]}
                        />
                    </div>

                    <div className="max-w-sm bg-[--paper] p-2 border border-[--border]">
                        <VerticalNav
                            items={[
                                {
                                    name: "My Account", href: "#", icon: BiUser, isCurrent: false,
                                    content: <VerticalNav items={[
                                        { name: "Information", href: "#", isCurrent: false },
                                        { name: "Security", href: "#", isCurrent: false },
                                    ]}/>
                                },
                                { name: "Company", href: "#", icon: BiBarChart, isCurrent: false },
                                {
                                    name: "Team Members",
                                    href: "#",
                                    icon: BiGroup,
                                    isCurrent: true,
                                    addon: <Badge className="ml-2" intent="gray-solid">5</Badge>
                                },
                                { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
                            ]}
                        />
                    </div>

                    <Timeline
                        items={[
                            { title: "John doe", description: "Commented 6d ago", icon: <BiCheck/> },
                            {
                                title: <span className="text-[--muted]">
                                    <span className="font-semibold text-[--text-color]">John doe</span> commented 6d ago
                                </span>,
                                icon: null,
                                unstyledTitle: true
                            },
                            {
                                title: "John doe",
                                description: "Commented 6d ago",
                                icon: null,
                                iconClassName: "bg-green-500",
                                titleClassName: "text-green-500"
                            },
                        ]}
                    />

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
                            { name: "Avg. Click Rate", value: "24.57%" },
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

                    <h1>This is a title</h1>
                    <h4 className={"text-[--muted]"}>Sub text</h4>

                    <Breadcrumbs pages={[
                        { name: "Projects", href: "#", isCurrent: false },
                        { name: "Team members", href: "#", isCurrent: true },
                    ]}/>

                    <Breadcrumbs
                        showHomeButton={false}
                        pages={[
                            { name: "Projects", href: "#", isCurrent: false },
                            { name: "Team members", href: "#", isCurrent: true },
                        ]}/>

                    <PhoneNumberInput/>

                    <Alert title={"Alert"} description={"Short description"} intent={"alert-basic"}/>

                    <TabPanels>
                        <TabPanels.Nav>
                            <TabPanels.Tab>Home</TabPanels.Tab>
                            <TabPanels.Tab>Orders</TabPanels.Tab>
                            <TabPanels.Tab><BiCog className="w-5 h-5"/><span>Settings</span></TabPanels.Tab>
                        </TabPanels.Nav>
                        <TabPanels.Container>
                            <TabPanels.Panel>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet autem consequuntur, eius hic minus neque, nesciunt obcaecati perferendis placeat quae quasi repudiandae rerum. Assumenda consequatur facere id maiores quae.
                            </TabPanels.Panel>
                            <TabPanels.Panel>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto cum delectus dicta dolores enim, harum impedit ipsa laboriosam nemo nesciunt nostrum perspiciatis quae quibusdam quis sequi sint vitae voluptas.
                            </TabPanels.Panel>
                            <TabPanels.Panel>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate doloremque eveniet magnam numquam odit quibusdam, veniam? Ab cumque dignissimos dolorem nesciunt odit? Deserunt dolores nam, rem saepe suscipit ut vitae!
                            </TabPanels.Panel>
                        </TabPanels.Container>
                    </TabPanels>

                    <NavigationTabs
                        items={[
                            { name: "My Account", href: "#", icon: null, isCurrent: false },
                            { name: "Company", href: "#", icon: null, isCurrent: false },
                            { name: "Team Members", href: "#", icon: null, isCurrent: true },
                            { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
                        ]}
                    />

                    <div className="flex flex-wrap gap-2">
                        <Popover trigger={<Button>Open</Button>}>
                            <div>
                                <TextInput label="Name"/>
                            </div>
                        </Popover>
                        <Popover
                            trigger={<Button>Customized</Button>}
                            popoverClassName="p-0"
                        >
                            <div className="p-4 max-w-md">
                                Lorem ipsum dolor sit amet
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-700 p-4 text-sm text-opacity-70">
                                Lorem ipsum dolor sit amet
                            </div>
                        </Popover>
                        <Popover trigger={<Button>Open</Button>}>
                            Lorem ipsum dolor sit amet
                        </Popover>
                        <Popover trigger={<Button>Open</Button>}>
                            Lorem ipsum dolor sit amet
                        </Popover>
                    </div>
                    <RadioGroup
                        value={"Option 1"}
                        options={[{ value: "Option 1" }, { value: "Option 2" }]}
                        isDisabled
                    />
                    <RadioGroup
                        value={radio}
                        onChange={v => setRadio(v ?? "")}
                        options={[{ value: "Option 1" }, { value: "Option 2" }]}
                    />
                    <div>
                        <RadioGroup
                            fieldClassName="!w-fit"
                            fieldLabelClassName="text-md"
                            stackClassName="flex flex-row gap-2 p-1 bg-gray-50 rounded-md border w-fit space-y-0"
                            radioContainerClassName="block w-fit py-1 px-3 cursor-pointer border border-transparent transition rounded-md data-checked:bg-white data-checked:border-gray-300 data-checked:shadow-sm text-gray-500 data-checked:text-black"
                            radioControlClassName="hidden"
                            radioLabelClassName="font-semibold flex-none"
                            radioHelpClassName="text-base"
                            options={[{ value: "Option 1" }, { value: "Option 2" }]}
                        />
                    </div>
                    <RadioGroup
                        fieldClassName="w-full"
                        fieldLabelClassName="text-md"
                        stackClassName="flex flex-col md:flex-row gap-2 space-y-0"
                        radioContainerClassName="block w-full p-4 cursor-pointer dark:bg-gray-900 transition border border-[--border] rounded-md data-checked:ring-2 data-checked:ring-[--ring]"
                        radioControlClassName="absolute right-2 top-2 h-5 w-5 text-xs"
                        radioLabelClassName="font-semibold flex-none flex"
                        radioHelpClassName="text-sm"
                        options={[{ value: "Option 1", help: "Help" }, { value: "Option 2" }]}
                    />

                    <Tooltip trigger={<Button>Tooltip</Button>}>
                        Content
                    </Tooltip>
                    <TextInput/>
                    <Combobox options={[{ value: "Option 1", label: "Option 1" }, { value: "Option 2", label: "Option 2" }]}/>
                    <MultiSelect options={[{ value: "Option 1" }, { value: "Option 2" }]}/>
                    <PriceInput onChange={console.log}/>
                    <PriceInput onChange={console.log}/>
                    <Switch label={"Switch"} checked={true}/>
                    <Switch label={"Switch"} checked={true} isDisabled={true}/>
                    <Switch label={"Switch"} error={"Error"}/>
                    <Checkbox checked={true} label="Checkbox"/>
                    <Checkbox label="Checkbox"/>
                    <Checkbox label="Checkbox" error="test"/>
                    <Checkbox label="Checkbox" help="test" size={"lg"}/>
                    <Checkbox label="Checkbox" isRequired/>
                    <Checkbox isDisabled label={"Test"}/>


                    <Button onClick={() => setOpen(s => !s)}/>

                    <Drawer title={"Test"} isOpen={open} onClose={() => setOpen(false)} isClosable>
                        <div>
                            <RadioGroup options={[{ value: "1" }]}/>
                            <Checkbox/>
                        </div>
                    </Drawer>

                    <DropdownMenu trigger={<Button>Open</Button>}>
                        <DropdownMenu.Group title="Item">
                            <DropdownMenu.Item><BiEditAlt/>Edit</DropdownMenu.Item>
                            <DropdownMenu.Item><BiDuplicate/>Copy</DropdownMenu.Item>
                        </DropdownMenu.Group>
                        <DropdownMenu.Divider/>
                        <DropdownMenu.Group title="Group 2">
                            <DropdownMenu.Item><BiTrash/>Delete</DropdownMenu.Item>
                        </DropdownMenu.Group>
                        <DropdownMenu.Divider/>
                        <DropdownMenu.Group>
                            <DropdownMenu.Link href="#"><BiLinkExternal/>Learn more</DropdownMenu.Link>
                        </DropdownMenu.Group>
                    </DropdownMenu>

                    <DropdownMenu trigger={<Button>Open</Button>}>
                        <DropdownMenu.Group title="Item" contentClassName={"px-2"}>
                            <RadioGroup
                                value={radio}
                                onChange={v => setRadio(v ?? "")}
                                options={[{ value: "Option 1" }, { value: "Option 2" }]}
                            />
                        </DropdownMenu.Group>
                        <DropdownMenu.Group title="Item" contentClassName={"px-2"}>
                            <CheckboxGroup
                                value={checkbox}
                                onChange={v => setCheckbox(v)}
                                options={[{ value: "Option 1" }, { value: "Option 2" }]}
                            />
                        </DropdownMenu.Group>
                        <DropdownMenu.Divider/>
                        <DropdownMenu.Item><BiTrash/>Delete</DropdownMenu.Item>
                        <DropdownMenu.Divider/>
                        <DropdownMenu.Link href="#"><BiLinkExternal/>Learn more</DropdownMenu.Link>
                    </DropdownMenu>

                    <DropdownMenu trigger={<Button>Open</Button>}>
                        <DropdownMenu.Item><BiEditAlt/>Edit</DropdownMenu.Item>
                        <DropdownMenu.Item><BiEditAlt/>Edit</DropdownMenu.Item>
                    </DropdownMenu>

                    <Accordion>
                        <Accordion.Item title={"Test"}/>
                        <Accordion.Item title={"Test"}/>
                        <Accordion.Item title={"Test"}/>
                    </Accordion>

                    <Popover trigger={<Button>Open</Button>}>
                        Lorem ipsum dolor sit amet
                    </Popover>

                </div>
            </div>
        </>
    )

}

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

interface ClientTestProps {
    children?: React.ReactNode
}

export const ClientTest: React.FC<ClientTestProps> = (props) => {

    const { children, ...rest } = props

    const [radio, setRadio] = useState("Option 1")
    const [checkbox, setCheckbox] = useState(["Option 1"])

    const [open, setOpen] = useState(false)

    const cb = <Checkbox id="terms"/>

    return (
        <>
            <div className="container max-w-5xl">
                <div className="mt-10 space-y-4 divide-y relative dark:divide-gray-800">
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
                        radioContainerClassName="block w-full p-4 cursor-pointer transition border border-gray-200 rounded-md data-checked:bg-white data-checked:ring-2 data-checked:ring-brand-500"
                        radioControlClassName="absolute right-2 top-2 h-5 w-5 text-xs"
                        radioLabelClassName="font-semibold flex-none flex"
                        radioHelpClassName="text-sm"
                        options={[{ value: "Option 1", help: "Help" }, { value: "Option 2" }]}
                    />

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

                    <Drawer isOpen={open} onClose={() => setOpen(false)}>
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

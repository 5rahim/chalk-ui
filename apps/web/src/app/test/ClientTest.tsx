"use client"

import React, { useState } from "react"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BiEditAlt } from "@react-icons/all-files/bi/BiEditAlt"
import { BiTrash } from "@react-icons/all-files/bi/BiTrash"
import { BiDuplicate } from "@react-icons/all-files/bi/BiDuplicate"
import { BiLinkExternal } from "@react-icons/all-files/bi/BiLinkExternal"
import { RadioGroup } from "@/components/ui/radio-group"
import { CheckboxGroup } from "@/components/ui/checkbox"
import { PriceInput } from "@/components/ui/price-input"

interface ClientTestProps {
    children?: React.ReactNode
}

export const ClientTest: React.FC<ClientTestProps> = (props) => {

    const { children, ...rest } = props

    const [radio, setRadio] = useState("Option 1")
    const [checkbox, setCheckbox] = useState(["Option 1"])

    return (
        <div className="mt-10">
            <PriceInput onChange={console.log}/>

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

            <DropdownMenu trigger={<Button intent="alert-subtle">Open</Button>}>
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
            {/*<Accordion>*/}
            {/*   <Accordion.Item title={"Test"} />*/}
            {/*   <Accordion.Item title={"Test"} />*/}
            {/*   <Accordion.Item title={"Test"} />*/}
            {/*</Accordion>*/}


        </div>
    )

}

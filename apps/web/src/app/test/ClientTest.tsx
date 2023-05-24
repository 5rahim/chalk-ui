"use client"

import React from "react"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BiEditAlt } from "@react-icons/all-files/bi/BiEditAlt"
import { BiTrash } from "@react-icons/all-files/bi/BiTrash"
import { Divider } from "@/components/ui/divider"
import { BiDuplicate } from "@react-icons/all-files/bi/BiDuplicate"
import { BiLinkExternal } from "@react-icons/all-files/bi/BiLinkExternal"

interface ClientTestProps {
    children?: React.ReactNode
}

export const ClientTest: React.FC<ClientTestProps> = (props) => {

    const { children, ...rest } = props

    return (
        <div className="mt-10">
            <DropdownMenu
                trigger={<Button>Open</Button>}
            >
                <DropdownMenu.Group title="Item">
                    <DropdownMenu.Item><BiEditAlt/>Edit</DropdownMenu.Item>
                    <DropdownMenu.Item><BiDuplicate/>Copy</DropdownMenu.Item>
                </DropdownMenu.Group>
                <Divider/>
                <DropdownMenu.Group title="Group 2">
                    <DropdownMenu.Item><BiTrash/>Delete</DropdownMenu.Item>
                </DropdownMenu.Group>
                <Divider/>
                <DropdownMenu.Group>
                    <DropdownMenu.Link href="#"><BiLinkExternal/>Learn more</DropdownMenu.Link>
                </DropdownMenu.Group>
            </DropdownMenu>

            <DropdownMenu
                trigger={<Button>Open</Button>}
            >
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

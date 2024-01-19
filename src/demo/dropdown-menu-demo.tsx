import { Button } from "@/workshop/button"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
} from "@/workshop/dropdown-menu"
import * as React from "react"

export default function DropdownMenuDemo() {
    return (
        <DropdownMenu
            trigger={<Button>Show</Button>}
        >
            <DropdownMenuLabel>Group</DropdownMenuLabel>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>

            <DropdownMenuSub
                triggerContent="More"
            >
                <DropdownMenuItem>Item 1</DropdownMenuItem>
                <DropdownMenuItem>Item 2</DropdownMenuItem>
                <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
                Item 4
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>

        </DropdownMenu>
    )
}

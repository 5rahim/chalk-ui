import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/workshop/command"
import React from "react"
import { BiCalendarAlt, BiCog, BiSmile, BiUser } from "react-icons/bi"

export default function CommandDemo() {
    const [open, setOpen] = React.useState(false)

    // Toggle the menu when ⌘K is pressed
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <div className="h-80 w-full flex items-center justify-center font-medium text-[--muted]">
                Press Ctrl + K
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="max-h-80">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <BiCalendarAlt className="mr-2" />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <BiSmile className="mr-2" />
                            <span>Search Emoji</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <BiUser className="mr-2" />
                            <span>Profile</span>
                            <CommandShortcut>Ctrl + P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <BiCog className="mr-2" />
                            <span>Settings</span>
                            <CommandShortcut>Ctrl + S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}

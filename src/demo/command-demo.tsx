import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/workshop/command"
import { BiCalendarAlt, BiCog, BiSmile, BiUser } from "react-icons/bi"

export default function CommandDemo() {
    return (
        <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
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
        </Command>
    )
}

import { Meta, StoryObj } from "@storybook/react"
import { BiCalculator, BiCalendarAlt, BiCog, BiReceipt, BiSmile, BiUser } from "react-icons/bi"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "../command/command"

const meta = {
    title: "Components/Overlays/Command",
    component: Command,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: (props) => {
        return (
            <div className="max-w-[800px]">
                <Command
                    {...props}
                    className="rounded-lg border shadow-md"
                >
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem
                                leftIcon={<BiCalendarAlt />}
                            >
                                Calendar
                            </CommandItem>
                            <CommandItem
                                leftIcon={<BiSmile />}
                            >
                                Search Emoji
                            </CommandItem>
                            <CommandItem
                                leftIcon={<BiCalculator />}
                            >
                                Calculator
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem
                                leftIcon={<BiUser />}
                            >
                                Profile
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                            <CommandItem
                                leftIcon={<BiReceipt />}
                            >
                                Billing
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                            <CommandItem
                                leftIcon={<BiCog />}
                            >
                                Settings
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </div>
        )
    },
    args: {
        onChange: d => console.log(d),
    },
} satisfies Meta<typeof Command>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

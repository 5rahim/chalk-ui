import type { Meta, StoryObj } from "@storybook/react"
import { DropdownMenu, DropdownMenuProps } from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button"
import { BiEditAlt } from "@react-icons/all-files/bi/BiEditAlt"
import { BiTrash } from "@react-icons/all-files/bi/BiTrash"
import { BiLinkExternal } from "@react-icons/all-files/bi/BiLinkExternal"
import { RadioGroup } from "../components/ui/radio-group"
import { CheckboxGroup } from "../components/ui/checkbox"

const meta = {
    title: "Components/Overlays/DropdownMenu",
    component: DropdownMenu,
    tags: ["autodocs"],
    render: (args) => {
        return (
            <DropdownMenu trigger={<Button>Open</Button>}>
                <DropdownMenu.Item><BiEditAlt/>Edit</DropdownMenu.Item>
                <DropdownMenu.Item><BiTrash/>Delete</DropdownMenu.Item>
            </DropdownMenu>
        )
    },
    args: {},
} satisfies Meta<typeof DropdownMenu>


export default meta
type Story = StoryObj<Omit<DropdownMenuProps, "trigger">>;

export const Basic: Story = {
    args: {}
}

export const withGroups: Story = {
    render: () => (
        <DropdownMenu trigger={<Button>Open</Button>}>
            <DropdownMenu.Group title="Item" contentClassName={"px-2"}>
                <RadioGroup
                    options={[{ value: "Option 1" }, { value: "Option 2" }]}
                />
            </DropdownMenu.Group>
            <DropdownMenu.Group title="Item" contentClassName={"px-2"}>
                <CheckboxGroup
                    options={[{ value: "Option 1" }, { value: "Option 2" }]}
                />
            </DropdownMenu.Group>
            <DropdownMenu.Divider/>
            <DropdownMenu.Item><BiTrash/>Delete</DropdownMenu.Item>
            <DropdownMenu.Divider/>
            <DropdownMenu.Link href="#"><BiLinkExternal/>Learn more</DropdownMenu.Link>
        </DropdownMenu>
    )
}

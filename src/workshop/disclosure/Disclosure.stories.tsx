import { Button } from "@/workshop/button"
import * as React from "react"
import { Disclosure, DisclosureContent, DisclosureItem, DisclosureTrigger } from "@/workshop/disclosure"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Data Display/Disclosure",
    component: Disclosure,
    render: (props) => {
        return (
            <Disclosure {...props}>
                <DisclosureItem value="item-1">
                    <DisclosureTrigger>
                        <Button>Open</Button>
                    </DisclosureTrigger>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                    <DisclosureContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </DisclosureContent>
                </DisclosureItem>
            </Disclosure>
        )
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Disclosure>


export default meta
type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
    args: {
        type: "multiple",
    },
}

export const Single: Story = {
    args: {
        type: "single",
    },
}


export const Custom: Story = {
    args: {
        type: "multiple",
        className: "space-y-4",
        itemClass: "border-none",
        contentClass: "border rounded-md mt-4",
    },
}

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/workshop/accordion"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
    title: "Components/Data Display/Accordion",
    component: Accordion,
    render: (props) => {
        return (
            <Accordion {...props}>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Item 2</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        )
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Accordion>


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
        triggerClass: "rounded-md bg-gray-100 dark:bg-gray-900",
        itemClass: "border-none",
        contentClass: "border border-[--border] rounded-md mt-4",
    },
}

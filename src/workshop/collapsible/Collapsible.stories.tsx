import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Button } from "@/workshop/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/workshop/collapsible"

const meta = {
    title: "Components/Data Display/Collapsible",
    component: Collapsible,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {

        return (
            <Collapsible{...args}>
                <CollapsibleTrigger>
                    <Button className="data-[state=open]:bg-red-500">Open</Button>
                </CollapsibleTrigger>

                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur dolore doloremque eaque esse, eveniet facere iusto
                    magni maiores mollitia, quae quas reiciendis sit tempora tempore tenetur velit! Doloribus, excepturi.
                </div>

                <CollapsibleContent>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur dolore doloremque eaque esse, eveniet facere
                        iusto magni maiores mollitia, quae quas reiciendis sit tempora tempore tenetur velit! Doloribus, excepturi.
                    </div>
                </CollapsibleContent>

            </Collapsible>
        )
    },
    args: {},
} satisfies Meta<typeof Collapsible>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

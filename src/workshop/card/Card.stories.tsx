import { Button } from "@/workshop/button"
import { TextInput } from "@/workshop/text-input"
import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/workshop/card"

const meta = {
    title: "Components/Data Display/Card",
    component: Card,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: function Render(args) {
        return (
            <div className="">
                <Card {...args} className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Create a new account</CardTitle>
                        <CardDescription>Create a new account easily.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TextInput className="w-full" placeholder="Username" />
                    </CardContent>
                    <CardFooter>
                        <Button>Create</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    },
    args: {},
} satisfies Meta<typeof Card>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

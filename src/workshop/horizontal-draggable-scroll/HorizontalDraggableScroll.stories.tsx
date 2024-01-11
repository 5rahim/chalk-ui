import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardContent } from "../card"
import { HorizontalDraggableScroll } from "./"

const meta = {
    title: "Components/Data Display/HorizontalDraggableScroll",
    component: HorizontalDraggableScroll,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: (args) => {
        return (
            <div className="sm:w-[800px] w-full">
                <HorizontalDraggableScroll>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Card key={index} className="bg-brand-50 border-brand-200 dark:bg-brand-900 dark:border-brand-700 select-none">
                            <CardContent className="flex aspect-video w-80 items-center justify-center p-6 text-brand-800 dark:text-brand-100">
                                <span className="text-3xl font-semibold">{index + 1}</span>
                            </CardContent>
                        </Card>
                    ))}
                </HorizontalDraggableScroll>
            </div>
        )
    },
    args: {},
} satisfies Meta<typeof HorizontalDraggableScroll>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const OneElement: Story = {
    args: {},
    render: (args) => {
        return (
            <div className="sm:w-[800px] w-full">
                <HorizontalDraggableScroll>
                    {Array.from({ length: 1 }).map((_, index) => (
                        <Card key={index} className="bg-brand-50 border-brand-200 dark:bg-brand-900 dark:border-brand-700 select-none">
                            <CardContent className="flex aspect-video w-80 items-center justify-center p-6 text-brand-800 dark:text-brand-100">
                                <span className="text-3xl font-semibold">{index + 1}</span>
                            </CardContent>
                        </Card>
                    ))}
                </HorizontalDraggableScroll>
            </div>
        )
    },
}

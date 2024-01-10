import type { Meta, StoryObj } from "@storybook/react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "."
import { Card, CardContent } from "../card"

const meta = {
    title: "Components/Data Display/Carousel",
    component: Carousel,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    render: (args) => {
        return (
            <div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    gap="md"
                    className="w-full max-w-sm"
                    {...args}
                >
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2">
                                <Card className="bg-brand-50 border-brand-200 dark:bg-brand-900 dark:border-brand-700 select-none">
                                    <CardContent className="flex aspect-square items-center justify-center p-6 text-brand-800 dark:text-brand-100">
                                        <span className="text-3xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        )
    },
    args: {},
} satisfies Meta<typeof Carousel>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {},
}

export const Vertical: Story = {
    render: (args) => {
        return (
            <div className="w-[300px]">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    gap="none"
                    className="w-full max-w-xs"
                    {...args}
                >
                    <CarouselContent className="mt-0 h-[200px]">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="basis-1/2">
                                <Card className="bg-brand-50 border-brand-200 dark:bg-brand-900 dark:border-brand-700 select-none">
                                    <CardContent className="flex items-center justify-center p-6 text-brand-800 dark:text-brand-100">
                                        <span className="text-3xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        )
    },
}

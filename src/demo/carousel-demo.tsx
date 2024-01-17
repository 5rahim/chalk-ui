import { Card, CardContent } from "@/workshop/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/workshop/carousel"


export default function CarouselDemo() {
    return (
        <Carousel
            className="w-full max-w-sm"
            gap="md"
            opts={{
                align: "start",
            }}
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
    )
}

import { Card, CardContent } from "@/workshop/card"
import { HorizontalDraggableScroll } from "@/workshop/horizontal-draggable-scroll"

export default function HorizontalDraggableScrollDemo() {
    return (
        <HorizontalDraggableScroll className="sm:w-[800px] w-full">
            {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="bg-brand-50 border-brand-200 dark:bg-brand-900 dark:border-brand-700 select-none">
                    <CardContent className="flex aspect-video w-80 items-center justify-center p-6 text-brand-800 dark:text-brand-100">
                        <span className="text-3xl font-semibold">{index + 1}</span>
                    </CardContent>
                </Card>
            ))}
        </HorizontalDraggableScroll>
    )
}

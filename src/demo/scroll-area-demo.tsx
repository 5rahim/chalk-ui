import { ScrollArea } from "@/workshop/scroll-area"

export default function ScrollAreaDemo() {
    return (
        <div className="w-[300px] border rounded-md">
            <ScrollArea className="h-[400px] w-full p-4">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="h-[30px] border-b">
                        ScrollArea
                    </div>
                ))}
            </ScrollArea>
        </div>
    )
}

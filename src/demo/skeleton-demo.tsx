import { Skeleton } from "@/workshop/skeleton"

export default function SkeletonDemo() {
    return (
        <div className="w-full space-y-2">
            <div className="flex gap-2">
                <Skeleton className="w-8 h-8 flex-none rounded-full" />
                <Skeleton className="h-8" />
            </div>
            <Skeleton className="h-32" />
        </div>
    )
}

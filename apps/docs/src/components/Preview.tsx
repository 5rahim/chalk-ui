import * as React from "react"
import { cn } from "@/components/ui/core/ui-helpers"

interface PreviewProps {
    children?: React.ReactNode
    contentClassName?: string
    className?: string
}

const Preview: React.FC<PreviewProps> = (props) => {

    const { children, contentClassName, className, ...rest } = props

    return (
        <div className="py-6">
            <div
                className={cn("flex justify-center items-center border dark:border-gray-800 rounded-[--radius] p-6 min-h-[200px] relative", className)}>
                <div className={cn("max-w-[70%] w-full space-y-6", contentClassName)}>
                    {children}
                </div>
            </div>
        </div>
    )

}

export default Preview

import { Separator } from "@/workshop/separator"
import * as React from "react"

export default function SeparatorDemo() {
    return (
        <div className="w-full border rounded-[--radius]">
            <div className="space-y-1 p-4">
                <h4 className="text-sm font-medium leading-none">Chalk UI</h4>
                <p className="text-sm text-[--muted]">
                    An open-source UI component library.
                </p>
            </div>
            <Separator />
            <div className="flex h-8 items-center text-sm">
                <div className="px-4">Home</div>
                <Separator orientation="vertical" />
                <div className="px-4">Docs</div>
                <Separator orientation="vertical" />
                <div className="px-4">Source</div>
            </div>
        </div>
    )
}

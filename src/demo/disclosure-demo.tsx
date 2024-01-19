import { Button } from "@/workshop/button"
import { Disclosure, DisclosureContent, DisclosureItem, DisclosureTrigger } from "@/workshop/disclosure"
import { Separator } from "@/workshop/separator"
import * as React from "react"

export default function DisclosureDemo() {
    return (
        <Disclosure type="single" className="space-y-4" defaultValue="item-1">
            <DisclosureItem value="item-1" className="space-y-2">
                <DisclosureTrigger>
                    <Button className="w-full" size="sm" intent="gray-subtle">Click here</Button>
                </DisclosureTrigger>
                <div className="p-2 border rounded-[--radius] text-[--muted] text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </div>
                <DisclosureContent className="space-y-2">
                    <div className="p-2 border rounded-[--radius] text-[--muted] text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                    <div className="p-2 border rounded-[--radius] text-[--muted] text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                </DisclosureContent>
            </DisclosureItem>
            <Separator />
            <DisclosureItem value="item-2" className="space-y-2">
                <DisclosureTrigger>
                    <Button className="w-full" size="sm" intent="gray-subtle">Click here</Button>
                </DisclosureTrigger>
                <DisclosureContent className="space-y-2">
                    <div className="p-2 border rounded-[--radius] text-[--muted] text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                    <div className="p-2 border rounded-[--radius] text-[--muted] text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                </DisclosureContent>
            </DisclosureItem>
        </Disclosure>
    )
}

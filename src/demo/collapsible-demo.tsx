import { Button } from "@/workshop/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/workshop/collapsible"
import * as React from "react"

export default function CollapsibleDemo() {
    return (
        <Collapsible>
            <CollapsibleTrigger>
                <Button className="data-[state=open]:bg-[--green] mb-2" size="sm">Open</Button>
            </CollapsibleTrigger>

            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur dolore doloremque eaque esse, eveniet facere iusto
                magni maiores mollitia, quae quas reiciendis sit tempora tempore tenetur velit! Doloribus, excepturi.

                <CollapsibleContent className="inline font-semibold">
                    {" "}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur dolore doloremque eaque esse, eveniet facere.
                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consequatur, eaque et officiis quae quos vel. Aliquam
                         consectetur consequuntur corporis hic odio odit officiis possimus provident veniam voluptatum! Accusamus, ex.
                </CollapsibleContent>
            </div>

        </Collapsible>
    )
}

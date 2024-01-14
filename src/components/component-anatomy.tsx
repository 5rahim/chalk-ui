"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/workshop/accordion"
import * as React from "react"

interface ComponentAnatomyProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string
}

export function ComponentAnatomy({
    children,
    className,
    ...props
}: ComponentAnatomyProps) {

    return (
        <div className="space-y-4">
            <h3>Types</h3>

            <Accordion
                type="multiple" defaultValue={["types"]}
                className="space-y-2"
                triggerClass="bg-[--subtle] hover:bg-[--subtle-highlight] rounded-[--radius]"
                itemClass="border-none"
                contentClass="px-0 py-0"
            >
                <AccordionItem value="types">
                    <AccordionTrigger>Types</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            {/*@ts-expect-error*/}
                            {children[1]}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="anatomy">
                    <AccordionTrigger>Anatomy</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            {/*@ts-expect-error*/}
                            {children[0]}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

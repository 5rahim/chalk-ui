import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/workshop/accordion"

export default function AccordionDemo() {
    return (
        <div className="w-full">
            <Accordion type="multiple">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        Item 1
                    </AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        Item 2
                    </AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

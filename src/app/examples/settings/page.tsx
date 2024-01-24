"use client"

import { AppLayoutGrid, AppLayoutStack } from "@/workshop/app-layout"
import { cn } from "@/workshop/core/styling"
import { defineSchema, Field, Form } from "@/workshop/form"
import { PageHeader } from "@/workshop/page-header"
import { Separator } from "@/workshop/separator"
import { VerticalMenu } from "@/workshop/vertical-menu"
import React from "react"
import { BiBell, BiCheck, BiLockAlt, BiLockOpenAlt, BiUser } from "react-icons/bi"
import { toast } from "sonner"

const schema = defineSchema(({ z }) => z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.string().min(2),
    birthday: z.date(),
    visibility: z.string(),
}))

export default function Page() {

    const items = React.useMemo(() => ([
        {
            name: "General",
            isCurrent: true,
            href: "#",
            iconType: BiUser,
        },
        {
            name: "Notifications",
            isCurrent: false,
            href: "#",
            iconType: BiBell,
        },
        {
            name: "Security",
            isCurrent: false,
            href: "#",
            iconType: BiLockAlt,
        },
    ]), [])

    return (
        <div className="container">
            <AppLayoutGrid cols={6} className="py-5 md:py-10" breakBelow="lg">
                <AppLayoutStack className="col-span-2">
                    <PageHeader
                        title="Settings"
                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                    />
                    <VerticalMenu
                        items={items}
                        className="flex-row lg:flex-col flex-none w-full overflow-x-auto"
                        itemClass="w-fit lg:w-full data-[current=true]:font-semibold"
                    />
                    <Separator className="block lg:hidden" />
                </AppLayoutStack>
                <AppLayoutStack className="col-span-4">

                    <PageHeader
                        title="General"
                        description="Lorem ipsum dolor sit amet."
                        size="sm"
                    />

                    <Form
                        schema={schema}
                        onSubmit={data => {
                            toast("Form submitted successfully!", {
                                description:
                                    <pre className="max-w-full overflow-x-hidden p-1 rounded-[--radius] bg-[--subtle] border text-xs">
                                        {JSON.stringify(data, null, 2)}
                                    </pre>,
                                position: "bottom-right",
                            })
                        }}
                        defaultValues={{
                            first_name: "John",
                            last_name: "Doe",
                            email: "johndoe@acme.com",
                            birthday: new Date(),
                            visibility: "public",
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-3">
                            <Field.Text name="first_name" label="First name" />
                            <Field.Text name="last_name" label="Last name" />
                        </div>
                        <Field.Text type="email" name="email" label="Email" />
                        <Field.DatePicker name="birthday" label="Birthday" />

                        <Field.RadioGroup
                            name="visibility"
                            label="Account visibility"
                            options={[
                                { value: "public", label: <><BiLockOpenAlt className="text-3xl" /> <span>Public</span></> },
                                { value: "private", label: <><BiLockAlt className="text-3xl" /> <span>Private</span></> },
                            ]}
                            stackClass="flex flex-row gap-2"
                            itemContainerClass={cn(
                                "cursor-pointer aspect-square transition border-transparent rounded-[--radius] p-4 w-32 justify-center",
                                "bg-gray-50 hover:bg-[--subtle] dark:bg-gray-900",
                                "data-[state=checked]:bg-white dark:data-[state=checked]:bg-gray-950",
                                "focus:ring-2 ring-brand-100 dark:ring-brand-900 ring-offset-1 ring-offset-[--background] focus-within:ring-2 transition",
                                "data-[state=checked]:border data-[state=checked]:border-[--brand] data-[state=checked]:ring-offset-0",
                            )}
                            itemClass={cn(
                                "border-transparent absolute top-2 right-2 bg-transparent dark:bg-transparent dark:data-[state=unchecked]:bg-transparent",
                                "data-[state=unchecked]:bg-transparent data-[state=unchecked]:hover:bg-transparent dark:data-[state=unchecked]:hover:bg-transparent",
                                "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent",
                            )}
                            itemLabelClass="font-medium flex flex-col items-center data-[state=checked]:text-[--brand] cursor-pointer"
                            itemCheckIcon={<BiCheck className="text-white text-lg" />}
                        />

                        <Field.Submit role="save">Save</Field.Submit>
                    </Form>


                </AppLayoutStack>
            </AppLayoutGrid>
        </div>
    )
}

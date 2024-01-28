"use client"

import { AppLayoutGrid, AppLayoutStack } from "@/workshop/app-layout"
import { Button } from "@/workshop/button"
import { defineSchema, Field, Form } from "@/workshop/form"
import { Separator } from "@/workshop/separator"
import React from "react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

const schema = defineSchema(({ z }) => z.object({
    email: z.string().min(2),
}))

export default function Page() {

    return (
        <AppLayoutGrid cols={6} breakBelow="lg" className="h-full">
            <AppLayoutStack className="col-span-3 h-full flex items-center">
                <AppLayoutStack className="max-w-[400px] w-full mx-auto space-y-6">
                    <h2>Log in</h2>
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
                            email: "johndoe@acme.com",
                        }}
                    >
                        <Field.Text type="email" name="email" label="Email" />

                        <Field.Submit role="save" className="w-full" intent="gray-subtle">Continue with email</Field.Submit>
                    </Form>

                    <div className="relative flex justify-center">
                        <Separator className="absolute inset-0 top-1" />
                        <span className="text-[--muted] relative bg-[--background] px-4 text-xs mx-auto">OR</span>
                    </div>

                    <Button leftIcon={<FcGoogle className="text-xl" />} className="w-full" intent="gray-outline">Continue with Google</Button>
                </AppLayoutStack>
            </AppLayoutStack>
            <div className="hidden lg:block h-full col-span-3 bg-gray-50 dark:bg-gray-200 bg-blend-multiply dark:bg-blend-difference bg-[url(/images/swirl.png)] relative">
                <div className="w-[100%] h-[600px] absolute -bottom-10 -right-16 rounded-xl overflow-hidden dark:shadow-none shadow-md border transition-shadow hover:shadow-xl z-[1] bg-[url(/images/so-dashboard-light.png)] dark:bg-[url(/images/so-dashboard-dark.png)]" />
                <div className="p-16">
                    <p className="font-semibold text-pretty leading-7">
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cupiditate molestias odio quas sit sunt velit
                        voluptatibus.
                        Accusantium ad asperiores."
                    </p>
                    <p className="text-[--muted] font-medium pt-2">- John Doe</p>
                </div>
            </div>
        </AppLayoutGrid>
    )
}

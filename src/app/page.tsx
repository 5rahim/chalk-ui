import { DatagridSection } from "@/app/_landing/datagrid-section"
import { FormSection } from "@/app/_landing/form-section"
import DashboardPage from "@/app/examples/dashboard/page"
import { ModeToggle } from "@/components/client-providers"
import { AppLayout, AppLayoutContent } from "@/workshop/app-layout"
import { Button } from "@/workshop/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { BiBook, BiLogoGithub } from "react-icons/bi"
import { RiReactjsLine } from "react-icons/ri"
import { SiNextdotjs, SiTailwindcss } from "react-icons/si"

export default function Home() {
    return (
        <AppLayoutContent className="bg-gray-50 dark:bg-black">
            <svg
                className="absolute inset-0 z-[0] h-full w-full stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(70%_100%_at_top_left,black,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                        width={200}
                        height={200}
                        x="90%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M100 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
            </svg>
            <AppLayout className="relative z-[1] items-center justify-center w-full md:max-w-[500px] mx-auto gap-4 py-4 lg:py-10">
                <div className="relative size-20">
                    <Image
                        src="/images/logo.png"
                        alt="Chalk UI Logo"
                        fill
                        className="object-center object-contain"
                    />
                </div>
                <h3 className="text-3xl md:text-4xl xl:text-7xl -mt-3 font-bold">Chalk UI</h3>
                <p className="text-[--muted] font-medium md:text-lg text-pretty text-center px-4">
                    50+ customizable React components, optimized for SaaS products. Completely free and open source.
                </p>

                <div className="flex gap-2">
                    <Link href="/docs" target="_blank"><Button leftIcon={<BiBook className="text-xl" />}>Docs</Button></Link>
                    <Link
                        href="https://github.com/5rahim/chalk-ui"
                        target="_blank"
                        referrerPolicy="no-referrer"
                    >
                        <Button
                            intent="gray-basic"
                            leftIcon={<BiLogoGithub className="text-xl" />}
                        >GitHub</Button>
                    </Link>
                    <ModeToggle />
                </div>

                <div className="flex items-center gap-2 md:gap-4 text-[--muted] pt-2">
                    <RiReactjsLine className="text-3xl [#61DAFB]" />
                    <SiTailwindcss className="text-3xl [#06B6D4]" />
                    <SiNextdotjs className="text-2xl [#000000]" />
                </div>

            </AppLayout>
            <div className="container relative z-[1]">
                <Link href="/examples">
                    <Button
                        intent="gray-link"
                    >Browse more examples</Button>
                </Link>
                <div className="overflow-hidden relative rounded-[0.5rem] border bg-[--background] min-h-[800px] shadow-xl">
                    <DashboardPage />
                </div>
            </div>

            <FormSection />

            <DatagridSection />

            <div className="text-center z-[2] relative">
                <h2 className="text-center mb-4">And more...</h2>
                <Link href="/docs"><Button size="lg" rounded>Get started</Button></Link>
            </div>

            <AppLayout className="items-center justify-center w-full md:max-w-[500px] mx-auto gap-4 py-10 relative z-[1]">
                <p className="text-[--muted]">Made by <Link
                    href="https://rahim.app"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="underline hover:text-[--brand]"
                >
                    5rahim
                </Link></p>
            </AppLayout>


            <svg
                className="fixed inset-0 z-[0] h-full bottom-0 right-0 w-full stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(70%_50%_at_bottom_right,black,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                        width={200}
                        height={200}
                        x="90%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M100 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
            </svg>
        </AppLayoutContent>
    )
}

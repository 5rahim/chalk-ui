import { ExamplesNav } from "@/app/examples/examples-nav"
import { ModeToggle } from "@/components/client-providers"
import { AppLayout, AppLayoutContent } from "@/workshop/app-layout"
import { Button, IconButton } from "@/workshop/button"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { BiBook, BiHome, BiLogoGithub } from "react-icons/bi"

export const metadata: Metadata = {
    title: "Examples",
    description: "Browse examples of Chalk UI components in action.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayoutContent className="bg-gray-50 dark:bg-black">
            <svg
                className="absolute inset-0 z-[0] h-full w-full stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_left,black,transparent)]"
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
                <div className="relative size-16">
                    <Image
                        src="/images/logo.png"
                        alt="Chalk UI Logo"
                        fill
                        className="object-center object-contain"
                    />
                </div>
                <h3 className="text-3xl md:text-4xl -mt-3 font-bold">Chalk UI Examples</h3>
                <p className="text-[--muted] md:text-lg text-pretty text-center">
                    Browse examples of Chalk UI components in action.
                </p>
                <div className="flex gap-2">
                    <Link href="/"><IconButton intent="primary-basic" icon={<BiHome className="text-md" />} /></Link>
                    <Link href="/docs" target="_blank"><Button intent="primary-basic" leftIcon={<BiBook className="text-xl" />}>Docs</Button></Link>
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
            </AppLayout>
            <div className="container relative">
                <ExamplesNav />
                <div className="overflow-hidden relative rounded-[0.5rem] border bg-[--background] min-h-[800px] shadow-md">
                    {children}
                </div>
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
        </AppLayoutContent>
    )
}

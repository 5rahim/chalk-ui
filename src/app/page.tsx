import { ModeToggle } from "@/components/client-providers"
import { AppLayout, AppLayoutContent } from "@/workshop/app-layout"
import { Button } from "@/workshop/button"
import Image from "next/image"
import Link from "next/link"
import { BiBook, BiLogoGithub, BiParty } from "react-icons/bi"

export default function Home() {
    return (
        <AppLayoutContent className="min-h-dvh items-center flex">
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-gray-300 dark:stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_bottom_right,black,transparent)]"
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
            <AppLayout className="items-center justify-center w-full md:max-w-[800px] mx-auto gap-4">
                <div className="relative size-24">
                    <Image
                        src="/images/logo.png"
                        alt="Chalk UI Logo"
                        fill
                        className="object-center object-contain"
                    />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold">Chalk UI</h1>
                <p className="text-[--muted] md:text-lg text-pretty text-center px-4">
                    Opinionated and flexible React components, styled with TailwindCSS, built for Next.js SaaS applications.
                </p>
                <div className="flex gap-2">
                    <Link href="/docs"><Button leftIcon={<BiBook />}>Docs</Button></Link>
                    <Link href="/examples"><Button intent="primary-subtle">Examples</Button></Link>
                    <Link
                        href="https://github.com/5rahim/chalk-ui"
                        target="_blank"
                        referrerPolicy="no-referrer"
                    >
                        <Button
                            intent="gray-basic"
                            leftIcon={<BiLogoGithub />}
                        >Github</Button>
                    </Link>
                    <ModeToggle />
                </div>
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

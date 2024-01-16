import { ClientProviders } from "@/components/client-providers"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        default: "Chalk UI",
        template: "%s - Chalk UI",
    },
    metadataBase: new URL("https://chalk.rahim.app"),
    description: "Opinionated and flexible React components, styled with TailwindCSS, built for Next.js SaaS applications.",
    keywords: [
        "React",
        "Next.js",
        "Next.js UI",
        "UI Library",
        "SaaS",
        "React Components",
        "Tailwind CSS",
        "Server Components",
        "Radix UI",
    ],
    authors: [
        {
            name: "5rahim",
            url: "https://rahim.app",
        },
    ],
    creator: "5rahim",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "https://chalk.rahim.app/site.webmanifest",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
        <ClientProviders>
            {children}
        </ClientProviders>
        </body>
        </html>
    )
}


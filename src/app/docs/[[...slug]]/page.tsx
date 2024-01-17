import { Mdx } from "@/components/mdx-components"
import { DashboardTableOfContents } from "@/components/toc"
import { ButtonAnatomy } from "@/workshop/button"
import { cn } from "@/workshop/core/styling"
import { ScrollArea } from "@/workshop/scroll-area"
import { allDocs } from "contentlayer/generated"
import "@/styles/mdx.css"
import { ExternalLinkIcon } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Balancer from "react-wrap-balancer"
import { getTableOfContents } from "../../../../lib/toc"
import { absoluteUrl } from "../../../../lib/utils"


interface DocPageProps {
    params: {
        slug: string[]
    }
}

async function getDocFromParams({ params }: DocPageProps) {
    const slug = params.slug?.join("/") || ""
    const doc = allDocs.find((doc: any) => doc.slugAsParams === slug)

    if (!doc) {
        return null
    }

    return doc
}

export async function generateMetadata({
    params,
}: DocPageProps): Promise<Metadata> {
    const doc = await getDocFromParams({ params })

    if (!doc) {
        return {}
    }

    return {
        title: doc.title,
        description: doc.description,
        openGraph: {
            title: doc.title,
            description: doc.description,
            type: "article",
            url: absoluteUrl(doc.slug),
        },
    }
}

export async function generateStaticParams(): Promise<
    DocPageProps["params"][]
> {
    return allDocs.map((doc) => ({
        slug: doc.slugAsParams.split("/"),
    }))
}

export default async function DocPage({ params }: DocPageProps) {
    const doc = await getDocFromParams({ params })

    if (!doc) {
        notFound()
    }

    const toc = await getTableOfContents(doc.body.raw)

    return (
        <div className="relative p-8 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
            <div className="mx-auto w-full min-w-0">
                <div className="space-y-2">
                    <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
                        {doc.title}
                    </h1>
                    {doc.description && (
                        <p className="text-lg text-[--muted]">
                            <Balancer>{doc.description}</Balancer>
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-2 pt-4">
                    {doc.componentName && (
                        <Link
                            href={"https://github.com/5rahim/chalk-ui/tree/main/src/workshop/" + doc.componentName}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(ButtonAnatomy.root({ size: "xs", intent: "gray-subtle" }), "flex items-center gap-1")}
                        >
                            Source
                            <ExternalLinkIcon className="h-3 w-3" />
                        </Link>
                    )}
                    {doc.links?.doc && (
                        <Link
                            href={doc.links.doc}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(ButtonAnatomy.root({ size: "xs", intent: "gray-subtle" }), "flex items-center gap-1")}
                        >
                            Docs
                            <ExternalLinkIcon className="h-3 w-3" />
                        </Link>
                    )}
                    {doc.links?.api && (
                        <Link
                            href={doc.links.api}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(ButtonAnatomy.root({ size: "xs", intent: "gray-subtle" }), "flex items-center gap-1")}
                        >
                            Dependency API
                            <ExternalLinkIcon className="h-3 w-3" />
                        </Link>
                    )}
                </div>
                <div className="pb-12 pt-8">
                    <Mdx code={doc.body.code} />
                </div>
                {/*<DocsPager doc={doc} />*/}
            </div>
            {doc.toc && (
                <div className="hidden text-sm xl:block">
                    <div className="sticky top-16 -mt-10 pt-4">
                        <ScrollArea className="pb-10">
                            <div className="sticky top-16 -mt-10 h-dvh py-12">
                                <DashboardTableOfContents toc={toc} />
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            )}
        </div>
    )
}

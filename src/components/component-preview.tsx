"use client"

import { Bank } from "@/bank"
import { IconButton } from "@/workshop/button"
import { cn } from "@/workshop/core/styling"
import { LoadingSpinner } from "@/workshop/loading-spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/workshop/tabs"
import * as React from "react"
import { BiCheck, BiCopy } from "react-icons/bi"
import { Event, trackEvent } from "../../lib/events"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    extractClassname?: boolean
    extractedClassNames?: string
    align?: "center" | "start" | "end"
    hideCode?: boolean
}

export function ComponentPreview({
    name,
    children,
    className,
    extractClassname,
    extractedClassNames,
    align = "center",
    hideCode,
    ...props
}: ComponentPreviewProps) {

    const Codes = React.Children.toArray(children) as React.ReactElement[]
    const Code = Codes[0]

    const Preview = React.useMemo(() => {
        const Component = Bank[name]?.component

        if (!Component) {
            return (
                <p className="text-sm text-[--foreground]">
                    Component{" "}
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {name}
                    </code>{" "}
                    not found bank.
                </p>
            )
        }

        return <Component />
    }, [name])

    const codeString = React.useMemo(() => {
        if (typeof Code?.props["data-rehype-pretty-code-fragment"] !== "undefined") {
            const [CodeC] = React.Children.toArray(Code.props.children) as React.ReactElement[]
            return CodeC?.props?.value || CodeC?.props?.__rawString__ || null
        }
    }, [Code])

    return (
        <div
            className={cn("group relative", className)}
            {...props}
        >
            <Tabs
                className=""
                defaultValue="preview"
                triggerClass="text-base"
            >
                <TabsList className="flex border-b">
                    <TabsTrigger value="preview">
                        Preview
                    </TabsTrigger>
                    {!hideCode && <TabsTrigger value="code">
                        Code
                    </TabsTrigger>}
                </TabsList>
                <TabsContent value="preview">
                    <React.Suspense
                        fallback={
                            <div className="w-full">
                                <LoadingSpinner />
                            </div>
                        }
                    >
                        <div
                            className={cn(
                                "preview relative flex min-h-[200px] w-full justify-center py-4 lg:p-10",
                                {
                                    "items-center": align === "center",
                                    "items-start": align === "start",
                                    "items-end": align === "end",
                                },
                            )}
                        >
                            {Preview}
                        </div>
                    </React.Suspense>
                </TabsContent>
                {!hideCode && <TabsContent value="code">
                    <div className="relative flex flex-col space-y-4 py-4">
                        <div className="absolute top-10 right-6 z-10">
                            {codeString && <CopyButton value={codeString} />}
                        </div>
                        <div className="w-full rounded-[--radius] [&_pre]:my-0 [&_pre]:max-h-[150px] lg:[&_pre]:max-h-[600px] [&_pre]:overflow-auto">
                            {Code}
                        </div>
                    </div>
                </TabsContent>}
            </Tabs>


        </div>
    )
}

type CopyButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    value: string
    src?: string
    event?: Event["name"]
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
    navigator.clipboard.writeText(value)
    if (event) {
        trackEvent(event)
    }
}

export function CopyButton({
    value,
    className,
    src,
    event,
    ...props
}: CopyButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }, [hasCopied])

    return (
        <IconButton
            intent="white-basic"
            size="sm"
            className={cn(
                className,
            )}
            onClick={() => {
                copyToClipboardWithMeta(
                    value,
                    event
                        ? {
                            name: event,
                            properties: {
                                code: value,
                            },
                        }
                        : undefined,
                )
                setHasCopied(true)
            }}
            icon={hasCopied ? (
                <BiCheck className="h-3 w-3" />
            ) : (
                <BiCopy className="h-3 w-3" />
            )}
            {...props}
        />
    )
}

"use client"
// import { Callout } from "@/components/callout"
// import { CodeBlockWrapper } from "@/components/code-block-wrapper"
// import { ComponentExample } from "@/components/component-example"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentAnatomy } from "@/components/component-anatomy"
import { cn } from "@/workshop/core/styling"
import { useMDXComponent } from "next-contentlayer/hooks"
import * as React from "react"


const components = {
    // Accordion,
    // AccordionContent,
    // AccordionItem,
    // AccordionTrigger,
    // Alert,
    // AlertTitle,
    // AlertDescription,
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className={cn(
                "font-heading mt-2 scroll-m-20 text-4xl font-bold",
                className,
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                "font-heading mt-12 scroll-m-20 pb-4 text-2xl font-semibold tracking-tight first:mt-0",
                className,
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className={cn(
                "font-heading mt-8 pb-4 scroll-m-20 text-xl font-semibold tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4
            className={cn(
                "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5
            className={cn(
                "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6
            className={cn(
                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                className,
            )}
            {...props}
        />
    ),
    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={cn("font-medium underline underline-offset-4", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={cn("my-4 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className={cn("my-4 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    // blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    //   <blockquote
    //     className={cn("mt-6 border-l-2 pl-6 italic", className)}
    //     {...props}
    //   />
    // ),
    // img: ({
    //   className,
    //   alt,
    //   ...props
    // }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    //   // eslint-disable-next-line @next/next/no-img-element
    //   <img className={cn("rounded-md", className)} alt={alt} {...props} />
    // ),
    // hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    //   <hr className="my-4 md:my-8" {...props} />
    // ),
    // table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    //   <div className="my-6 w-full overflow-y-auto">
    //     <table className={cn("w-full", className)} {...props} />
    //   </div>
    // ),
    // tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    //   <tr
    //     className={cn("m-0 border-t p-0 even:bg-muted", className)}
    //     {...props}
    //   />
    // ),
    // th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    //   <th
    //     className={cn(
    //       "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
    //       className
    //     )}
    //     {...props}
    //   />
    // ),
    // td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    //   <td
    //     className={cn(
    //       "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
    //       className
    //     )}
    //     {...props}
    //   />
    // ),
    pre: ({
        className,
        __rawString__,
        __withMeta__,
        __src__,
        ...props
    }: React.HTMLAttributes<HTMLPreElement> & {
        __rawString__?: string
        __withMeta__?: boolean
        __src__?: string
    }) => {
        return (
            <pre
                className={cn(
                    "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-gray-900 py-4 dark:bg-gray-950",
                    className,
                )}
                {...props}
            />
        )
    },
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className={cn(
          "relative rounded bg-[--subtle] px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className
        )}
        {...props}
      />
    ),
    // Image,
    // Callout,
    ComponentPreview,
    ComponentAnatomy,
    // ComponentExample,
    // ComponentSource,
    // AspectRatio,
}

interface MdxProps {
    code: string
}

export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code, {
        // style: config.style,
    })

    return (
        <div className="mdx">
            <Component components={components} />
        </div>
    )
}

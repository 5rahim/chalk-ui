"use client"

import React from "react"
import { ComponentWithAnatomy, defineStyleAnatomy } from "../core"
import { cva } from "class-variance-authority"
import { cn } from "@rahimstack/tailwind-utils"

/* -------------------------------------------------------------------------------------------------
 * Anatomy
 * -----------------------------------------------------------------------------------------------*/

export const StatsAnatomy = defineStyleAnatomy({
    list: cva([
        "UI-Stats__list",
        "grid grid-cols-1 divide-y divide-[--border] overflow-hidden md:grid-cols-3 md:divide-y-0 md:divide-x"
    ]),
    item: cva([
        "UI-Stats__item",
        "px-4 py-5 sm:p-6"
    ]),
    name: cva([
        "UI-Stats__name",
        "text-sm font-normal text-[--muted]"
    ]),
    value: cva([
        "UI-Stats__value",
        "mt-1 flex items-baseline md:block lg:flex text-2xl md:text-3xl font-semibold"
    ]),
    unit: cva([
        "UI-Stats__unit",
        "ml-2 text-sm font-medium text-[--muted]"
    ]),
    trend: cva([
        "UI-Stats__trend",
        "inline-flex items-baseline text-sm font-medium",
        "data-[trend=up]:text-green-500 data-[trend=down]:text-red-500"
    ])
})

/* -------------------------------------------------------------------------------------------------
 * Stats
 * -----------------------------------------------------------------------------------------------*/

export interface StatsProps extends React.ComponentPropsWithRef<"dl">, ComponentWithAnatomy<typeof StatsAnatomy> {
    children?: React.ReactNode,
    values: { name: string, value: string | number, unit?: string | number, change?: string | number, trend?: "up" | "down" }[]
}

export const Stats: React.FC<StatsProps> = React.forwardRef<HTMLDListElement, StatsProps>((props, ref) => {

    const {
        children,
        listClassName,
        itemClassName,
        nameClassName,
        valueClassName,
        unitClassName,
        trendClassName,
        className,
        values,
        ...rest
    } = props

    return (
        <div
        >
            <dl
                className={cn(StatsAnatomy.list(), listClassName, className)}
                {...rest}
                ref={ref}
            >
                {values.map((item) => (
                    <div
                        key={item.name}
                        className={cn(StatsAnatomy.item(), itemClassName)}
                    >

                        <dt className={cn(StatsAnatomy.name(), nameClassName)}>{item.name}</dt>

                        <dd className={cn(StatsAnatomy.value(), valueClassName)}>
                            {item.value}
                            <span className={cn(StatsAnatomy.unit(), unitClassName)}>{item.unit}</span>
                        </dd>
                        <div
                            className={cn(StatsAnatomy.trend(), trendClassName)}
                            data-trend={item.trend}
                        >
                            {item.trend && <span> {item.trend === "up" ? "+" : "-"}</span>}
                            {item.change}
                        </div>
                    </div>
                ))}
            </dl>
        </div>
    )

})

Stats.displayName = "Stats"

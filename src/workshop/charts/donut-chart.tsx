"use client"

import { cn } from "../core/styling"
import * as React from "react"
import { Pie, PieChart as ReChartsDonutChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartTooltipFrame, ChartTooltipRow } from "./chart-tooltip"
import { ColorPalette, UIColor } from "./color-theme"
import { ChartValueFormatter } from "./types"
import { defaultValueFormatter, parseChartData, parseChartLabelInput } from "./utils"

/* -------------------------------------------------------------------------------------------------
 * DonutChart
 * -----------------------------------------------------------------------------------------------*/

export type DonutChartProps = React.HTMLAttributes<HTMLDivElement> & {
    data: any[]
    category?: string
    index?: string
    colors?: UIColor[]
    variant?: "donut" | "pie"
    valueFormatter?: ChartValueFormatter
    label?: string
    showLabel?: boolean
    showAnimation?: boolean
    showTooltip?: boolean
    noDataText?: string
}

export const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>((props, ref) => {
    const {
        data = [],
        category = "value",
        index = "name",
        colors = ColorPalette,
        variant = "donut",
        valueFormatter = defaultValueFormatter,
        label,
        showLabel = true,
        showAnimation = true,
        showTooltip = true,
        className,
        noDataText,
        ...other
    } = props
    const isDonut = variant == "donut"

    const parsedLabelInput = parseChartLabelInput(label, valueFormatter, data, category)

    return (
        <div ref={ref} className={cn("w-full h-44", className)} {...other}>
            <ResponsiveContainer width="100%" height="100%">
                {data?.length ? (
                    <ReChartsDonutChart>
                        {showLabel && isDonut ? (
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill={`var(--muted)`}
                                className="font-semibold"
                            >
                                {parsedLabelInput}
                            </text>
                        ) : null}
                        <Pie
                            data={parseChartData(data, colors)}
                            cx="50%"
                            cy="50%"
                            startAngle={90}
                            endAngle={-270}
                            innerRadius={isDonut ? "75%" : "0%"}
                            outerRadius="100%"
                            paddingAngle={0}
                            dataKey={category}
                            nameKey={index}
                            isAnimationActive={showAnimation}
                        />
                        {showTooltip ? (
                            <Tooltip
                                wrapperStyle={{ outline: "none" }}
                                content={({ active, payload }) => (
                                    <DonutChartTooltip
                                        active={active}
                                        payload={payload}
                                        valueFormatter={valueFormatter}
                                    />
                                )}
                            />
                        ) : null}
                    </ReChartsDonutChart>
                ) : (
                    <div>...</div>
                )}
            </ResponsiveContainer>
        </div>
    )
})

DonutChart.displayName = "DonutChart"

/* -------------------------------------------------------------------------------------------------
 * DonutChartTooltip
 * -----------------------------------------------------------------------------------------------*/

type DonutChartTooltipProps = {
    active?: boolean
    payload: any
    valueFormatter: ChartValueFormatter
}

const DonutChartTooltip = ({ active, payload, valueFormatter }: DonutChartTooltipProps) => {
    if (active && payload[0]) {
        const payloadRow = payload[0]
        return (
            <ChartTooltipFrame>
                <div className={cn("py-2 px-2")}>
                    <ChartTooltipRow
                        value={valueFormatter(payloadRow.value)}
                        name={payloadRow.name}
                        color={payloadRow.payload.color}
                    />
                </div>
            </ChartTooltipFrame>
        )
    }
    return null
}

DonutChartTooltip.displayName = "DonutChartTooltip"

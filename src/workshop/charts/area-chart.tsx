"use client"

import { cn } from "../core/styling"
import * as React from "react"
import { Area, AreaChart as ReChartsAreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { AxisDomain } from "recharts/types/util/types"
import { ChartLegend } from "./chart-legend"
import { ChartTooltip } from "./chart-tooltip"
import { ColorPalette } from "./color-theme"
import { BaseChartProps, ChartCurveType } from "./types"
import { constructCategoryColors, defaultValueFormatter, getYAxisDomain } from "./utils"

/* -------------------------------------------------------------------------------------------------
 * AreaChart
 * -----------------------------------------------------------------------------------------------*/

export interface AreaChartProps extends React.ComponentPropsWithoutRef<"div">,
    BaseChartProps {
    stack?: boolean
    /**
     * The type of curve to use for the line
     */
    curveType?: ChartCurveType
    /**
     * Connect null data points
     */
    connectNulls?: boolean
    /**
     * Display dots for each data point
     */
    showDots?: boolean
    /**
     * Angle the x-axis labels
     */
    angledLabels?: boolean
}

export const AreaChart: React.FC<AreaChartProps> = React.forwardRef<HTMLDivElement, AreaChartProps>((props, ref) => {

    const {
        className,
        stack = false,
        curveType = "linear",
        connectNulls = false,
        angledLabels = false,
        /**/
        data = [],
        categories = [],
        index,
        colors = ColorPalette,
        valueFormatter = defaultValueFormatter,
        startEndOnly = false,
        showXAxis = true,
        showYAxis = true,
        yAxisWidth = 56,
        showAnimation = true,
        showTooltip = true,
        showLegend = true,
        showGridLines = true,
        showGradient = true,
        autoMinValue = false,
        minValue,
        maxValue,
        allowDecimals = true,
        showDots = true,
        noDataText,
        ...rest
    } = props

    const [legendHeight, setLegendHeight] = React.useState(60)

    const categoryColors = constructCategoryColors(categories, colors)
    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue)

    return (
        <div
            ref={ref}
            className={cn("w-full h-80", className)}
            {...rest}
        >
            <ResponsiveContainer width={"100%"} height={"100%"}>
                {data?.length ? (
                    <ReChartsAreaChart data={data}>
                        {showGridLines ? (
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        ) : null}
                        <XAxis
                            hide={!showXAxis}
                            dataKey={index}
                            tick={{ transform: "translate(0, 8)" }}
                            ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
                            style={{
                                fontSize: ".75rem",
                                fontFamily: "Inter; Helvetica",
                                color: "red",
                            }}
                            interval="preserveStartEnd"
                            axisLine={false}
                            tickLine={false}
                            padding={{ left: 10, right: 10 }}
                            minTickGap={5}
                            spacing={120}
                            textAnchor={angledLabels ? "end" : undefined}
                            angle={angledLabels ? -40 : undefined}
                        />
                        <YAxis
                            width={yAxisWidth}
                            hide={!showYAxis}
                            axisLine={false}
                            tickLine={false}
                            type="number"
                            domain={yAxisDomain as AxisDomain}
                            tick={{ transform: "translate(-3, 0)" }}
                            style={{
                                fontSize: ".8rem",
                                fontFamily: "Inter; Helvetica",
                            }}
                            tickFormatter={valueFormatter}
                            allowDecimals={allowDecimals}
                        />
                        {showTooltip ? (
                            <Tooltip
                                wrapperStyle={{ outline: "none" }}
                                isAnimationActive={false}
                                cursor={{ stroke: "#ddd", strokeWidth: 2 }}
                                position={{ y: 0 }}
                                content={({ active, payload, label }) => (
                                    <ChartTooltip
                                        active={active}
                                        payload={payload}
                                        label={label}
                                        valueFormatter={valueFormatter}
                                        categoryColors={categoryColors}
                                    />
                                )}
                            />
                        ) : null}

                        {categories.map((category) => {
                            const hexColor = `var(--${categoryColors.get(category)})`
                            return (
                                <defs key={category}>
                                    {showGradient ? (
                                        <linearGradient id={categoryColors.get(category)} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={hexColor} stopOpacity={0.2} />
                                            <stop offset="95%" stopColor={hexColor} stopOpacity={0} />
                                        </linearGradient>
                                    ) : (
                                        <linearGradient id={categoryColors.get(category)} x1="0" y1="0" x2="0" y2="1">
                                            <stop stopColor={hexColor} stopOpacity={0.3} />
                                        </linearGradient>
                                    )}
                                </defs>
                            )
                        })}

                        {categories.map((category) => (
                            <Area
                                key={category}
                                name={category}
                                type={curveType}
                                dataKey={category}
                                stroke={`var(--${categoryColors.get(category)})`}
                                fill={`url(#${categoryColors.get(category)})`}
                                strokeWidth={2}
                                dot={showDots}
                                isAnimationActive={showAnimation}
                                stackId={stack ? "a" : undefined}
                                connectNulls={connectNulls}
                            />
                        ))}

                        {showLegend ? (
                            <Legend
                                verticalAlign="bottom"
                                height={legendHeight}
                                content={({ payload }) => ChartLegend({ payload }, categoryColors, setLegendHeight)}
                            />
                        ) : null}

                    </ReChartsAreaChart>
                ) : (
                    <div>...</div>
                )}
            </ResponsiveContainer>
        </div>
    )

})

AreaChart.displayName = "AreaChart"

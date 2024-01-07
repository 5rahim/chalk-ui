"use client"

import * as React from "react"
import { Bar, BarChart as ReChartsBarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { AxisDomain } from "recharts/types/util/types"
import { cn } from "../core/classnames"
import { ChartLegend } from "./chart-legend"
import { ChartTooltip } from "./chart-tooltip"
import { ColorPalette } from "./color-theme"
import { BaseChartProps } from "./types"
import { constructCategoryColors, defaultValueFormatter, getYAxisDomain } from "./utils"


/* -------------------------------------------------------------------------------------------------
 * BarChart
 * -----------------------------------------------------------------------------------------------*/

export interface BarChartProps extends React.ComponentPropsWithRef<"div">,
    BaseChartProps {
    /**
     * Display bars vertically or horizontally
     */
    layout?: "vertical" | "horizontal"
    /**
     * Stack bars
     */
    stack?: boolean
    /**
     * Display bars as a percentage of the total
     */
    relative?: boolean
}

export const BarChart: React.FC<BarChartProps> = React.forwardRef<HTMLDivElement, BarChartProps>((props, ref) => {

    const {
        children,
        className,
        layout = "horizontal",
        stack = false,
        relative = false,
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
        noDataText,
        ...rest
    } = props

    const [legendHeight, setLegendHeight] = React.useState(60)

    const categoryColors = constructCategoryColors(categories, colors)
    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue)

    return (
        <div
            className={cn("w-full h-80", className)}
            {...rest}
            ref={ref}
        >
            <ResponsiveContainer width="100%" height="100%">
                {data?.length ? (
                    <ReChartsBarChart
                        data={data}
                        stackOffset={relative ? "expand" : "none"}
                        layout={layout === "vertical" ? "vertical" : "horizontal"}
                    >
                        {showGridLines ? (
                            <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal={layout !== "vertical"}
                                vertical={layout === "vertical"}
                            />
                        ) : null}

                        {layout !== "vertical" ? (
                            <XAxis
                                hide={!showXAxis}
                                dataKey={index}
                                interval="preserveStartEnd"
                                tick={{ transform: "translate(0, 6)" }} // Padding between labels and axis
                                ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
                                style={{
                                    fontSize: "12px",
                                    fontFamily: "Inter; Helvetica",
                                    marginTop: "20px",
                                }}
                                tickLine={false}
                                axisLine={false}
                            />
                        ) : (
                            <XAxis
                                hide={!showXAxis}
                                type="number"
                                tick={{ transform: "translate(-3, 0)" }}
                                domain={yAxisDomain as AxisDomain}
                                style={{
                                    fontSize: "12px",
                                    fontFamily: "Inter; Helvetica",
                                }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={valueFormatter}
                                padding={{ left: 10, right: 10 }}
                                minTickGap={5}
                                allowDecimals={allowDecimals}
                            />
                        )}
                        {layout !== "vertical" ? (
                            <YAxis
                                width={yAxisWidth}
                                hide={!showYAxis}
                                axisLine={false}
                                tickLine={false}
                                type="number"
                                domain={yAxisDomain as AxisDomain}
                                tick={{ transform: "translate(-3, 0)" }}
                                style={{
                                    fontSize: "12px",
                                    fontFamily: "Inter; Helvetica",
                                }}
                                tickFormatter={
                                    relative ? (value: number) => `${(value * 100).toString()} %` : valueFormatter
                                }
                                allowDecimals={allowDecimals}
                            />
                        ) : (
                            <YAxis
                                width={yAxisWidth}
                                hide={!showYAxis}
                                dataKey={index}
                                axisLine={false}
                                tickLine={false}
                                ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
                                type="category"
                                interval="preserveStartEnd"
                                tick={{ transform: "translate(0, 6)" }}
                                style={{
                                    fontSize: "12px",
                                    fontFamily: "Inter; Helvetica",
                                }}
                            />
                        )}
                        {showTooltip ? (
                            <Tooltip
                                wrapperStyle={{ outline: "none" }}
                                isAnimationActive={false}
                                cursor={{ fill: "#d1d5db", opacity: "0.15" }}
                                content={({ active, payload, label }) => (
                                    <ChartTooltip
                                        active={active}
                                        payload={payload}
                                        label={label}
                                        valueFormatter={valueFormatter}
                                        categoryColors={categoryColors}
                                    />
                                )}
                                position={{ y: 0 }}
                            />
                        ) : null}

                        {categories.map((category) => (
                            <Bar
                                key={category}
                                name={category}
                                type="linear"
                                stackId={stack || relative ? "a" : undefined}
                                dataKey={category}
                                fill={`var(--${categoryColors.get(category)})`}
                                isAnimationActive={showAnimation}
                            />
                        ))}

                        {showLegend ? (
                            <Legend
                                verticalAlign="bottom"
                                height={legendHeight}
                                content={({ payload }) => ChartLegend({ payload }, categoryColors, setLegendHeight)}
                            />
                        ) : null}
                    </ReChartsBarChart>
                ) : (
                    <div>...</div>
                )}
            </ResponsiveContainer>
        </div>
    )

})

BarChart.displayName = "BarChart"

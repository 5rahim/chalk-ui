"use client"

import { ChartColor } from "./color-theme"
import * as React from "react"
import { Legend } from "./legend"

/* -------------------------------------------------------------------------------------------------
 * ChartLegend
 * -----------------------------------------------------------------------------------------------*/

export const ChartLegend = (
    { payload }: any,
    categoryColors: Map<string, ChartColor>,
    setLegendHeight: React.Dispatch<React.SetStateAction<number>>,
) => {
    const legendRef = React.useRef<HTMLDivElement>(null)

    const [windowSize, setWindowSize] = React.useState<undefined | number>(undefined)

    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
            const calculateHeight = (height: number | undefined) =>
                height ?
                    Number(height) + 20 // 20px extra padding
                    : 60 // default height
            setLegendHeight(calculateHeight(legendRef.current?.clientHeight))
        }
        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [windowSize])

    return (
        <div ref={legendRef} className="flex w-full items-center justify-center mt-4">
            <Legend
                categories={payload.map((entry: any) => entry.value)}
                colors={payload.map((entry: any) => categoryColors.get(entry.value))}
            />
        </div>
    )
}

ChartLegend.displayName = "ChartLegend"

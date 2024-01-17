import { AreaChart } from "@/workshop/charts"

const areaChartData = [
    {
        date: "Jan 25",
        "Trend 1": 2890,
        "Trend 2": 1560,
    },
    {
        date: "Feb 25",
        "Trend 1": 2756,
        "Trend 2": 1103,
    },
    {
        date: "Mar 25",
        "Trend 1": 3325,
        "Trend 2": 1194,
    },
    {
        date: "Apr 25",
        "Trend 1": 2500,
        "Trend 2": 1108,
    },
    {
        date: "May 25",
        "Trend 1": 3475,
        "Trend 2": 1812,
    },
    {
        date: "Jun 25",
        "Trend 1": 3129,
        "Trend 2": 1726,
    },
]

export default function AreaChartDemo() {
    return (
        <AreaChart
            className="h-80"
            data={areaChartData}
            index="date"
            categories={["Trend 1", "Trend 2"]}
            colors={["brand", "green"]}
            valueFormatter={(number: number) => {
                return "$ " + Intl.NumberFormat("us").format(number).toString()
            }}
            angledLabels
        />
    )
}

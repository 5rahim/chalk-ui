import { AreaChart } from "@/workshop/charts"

const areaChartData = [
    {
        date: "Jan 25",
        "Phone sales": 2890,
        "Tablet sales": 1560,
    },
    {
        date: "Feb 25",
        "Phone sales": 2756,
        "Tablet sales": 1103,
    },
    {
        date: "Mar 25",
        "Phone sales": 3325,
        "Tablet sales": 1194,
    },
    {
        date: "Apr 25",
        "Phone sales": 2500,
        "Tablet sales": 1108,
    },
    {
        date: "May 25",
        "Phone sales": 3475,
        "Tablet sales": 1812,
    },
    {
        date: "Jun 25",
        "Phone sales": 3129,
        "Tablet sales": 1726,
    },
]

export default function AreaChartDemo() {
    return (
        <AreaChart
            className="h-80 mt-4"
            data={areaChartData}
            index="date"
            categories={["Phone sales", "Tablet sales"]}
            colors={["brand", "green"]}
            valueFormatter={(number: number) => {
                return "$ " + Intl.NumberFormat("us").format(number).toString()
            }}
            angledLabels
        />
    )
}

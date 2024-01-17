import { BarChart } from "@/workshop/charts"

const barChartData = [
    {
        name: "Topic 1",
        "Reports": 2488,
    },
    {
        name: "Topic 2",
        "Reports": 1445,
    },
    {
        name: "Topic 3",
        "Reports": 743,
    },
    {
        name: "Topic 4",
        "Reports": 281,
    },
    {
        name: "Topic 5",
        "Reports": 251,
    },
    {
        name: "Topic 6",
        "Reports": 232,
    },
    {
        name: "Topic 7",
        "Reports": 98,
    },
]

export default function BarChartDemo() {
    return (
        <BarChart
            data={barChartData}
            index="name"
            categories={["Reports"]}
            colors={["green"]}
        />
    )
}

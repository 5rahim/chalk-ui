import { BarChart } from "@/workshop/charts"

const barChartData = [
    {
        topic: "Topic 1",
        "Group A": 890,
        "Group B": 338,
    },
    {
        topic: "Topic 2",
        "Group A": 289,
        "Group B": 233,
    },
    {
        topic: "Topic 3",
        "Group A": 253,
        "Group B": 333,
    },
    {
        topic: "Topic 4",
        "Group A": 133,
        "Group B": 533,
    },
    {
        topic: "Topic 5",
        "Group A": 333,
        "Group B": 133,
    }
]

export default function BarChartDemo() {
    return (
        <BarChart
            data={barChartData}
            index="topic"
            layout="vertical"
            categories={["Group A", "Group B"]}
        />
    )
}

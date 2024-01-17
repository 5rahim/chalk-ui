import { BarChart } from "@/workshop/charts"

const barChartData = [
    {
        topic: "Topic 1",
        "Group A": 890,
        "Group B": 338,
        "Group C": 538,
        "Group D": 396,
        "Group E": 138,
        "Group F": 436,
    },
    {
        topic: "Topic 2",
        "Group A": 289,
        "Group B": 233,
        "Group C": 253,
        "Group D": 333,
        "Group E": 133,
        "Group F": 533,
    },
]

export default function BarChartDemo() {
    return (
        <BarChart
            data={barChartData}
            index="topic"
            categories={[
                "Group A",
                "Group B",
                "Group C",
                "Group D",
                "Group E",
                "Group F",
            ]}
        />
    )
}

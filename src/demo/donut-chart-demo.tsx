import { DonutChart } from "@/workshop/charts"

const donutChartData = [
    {
        name: "Topic 1",
        sales: 9800,
    },
    {
        name: "Topic 2",
        sales: 4567,
    },
    {
        name: "Topic 3",
        sales: 3908,
    },
    {
        name: "Topic 4",
        sales: 2400,
    },
    {
        name: "Topic 5",
        sales: 1908,
    },
    {
        name: "Topic 6",
        sales: 1398,
    },
]

export default function DonutChartDemo() {
    return (
        <div className="flex gap-2 w-full">
            <DonutChart
                data={donutChartData}
                index="name"
                category="sales"
            />
            <DonutChart
                data={donutChartData}
                index="name"
                category="sales"
                variant="pie"
            />
        </div>
    )
}

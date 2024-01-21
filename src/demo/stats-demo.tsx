import { Stats } from "@/workshop/stats"
import { BiBarChart, BiLineChart, BiMouseAlt } from "react-icons/bi"

export default function StatsDemo() {
    return (
        <Stats
            className="w-full"
            items={[
                {
                    icon: <BiBarChart />,
                    name: "Total Subscribers",
                    value: "71,897",
                    unit: "70,946",
                    change: "12%",
                    trend: "up",
                },
                {
                    icon: <BiLineChart />,
                    name: "Avg. Open Rate",
                    value: "56.16%",
                    unit: "58.14%",
                    change: "2.02%",
                    trend: "down",
                },
                {
                    icon: <BiMouseAlt />,
                    name: "Avg. Click Rate",
                    value: "24.57%",
                },
            ]}
        />
    )
}

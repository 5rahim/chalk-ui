import type { Meta, StoryObj } from "@storybook/react"
import { BarChart } from "@/workshop/charts"

const barChartData2 = [
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

const barChartData3 = [
    {
        name: "Amphibians",
        "Number of threatened species": 2488,
    },
    {
        name: "Birds",
        "Number of threatened species": 1445,
    },
    {
        name: "Crustaceans",
        "Number of threatened species": 743,
    },
    {
        name: "Ferns",
        "Number of threatened species": 281,
    },
    {
        name: "Arachnids",
        "Number of threatened species": 251,
    },
    {
        name: "Corals",
        "Number of threatened species": 232,
    },
    {
        name: "Algae",
        "Number of threatened species": 98,
    },
];

const meta = {
    title: "Components/Data Display/BarChart",
    component: BarChart,
    tags: ["autodocs"],
    args: {
        className: "h-80 mt-6",
        yAxisWidth: 48,
    },
} satisfies Meta<typeof BarChart>


export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        data: barChartData3,
        index: "name",
        categories: ["Number of threatened species"],
    },
}

export const Vertical: Story = {
    args: {
        data: barChartData3,
        index: "name",
        layout: "vertical",
        categories: ["Number of threatened species"],
    },
}

export const Grouped: Story = {
    args: {
        data: barChartData2,
        index: "name",
        categories: [
            "Group A",
            "Group B",
            "Group C",
            "Group D",
            "Group E",
            "Group F",
        ],
    },
}

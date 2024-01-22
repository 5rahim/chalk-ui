import { LineChart } from "@/workshop/charts"
import { Badge } from "@/workshop/badge"
import { VerticalMenu } from "@/workshop/vertical-menu"
import React from "react"
import { BiBarChart, BiReceipt } from "react-icons/bi"

export const DemoNavigationItems = [
    {
        name: "Dashboard", isCurrent: true,
    },
    {
        name: "Team", isCurrent: false,
        content: <VerticalMenu
            items={[
                { name: "Company", href: "#", iconType: BiBarChart, isCurrent: false },
                { name: "Billing", href: "#", iconType: BiReceipt, isCurrent: false },
            ]}
        />,
    },
    {
        name: "Activity",
        href: "#",
        isCurrent: false,
        addon: <Badge intent="alert" className="ml-2" size="sm">5</Badge>,
    },
    { name: "Calendar", href: "#", isCurrent: false },
]

export const lineChartData = [
    {
        year: 1970,
        "Downward Trend": 2.04,
        "Upward Trend": 2.01,
    },
    {
        year: 1971,
        "Downward Trend": 1.96,
        "Upward Trend": 1.96,
    },
    {
        year: 1972,
        "Downward Trend": 1.96,
        "Upward Trend": 1.93,
    },
    {
        year: 1973,
        "Downward Trend": 1.93,
        "Upward Trend": 1.82,
    },
    {
        year: 1974,
        "Downward Trend": 1.82,
        "Upward Trend": 1.95,
    },
    {
        year: 1975,
        "Downward Trend": 1.95,
        "Upward Trend": 1.67,
    },
    {
        year: 1976,
        "Downward Trend": 1.67,
        "Upward Trend": 1.58,
    },
    {
        year: 1977,
        "Downward Trend": 2.01,
        "Upward Trend": 1.53,
    },
    {
        year: 1978,
        "Downward Trend": 1.92 + Math.random() * 0.5,
        "Upward Trend": 1.62 - Math.random() * 0.5,
    },
    {
        year: 1979,
        "Downward Trend": 1.82 + Math.random() * 0.5,
        "Upward Trend": 1.75 - Math.random() * 0.5,
    },
    {
        year: 1980,
        "Downward Trend": 1.75 + Math.random() * 0.5,
        "Upward Trend": 1.81 - Math.random() * 0.5,
    },
    {
        year: 1981,
        "Downward Trend": 1.69 + Math.random() * 0.5,
        "Upward Trend": 1.87 - Math.random() * 0.5,
    },
    {
        year: 1982,
        "Downward Trend": 1.63 + Math.random() * 0.5,
        "Upward Trend": 1.92 - Math.random() * 0.5,
    },
    {
        year: 1983,
        "Downward Trend": 1.56 + Math.random() * 0.5,
        "Upward Trend": 1.97 - Math.random() * 0.5,
    },
    {
        year: 1984,
        "Downward Trend": 1.50 + Math.random() * 0.5,
        "Upward Trend": 2.03 - Math.random() * 0.5,
    },
    {
        year: 1985,
        "Downward Trend": 1.44 + Math.random() * 0.5,
        "Upward Trend": 2.08 - Math.random() * 0.5,
    },
    {
        year: 1986,
        "Downward Trend": 1.37 + Math.random() * 0.5,
        "Upward Trend": 2.13 - Math.random() * 0.5,
    },
    {
        year: 1987,
        "Downward Trend": 1.31 + Math.random() * 0.5,
        "Upward Trend": 2.18 - Math.random() * 0.5,
    },
    {
        year: 1988,
        "Downward Trend": 1.25 + Math.random() * 0.5,
        "Upward Trend": 2.24 - Math.random() * 0.5,
    },
    {
        year: 1989,
        "Downward Trend": 1.19 + Math.random() * 0.5,
        "Upward Trend": 2.29 - Math.random() * 0.5,
    },
    {
        year: 1990,
        "Downward Trend": 1.13 + Math.random() * 0.5,
        "Upward Trend": 2.34 - Math.random() * 0.5,
    },
    {
        year: 1991,
        "Downward Trend": 1.07 + Math.random() * 0.5,
        "Upward Trend": 2.39 - Math.random() * 0.5,
    },
    {
        year: 1992,
        "Downward Trend": 1.01 + Math.random() * 0.5,
        "Upward Trend": 2.45 - Math.random() * 0.5,
    },
    {
        year: 1993,
        "Downward Trend": 0.95 + Math.random() * 0.5,
        "Upward Trend": 2.50 - Math.random() * 0.5,
    },
    {
        year: 1994,
        "Downward Trend": 0.89 + Math.random() * 0.5,
        "Upward Trend": 2.55 - Math.random() * 0.5,
    },
    {
        year: 1995,
        "Downward Trend": 0.83 + Math.random() * 0.5,
        "Upward Trend": 2.61 - Math.random() * 0.5,
    },
    {
        year: 1996,
        "Downward Trend": 0.77 + Math.random() * 0.5,
        "Upward Trend": 2.66 - Math.random() * 0.5,
    },
    {
        year: 1997,
        "Downward Trend": 0.71 + Math.random() * 0.5,
        "Upward Trend": 2.71 - Math.random() * 0.5,
    },
    {
        year: 1998,
        "Downward Trend": 0.65 + Math.random() * 0.5,
        "Upward Trend": 2.76 - Math.random() * 0.5,
    },
    {
        year: 1999,
        "Downward Trend": 0.59 + Math.random() * 0.5,
        "Upward Trend": 2.82 - Math.random() * 0.5,
    },
    {
        year: 2000,
        "Downward Trend": 0.53 + Math.random() * 0.5,
        "Upward Trend": 2.87 - Math.random() * 0.5,
    },
    {
        year: 2001,
        "Downward Trend": 0.47 + Math.random() * 0.5,
        "Upward Trend": 2.92 - Math.random() * 0.5,
    },
    {
        year: 2002,
        "Downward Trend": 0.41 + Math.random() * 0.5,
        "Upward Trend": 2.98 - Math.random() * 0.5,
    },
    {
        year: 2003,
        "Downward Trend": 0.35 + Math.random() * 0.5,
        "Upward Trend": 3.03 - Math.random() * 0.5,
    },
    {
        year: 2004,
        "Downward Trend": 0.29 + Math.random() * 0.5,
        "Upward Trend": 3.08 - Math.random() * 0.5,
    },
    {
        year: 2005,
        "Downward Trend": 0.23 + Math.random() * 0.5,
        "Upward Trend": 3.14 - Math.random() * 0.5,
    },
    {
        year: 2006,
        "Downward Trend": 0.17 + Math.random() * 0.5,
        "Upward Trend": 3.19 - Math.random() * 0.5,
    },
    {
        year: 2007,
        "Downward Trend": 0.11 + Math.random() * 0.5,
        "Upward Trend": 3.24 - Math.random() * 0.5,
    },
    {
        year: 2008,
        "Downward Trend": 0.05 + Math.random() * 0.5,
        "Upward Trend": 3.29 - Math.random() * 0.5,
    },
    {
        year: 2009,
        "Downward Trend": -0.01 + Math.random() * 0.5,
        "Upward Trend": 3.35 - Math.random() * 0.5,
    },
    {
        year: 2010,
        "Downward Trend": -0.07 + Math.random() * 0.5,
        "Upward Trend": 3.40 - Math.random() * 0.5,
    },
    {
        year: 2011,
        "Downward Trend": -0.13 + Math.random() * 0.5,
        "Upward Trend": 3.45 - Math.random() * 0.5,
    },
    {
        year: 2012,
        "Downward Trend": -0.19 + Math.random() * 0.5,
        "Upward Trend": 3.51 - Math.random() * 0.5,
    },
    {
        year: 2013,
        "Downward Trend": -0.25 + Math.random() * 0.5,
        "Upward Trend": 3.56 - Math.random() * 0.5,
    },
    {
        year: 2014,
        "Downward Trend": -0.31 + Math.random() * 0.5,
        "Upward Trend": 3.61 - Math.random() * 0.5,
    },
    {
        year: 2015,
        "Downward Trend": -0.37 + Math.random() * 0.5,
        "Upward Trend": 3.61 - Math.random() * 0.5,
    },
]

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

export const citiesDemoData = [
    {
        name: "New York",
        sales: 9800,
    },
    {
        name: "Minneapolis",
        sales: 4567,
    },
    {
        name: "Baltimore",
        sales: 3908,
    },
    {
        name: "San Francisco",
        sales: 2400,
    },
    {
        name: "Austin",
        sales: 1908,
    },
    {
        name: "Seattle",
        sales: 1398,
    },
]

export const DemoLineChart = () => <LineChart
    className="h-64 mt-6"
    data={lineChartData}
    index="year"
    categories={["Upward Trend", "Downward Trend"]}
    colors={["green", "gray"]}
    yAxisWidth={40}
/>

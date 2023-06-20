import { BiBarChart } from "@react-icons/all-files/bi/BiBarChart"
import { BiReceipt } from "@react-icons/all-files/bi/BiReceipt"
import React from "react"
import { Navbar } from "./ui/navbar"
import { HorizontalNav } from "./ui/horizontal-nav"
import { DropdownMenu } from "./ui/dropdown-menu"
import { Avatar, AvatarShowcase } from "./ui/avatar"
import { VerticalNav } from "./ui/vertical-nav"
import { Badge } from "./ui/badge"
import { NavigationTabs } from "./ui/tabs"
import { AreaChart, BarChart, DonutChart, LineChart } from "./ui/charts"

export const DemoNavigationItems = [
    {
        name: "Dashboard", isCurrent: true,
    },
    {
        name: "Team", isCurrent: false,
        content: <VerticalNav
            items={[
                { name: "Company", href: "#", icon: BiBarChart, isCurrent: false },
                { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
            ]}
        />
    },
    {
        name: "Activity",
        href: "#",
        isCurrent: false,
        addon: <Badge className="ml-2" size="sm">5</Badge>
    },
    { name: "Calendar", href: "#", isCurrent: false },
]

export const DemoNavbar = () => (
    <Navbar className={""}>
        <Navbar.Layout>
            <Navbar.Navigation>
                <div className="font-black uppercase">Logo</div>
                <HorizontalNav
                    switchToDrawerBelow={"lg"}
                    items={DemoNavigationItems}
                />
            </Navbar.Navigation>
            <DropdownMenu
                trigger={<AvatarShowcase
                    avatar={<Avatar size="xs"/>} name={"John Doe"}
                    className="cursor-pointer p-1 sm:pr-3 rounded-full hover:bg-[--highlight]"
                    nameClassName={"text-sm font-semibold text-[--muted] group-hover:text-[--text-color]"}
                    detailsContainerClassName={"hidden sm:block"}
                />}
                mobilePlacement={"top"}
            >
                <DropdownMenu.Item>My account</DropdownMenu.Item>
                <DropdownMenu.Item>Sign out</DropdownMenu.Item>
            </DropdownMenu>
        </Navbar.Layout>
    </Navbar>
)

export const DemoNavigationTabs = () => (
    <NavigationTabs
        navClassName={"border-b border-[--border]"}
        items={[
            { name: "My Account", href: "#", icon: null, isCurrent: false },
            { name: "Company", href: "#", icon: null, isCurrent: false },
            { name: "Team Members", href: "#", icon: null, isCurrent: true },
            { name: "Billing", href: "#", icon: BiReceipt, isCurrent: false },
        ]}
    />
)


interface ChartTestProps {
    children?: React.ReactNode
}

const areaChartData = [
    {
        date: "Jan 25",
        SemiAnalysis: 2890,
        "The Pragmatic Engineer": 2338,
    },
    {
        date: "Feb 25",
        SemiAnalysis: 2756,
        "The Pragmatic Engineer": 2103,
    },
    {
        date: "Mar 25",
        SemiAnalysis: 3325,
        "The Pragmatic Engineer": 2194,
    },
    {
        date: "Apr 25",
        SemiAnalysis: 2500,
        "The Pragmatic Engineer": 2108,
    },
    {
        date: "May 25",
        SemiAnalysis: 3475,
        "The Pragmatic Engineer": 1812,
    },
    {
        date: "Jun 25",
        SemiAnalysis: 3129,
        "The Pragmatic Engineer": 1726,
    },
]

const barChartData = [
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
]

const lineChartData = [
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
    // Add more years as needed
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

const cities = [
    {
        name: "New York",
        sales: 9800,
    },
    {
        name: "London",
        sales: 4567,
    },
    {
        name: "Hong Kong",
        sales: 3908,
    },
    {
        name: "San Francisco",
        sales: 2400,
    },
    {
        name: "Singapore",
        sales: 1908,
    },
    {
        name: "Zurich",
        sales: 1398,
    },
]

export const DemoLineChart = () => <LineChart
    className="h-80 mt-6"
    data={lineChartData}
    index="year"
    categories={["Upward Trend", "Downward Trend"]}
    colors={["green", "yellow"]}
    yAxisWidth={40}
/>

export const ChartTest: React.FC<ChartTestProps> = (props) => {

    const { children, ...rest } = props

    return (
        <>
            <div className={"container max-w-5xl mt-10 space-y-2"}>
                <h2>Charts</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi consectetur harum illo incidunt maxime omnis optio
                    rerum sunt vitae! Alias aut blanditiis distinctio eligendi harum ipsum iure, iusto vel.
                </p>

                <DonutChart
                    className="mt-6"
                    data={cities}
                    category="sales"
                    index="name"
                    valueFormatter={(number: number) => {
                        return "$ " + Intl.NumberFormat("us").format(number).toString()
                    }}
                    colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                />

                <LineChart
                    className="h-80 mt-6"
                    data={lineChartData}
                    index="year"
                    categories={["Upward Trend", "Downward Trend"]}
                    colors={["green", "yellow"]}
                    yAxisWidth={40}
                />
                <AreaChart
                    className="h-80 mt-4"
                    data={areaChartData}
                    index="date"
                    categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                    colors={["brand", "orange"]}
                    valueFormatter={(number: number) => {
                        return "$ " + Intl.NumberFormat("us").format(number).toString()
                    }}
                />
                <BarChart
                    className="h-80 mt-6"
                    data={barChartData}
                    index="name"
                    categories={["Number of threatened species"]}
                    colors={["brand"]}
                    yAxisWidth={48}
                />
                <BarChart
                    className="h-80 mt-6"
                    data={barChartData2}
                    index="name"
                    categories={[
                        "Group A",
                        "Group B",
                        "Group C",
                        "Group D",
                        "Group E",
                        "Group F",
                    ]}
                    yAxisWidth={48}
                />
            </div>
        </>
    )

}

import { LineChart } from "@/workshop/charts"

export default function LineChartDemo() {
    return (
        <LineChart
            className="h-80"
            data={lineChartData}
            index="year"
            categories={["Trend 1", "Trend 2"]}
            colors={["brand", "green"]}
            valueFormatter={(number: number) => {
                return number.toFixed(2)
            }}
        />
    )
}

const lineChartData = [
    {
        year: 1970,
        "Trend 1": 2.04,
        "Trend 2": 2.01,
    },
    {
        year: 1971,
        "Trend 1": 1.96,
        "Trend 2": 1.96,
    },
    {
        year: 1972,
        "Trend 1": 1.96,
        "Trend 2": 1.93,
    },
    {
        year: 1973,
        "Trend 1": 1.93,
        "Trend 2": 1.82,
    },
    {
        year: 1974,
        "Trend 1": 1.82,
        "Trend 2": 1.95,
    },
    {
        year: 1975,
        "Trend 1": 1.95,
        "Trend 2": 1.67,
    },
    {
        year: 1976,
        "Trend 1": 1.67,
        "Trend 2": 1.58,
    },
    {
        year: 1977,
        "Trend 1": 2.01,
        "Trend 2": 1.53,
    },
    {
        year: 1978,
        "Trend 1": 1.92 + Math.random() * 0.5,
        "Trend 2": 1.62 - Math.random() * 0.5,
    },
    {
        year: 1979,
        "Trend 1": 1.82 + Math.random() * 0.5,
        "Trend 2": 1.75 - Math.random() * 0.5,
    },
    {
        year: 1980,
        "Trend 1": 1.75 + Math.random() * 0.5,
        "Trend 2": 1.81 - Math.random() * 0.5,
    },
    {
        year: 1981,
        "Trend 1": 1.69 + Math.random() * 0.5,
        "Trend 2": 1.87 - Math.random() * 0.5,
    },
    {
        year: 1982,
        "Trend 1": 1.63 + Math.random() * 0.5,
        "Trend 2": 1.92 - Math.random() * 0.5,
    },
    {
        year: 1983,
        "Trend 1": 1.56 + Math.random() * 0.5,
        "Trend 2": 1.97 - Math.random() * 0.5,
    },
    {
        year: 1984,
        "Trend 1": 1.50 + Math.random() * 0.5,
        "Trend 2": 2.03 - Math.random() * 0.5,
    },
    {
        year: 1985,
        "Trend 1": 1.44 + Math.random() * 0.5,
        "Trend 2": 2.08 - Math.random() * 0.5,
    },
    {
        year: 1986,
        "Trend 1": 1.37 + Math.random() * 0.5,
        "Trend 2": 2.13 - Math.random() * 0.5,
    },
    {
        year: 1987,
        "Trend 1": 1.31 + Math.random() * 0.5,
        "Trend 2": 2.18 - Math.random() * 0.5,
    },
    {
        year: 1988,
        "Trend 1": 1.25 + Math.random() * 0.5,
        "Trend 2": 2.24 - Math.random() * 0.5,
    },
    {
        year: 1989,
        "Trend 1": 1.19 + Math.random() * 0.5,
        "Trend 2": 2.29 - Math.random() * 0.5,
    },
    {
        year: 1990,
        "Trend 1": 1.13 + Math.random() * 0.5,
        "Trend 2": 2.34 - Math.random() * 0.5,
    },
    {
        year: 1991,
        "Trend 1": 1.07 + Math.random() * 0.5,
        "Trend 2": 2.39 - Math.random() * 0.5,
    },
    {
        year: 1992,
        "Trend 1": 1.01 + Math.random() * 0.5,
        "Trend 2": 2.45 - Math.random() * 0.5,
    },
    {
        year: 1993,
        "Trend 1": 0.95 + Math.random() * 0.5,
        "Trend 2": 2.50 - Math.random() * 0.5,
    },
    {
        year: 1994,
        "Trend 1": 0.89 + Math.random() * 0.5,
        "Trend 2": 2.55 - Math.random() * 0.5,
    },
    {
        year: 1995,
        "Trend 1": 0.83 + Math.random() * 0.5,
        "Trend 2": 2.61 - Math.random() * 0.5,
    },
    {
        year: 1996,
        "Trend 1": 0.77 + Math.random() * 0.5,
        "Trend 2": 2.66 - Math.random() * 0.5,
    },
    {
        year: 1997,
        "Trend 1": 0.71 + Math.random() * 0.5,
        "Trend 2": 2.71 - Math.random() * 0.5,
    },
    {
        year: 1998,
        "Trend 1": 0.65 + Math.random() * 0.5,
        "Trend 2": 2.76 - Math.random() * 0.5,
    },
    {
        year: 1999,
        "Trend 1": 0.59 + Math.random() * 0.5,
        "Trend 2": 2.82 - Math.random() * 0.5,
    },
    {
        year: 2000,
        "Trend 1": 0.53 + Math.random() * 0.5,
        "Trend 2": 2.87 - Math.random() * 0.5,
    },
    {
        year: 2001,
        "Trend 1": 0.47 + Math.random() * 0.5,
        "Trend 2": 2.92 - Math.random() * 0.5,
    },
    {
        year: 2002,
        "Trend 1": 0.41 + Math.random() * 0.5,
        "Trend 2": 2.98 - Math.random() * 0.5,
    },
    {
        year: 2003,
        "Trend 1": 0.35 + Math.random() * 0.5,
        "Trend 2": 3.03 - Math.random() * 0.5,
    },
    {
        year: 2004,
        "Trend 1": 0.29 + Math.random() * 0.5,
        "Trend 2": 3.08 - Math.random() * 0.5,
    },
    {
        year: 2005,
        "Trend 1": 0.23 + Math.random() * 0.5,
        "Trend 2": 3.14 - Math.random() * 0.5,
    },
    {
        year: 2006,
        "Trend 1": 0.17 + Math.random() * 0.5,
        "Trend 2": 3.19 - Math.random() * 0.5,
    },
    {
        year: 2007,
        "Trend 1": 0.11 + Math.random() * 0.5,
        "Trend 2": 3.24 - Math.random() * 0.5,
    },
    {
        year: 2008,
        "Trend 1": 0.05 + Math.random() * 0.5,
        "Trend 2": 3.29 - Math.random() * 0.5,
    },
    {
        year: 2009,
        "Trend 1": -0.01 + Math.random() * 0.5,
        "Trend 2": 3.35 - Math.random() * 0.5,
    },
    {
        year: 2010,
        "Trend 1": -0.07 + Math.random() * 0.5,
        "Trend 2": 3.40 - Math.random() * 0.5,
    },
    {
        year: 2011,
        "Trend 1": -0.13 + Math.random() * 0.5,
        "Trend 2": 3.45 - Math.random() * 0.5,
    },
    {
        year: 2012,
        "Trend 1": -0.19 + Math.random() * 0.5,
        "Trend 2": 3.51 - Math.random() * 0.5,
    },
    {
        year: 2013,
        "Trend 1": -0.25 + Math.random() * 0.5,
        "Trend 2": 3.56 - Math.random() * 0.5,
    },
    {
        year: 2014,
        "Trend 1": -0.31 + Math.random() * 0.5,
        "Trend 2": 3.61 - Math.random() * 0.5,
    },
    {
        year: 2015,
        "Trend 1": -0.37 + Math.random() * 0.5,
        "Trend 2": 3.61 - Math.random() * 0.5,
    },
]

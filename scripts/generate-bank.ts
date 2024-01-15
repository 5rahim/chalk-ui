import { promises as fs } from "fs"
import path from "path"
import _jsonBank from "../cli/bank/bank.json"
import { DirectoryData } from "./snapshot"

let jsonBank = _jsonBank as DirectoryData[]

const specialDivisions = [
    {
        name: "button",
        parts: [
            ["Button", "button"],
            ["Close Button", "close-button"],
            ["Icon Button", "icon-button"],
        ],
    },
    {
        name: "checkbox",
        parts: [
            ["Checkbox", "checkbox"],
            ["CheckboxGroup", "checkbox-group"],
        ],
    },
    {
        name: "charts",
        parts: [
            ["BarChart", "bar-chart"],
            ["LineChart", "line-chart"],
            ["AreaChart", "area-chart"],
            ["DonutChart", "donut-chart"],
        ],
    },
    {
        name: "loading-spinner",
        parts: [
            ["Loading Spinner", "loading-spinner"],
            ["Loading Overlay", "loading-overlay"],
        ],
    },
    {
        name: "date-picker",
        parts: [
            ["Date Picker", "date-picker"],
            ["Date Range Picker", "date-range-picker"],
        ],
    },
]

export async function createSnapshot() {

    let output = `// @ts-nocheck
import * as React from "react"

export type Bank = {
    [name: string]: {
        name: string,
        component: React.LazyExoticComponent<any>
        files: string[]
    }
}

export const Bank: Bank = {`

    for (const division of specialDivisions) {
        let componentData = jsonBank.find(component => component.component === division.name)
        if (!componentData) {
            continue
        }
        jsonBank = jsonBank.filter(component => component.component !== division.name)
        for (const part of division.parts) {
            output += `
    "${part[1]}": {
        name: "${part[1]}",
        component: React.lazy(() => import("@/workshop/${division.name}/${part[1]}")),
        family: [${componentData.family.map(family => `"${family}"`).join(", ")}],
        files: [${componentData.files.map(file => `"src/workshop/${componentData?.component}/${file.name}"`).join(", ")}],
    },`
        }
    }

    for (const component of jsonBank) {


        if (component.component === "core"
            || component.component === "input"
            || component.component === "basic-field") {
            continue
        }

        output += `
    "${component.component}": {
        name: "${component.component}",
        component: React.lazy(() => import("@/workshop/${component.component}/${component.component}")),
        family: [${component.family.map(family => `"${family}"`).join(", ")}],
        files: [${component.files.map(file => `"src/workshop/${component.component}/${file.name}"`).join(", ")}],
    },`
    }

    /**
     * Demos
     */

    const demoSrc = path.resolve("src/demo")
    const files = await fs.readdir(demoSrc, { recursive: true, withFileTypes: true })
    const demos = files.filter(file => file.name.includes("-demo")).map(file => ({
        name: file.name.replace(".tsx", ""),
        path: file.path.replace(demoSrc, "").replace(/\\/g, "/") + "/" + file.name,
    }))

    for (const demo of demos) {
        output += `
    "${demo.name}": {
        name: "${demo.name}",
        component: React.lazy(() => import("@/demo${demo.path.replace(".tsx", "")}")),
        family: [],
        files: ["src/demo${demo.path}"],
    },`
    }

    output += `
}`

    /**
     * Write to file
     */

    const timestamp = new Date().toISOString().replace(/:/g, "-")
    const snapshotFilename = `bank_${timestamp}.ts`

    await fs.writeFile(path.resolve(`src/bank/index.ts`), output, { encoding: "utf-8" })


}

(async () => {
    await createSnapshot()
})()

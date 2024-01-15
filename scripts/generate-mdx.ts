/**
 * Unused
 */
import { Bank } from "@/bank"
import { promises as fs } from "fs"
import startCase from "lodash/startCase"
import { pascalCase } from "pascal-case"
import path from "path"

const ignore = [
    "button",
    "accordion",
    "alert",
]

async function createFiles() {

    for (const obj of Object.values(Bank)) {

        if (obj.name.includes("-demo") || ignore.includes(obj.name)) {
            continue
        }

        let output = ``
        output += `---
title: ${startCase(obj.name)}
description: Description
componentName: ${obj.name}
---

<ComponentPreview name="${obj.name}-demo" />

\`\`\`bash
npx @rahimstack@latest add ${obj.name}
\`\`\`

<ComponentAnatomy name="${obj.name}" />
`

        const dest = path.resolve(`src/mdx/docs/components/test/${obj.name}.mdx`)
        try {
            await fs.mkdir(path.dirname(dest), { recursive: true })
        }
        catch (e) {

        }
        await fs.writeFile(dest, output, { encoding: "utf-8" })

    }


}

async function createDemoFiles() {

    for (const obj of Object.values(Bank)) {

        if (obj.name.includes("-demo") || ignore.includes(obj.name)) {
            continue
        }

        let output = `export default function ${pascalCase(obj.name)}Demo() {
    return (
        <></>
    )
}
        `

        const dest = path.resolve(`src/demo/${obj.name}-demo.tsx`)
        try {
            await fs.mkdir(path.dirname(dest), { recursive: true })
        }
        catch (e) {

        }
        await fs.writeFile(dest, output, { encoding: "utf-8" })

    }


}

(async () => {
    await createDemoFiles()
})()

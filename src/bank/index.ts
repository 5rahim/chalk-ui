import * as React from "react"

export type Bank = {
    [name: string]: {
        name: string,
        component: React.LazyExoticComponent<any>
        files: string[]
    }
}

export const Bank: Bank = {
    "button-demo": {
        name: "button",
        component: React.lazy(() => import("@/demo/button-demo")),
        files: ["src/demo/button-demo.tsx"],
    },
}

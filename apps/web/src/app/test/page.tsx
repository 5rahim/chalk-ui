import dynamic from "next/dynamic"
import { UITest_Sidebar } from "@/app/test/UITest_Sidebar"
// import { ChartTest } from "@/app/test/ChartTest"

const DarkModeToggle = dynamic(() => import("@/components/DarkModeToggle"), { ssr: false })

export default async function Page({ params: { lng } }: { params: { lng: string } }) {

    return (
        <div>

            <UITest_Sidebar/>

            {/*<ClientTest/>*/}
            {/*<ChartTest/>*/}

            {/* @ts-expect-error */}
            <DarkModeToggle/>

        </div>
    )
}

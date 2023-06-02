// import { ClientTest } from "./ClientTest"
import { UITest } from "./UITest"
import dynamic from "next/dynamic"
// import { ChartTest } from "@/app/test/ChartTest"

const DarkModeToggle = dynamic(() => import("@/components/DarkModeToggle"), { ssr: false })
export default async function Page({ params: { lng } }: { params: { lng: string } }) {

    return (
        <>

            <UITest/>

            {/*<ChartTest/>*/}

            {/*<ClientTest/>*/}

            <DarkModeToggle/>

        </>
    )
}

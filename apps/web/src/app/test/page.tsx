// import { ClientTest } from "./ClientTest"
import dynamic from "next/dynamic"
import { ChartTest } from "@/app/test/ChartTest"

const DarkModeToggle = dynamic(() => import("@/components/DarkModeToggle"), { ssr: false })
export default async function Page({ params: { lng } }: { params: { lng: string } }) {

    return (
        <>

            <ChartTest/>

            {/*<ClientTest/>*/}

            <DarkModeToggle/>

        </>
    )
}

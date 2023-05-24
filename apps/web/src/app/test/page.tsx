import { ClientTest } from "./ClientTest"
import dynamic from "next/dynamic"

const DarkModeToggle = dynamic(() => import("@/components/DarkModeToggle"), { ssr: false })
export default async function Page({ params: { lng } }: { params: { lng: string } }) {

    return (
        <>
            <div className="container max-w-5xl">
                <ClientTest/>
            </div>

            <DarkModeToggle/>

        </>
    )
}

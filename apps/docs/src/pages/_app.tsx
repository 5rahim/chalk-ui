import type {AppProps} from "next/app"
import "../../styles.css"
import "../styles/globals.css"
import {UIProvider} from "@/components/ui/core/style-provider"
import {ToastProvider} from "@/components/ui/toast"

export default function MyApp({ Component, pageProps }: AppProps) {

    return (
        <UIProvider>
            <Component {...pageProps} />
            <ToastProvider/>
        </UIProvider>
    )
}

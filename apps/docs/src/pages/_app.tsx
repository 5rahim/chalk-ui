import type { AppProps } from "next/app"
import { UIProvider } from "ui"
import "../../styles.css"
import "../styles/globals.css"

export default function MyApp({ Component, pageProps }: AppProps) {
   
   return (
      <UIProvider>
         <Component {...pageProps} />
      </UIProvider>
   )
}

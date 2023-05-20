import type { AppProps } from "next/app"
import { customizeStyleLibrary, UIProvider } from "ui"
import "../../styles.css"
import "../styles/globals.css"

export default function MyApp({ Component, pageProps }: AppProps) {
   
   return (
      <UIProvider
         styleLibrary={customizeStyleLibrary(({ extendAnatomy, part }) => ({
            Switch: extendAnatomy("Switch", {
               label: part("relative font-medium data-disabled:text-gray-300"),
            }),
         }))}
      >
         <Component {...pageProps} />
      </UIProvider>
   )
}

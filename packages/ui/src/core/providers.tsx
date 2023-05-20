import React from "react"
import { SSRProvider } from "react-aria"
import type { UIStyleLibrary } from "./style-library"
import { StyleLibrary } from "./style-library"

// ------------------------------------------------------------------------------------------------------------------ //

/**
 * @internal UI Folder scope
 */
const __StyleLibraryContext = React.createContext(StyleLibrary)

type Lng = "fr" | "en" // DEVNOTE Add new lang keywords to maintain type safety
type UILocaleConfig = {
   locale: Lng,
   countryLocale: string,
   country: string
}
const __LocaleConfigDefaultValue: UILocaleConfig = { locale: "en", countryLocale: "en-US", country: "us" }

/**
 * @internal UI Folder scope
 */
const __LocaleContext = React.createContext<UILocaleConfig>(__LocaleConfigDefaultValue)

/**
 * @internal UI Folder scope
 */
export const useStyleLibrary = (): UIStyleLibrary => {
   return React.useContext(__StyleLibraryContext)
}

/**
 * @internal UI Folder scope
 */
export const useUILocaleConfig = (): UILocaleConfig => {
   return React.useContext(__LocaleContext)
}

// ------------------------------------------------------------------------------------------------------------------ //

export interface UIProviderProps {
   children?: React.ReactNode
   config?: {
      locale?: Lng,
      countryLocale?: string,
      country?: string
   },
   styleLibrary?: UIStyleLibrary,
}

/**
 * @example
 * <UIProvider config={{ locale: 'en', countryLocale: 'en-US', country: 'us' }}>
 *    <App/>
 * </UIProvider>
 * @param children
 * @param config
 * @param styleLibrary
 * @constructor
 */
export const UIProvider: React.FC<UIProviderProps> = ({ children, config, styleLibrary }) => {
   
   let localeConfig: UILocaleConfig = {
      ...__LocaleConfigDefaultValue,
      ...config,
   }
   
   return (
      <__LocaleContext.Provider value={localeConfig}>
         <SSRProvider>
            <__StyleLibraryContext.Provider value={styleLibrary ?? StyleLibrary}>
               {children}
            </__StyleLibraryContext.Provider>
         </SSRProvider>
      </__LocaleContext.Provider>
   )
}

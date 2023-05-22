"use client"
import React from "react"
import { SSRProvider } from "react-aria"

// ------------------------------------------------------------------------------------------------------------------ //

/**
 * @internal UI Folder scope
 */
type Lng = "fr" | "en" // DEVNOTE Add new lang keywords to maintain type safety
type UILocaleConfig = {
   locale: Lng,
   countryLocale: string,
   country: string
}
const __LocaleConfigDefaultValue: UILocaleConfig = { locale: "en", countryLocale: "en-US", country: "us" }
const __LocaleConfigContext = React.createContext<UILocaleConfig>(__LocaleConfigDefaultValue)

/**
 * @internal UI Folder scope
 */
export const useUILocaleConfig = (): UILocaleConfig => {
   return React.useContext(__LocaleConfigContext)
}

useUILocaleConfig.displayName = "useUILocaleConfig"

// ------------------------------------------------------------------------------------------------------------------ //

export interface UIProviderProps {
   children?: React.ReactNode
   config?: {
      locale?: Lng,
      countryLocale?: string,
      country?: string
   },
}

/**
 * @example
 * <UIProvider config={{ locale: 'en', countryLocale: 'en-US', country: 'us' }}>
 *    <App/>
 * </UIProvider>
 * @param children
 * @param config
 * @constructor
 */
export const UIProvider: React.FC<UIProviderProps> = ({ children, config }) => {
   
   let localeConfig: UILocaleConfig = {
      ...__LocaleConfigDefaultValue,
      ...config,
   }
   
   return (
      <__LocaleConfigContext.Provider value={localeConfig}>
         <SSRProvider>
            {children}
         </SSRProvider>
      </__LocaleConfigContext.Provider>
   )
}

UIProvider.displayName = "UIProvider"

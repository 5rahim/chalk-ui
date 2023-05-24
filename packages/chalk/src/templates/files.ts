export const STYLES = `@tailwind base;
@tailwind components;
@tailwind utilities;`

// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //

export const TAILWIND_CONFIG = `const {colors} = require("tailwindcss/colors")
const {fontFamily} = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        "src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        data: {
            checked: 'checked',
            selected: 'selected',
            disabled: 'disabled',
            highlighted: 'highlighted',
        },
        extend: {
            boxShadow: {
                'md': '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            },
            fontFamily: {
                sans: ["var(--font-inter)", ...fontFamily.sans],
            },
            colors: {
                ...colors,
                brand: {
                    50: '#f2f0ff',
                    100: '#eeebff',
                    200: '#d4d0ff',
                    300: '#c7c2ff',
                    400: '#9f92ff',
                    500: '#6152df',
                    600: '#5243cb',
                    700: '#3f2eb2',
                    800: '#312887',
                    900: "#231c6b",
                    DEFAULT: "#6152df",
                },
                green: {
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    200: '#A7F3D0',
                    300: '#6EE7B7',
                    400: '#34D399',
                    500: '#10B981',
                    600: '#059669',
                    700: '#047857',
                    800: '#065F46',
                    900: "#064E3B",
                    DEFAULT: "#10B981",
                },
                gray: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#E5E5E5',
                    300: '#D4D4D4',
                    400: '#A3A3A3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: "#171717",
                    DEFAULT: "#737373",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
}`

// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //

export const CORE_STYLE_ANATOMY = `import { cva } from "class-variance-authority"

/**
 * @internal UI Folder scope
 */
export type Anatomy = { [key: string]: ReturnType<typeof cva> }
/**
 * @internal
 */
export type AnatomyClassNames<T extends Anatomy> = {
   [K in keyof T as \`\${string & K}ClassName\`]?: string
}

/**
 * @internal UI Folder scope
 * @example
 * const ComponentAnatomy = defineStyleAnatomy({
 *    label: cva(null, {
 *       variants: {
 *          intent: {
 *             "success": "",
 *             "alert": "",
 *          },
 *       },
 *    }),
 *    ...
 * })
 *
 * type ComponentProps = ComponentWithAnatomy<typeof ComponentAnatomy>
 *
 * // const { controlClassName, ...rest }: ComponentProps = props
 * <div className={cn(ComponentAnatomy.control({ intent: "success" }, controlClassName))} />
 * @param config
 */
export function defineStyleAnatomy<A extends Anatomy = Anatomy>(config: A) {
   return config
}

/**
 * @internal UI Folder scope
 */
export type ComponentWithAnatomy<T extends Anatomy> = AnatomyClassNames<T>`

// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //

export const CORE_STYLE_PROVIDER = `'use client'
import React from 'react'
import { SSRProvider } from 'react-aria'

// ------------------------------------------------------------------------------------------------------------------ //

/**
 * @internal UI Folder scope
 */
type Lng = 'fr' | 'en' // DEVNOTE Add new lang keywords to maintain type safety
type UILocaleConfig = {
   locale: Lng,
   countryLocale: string,
   country: string
}
const __LocaleConfigDefaultValue: UILocaleConfig = { locale: 'en', countryLocale: 'en-US', country: 'us' }
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

UIProvider.displayName = "UIProvider"`

// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //

export const CORE_INDEX = `export * from './style-anatomy'
export * from './style-provider'`


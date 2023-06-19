import { UIProvider } from "ui"
import type { Preview } from "@storybook/react"
import "../src/styles/globals.css"
import "../src/styles.css"
import { withThemeByDataAttribute } from "@storybook/addon-styling"

const withUI = (StoryFn: Function) => {
   return (
       <UIProvider>
          aaa
          <StoryFn/>
       </UIProvider>
   )
}

const preview: Preview = {
   parameters: {
      actions: { argTypesRegex: "^on.*" },
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
         },
      },
      docs: {
         story: {
            inline: true
         }
      },
   },
}

export default preview

export const decorators = [
   withUI,
   withThemeByDataAttribute({
      themes: {
         light: "light",
         dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-mode",
   }),
]

export const globalTypes = {
   // darkMode: true,
}

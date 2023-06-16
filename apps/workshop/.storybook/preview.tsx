import { UIProvider } from "ui"
import type { Preview } from "@storybook/react"
import "../src/globals.css" // replace with the name of your tailwind css file
import "../src/styles.css" // replace with the name of your tailwind css file
const withUI = (StoryFn: Function) => {
   return (
       <UIProvider>
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
   },
}

export default preview

export const decorators = [
   withUI,
   // withThemeByDataAttribute({
   //    themes: {
   //       dark: 'dark',
   //    },
   //    defaultTheme: 'light',
   //    attributeName: 'data-mode',
   // }),
]

export const globalTypes = {
   darkMode: true,
}

import "../src/styles/globals.css"
import { withThemeByDataAttribute } from "@storybook/addon-styling"
import type { Preview } from "@storybook/react"

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
            hideNoControlsWarning: true,
        },
    },
    globalTypes: {
        darkMode: {
            defaultValue: true, // Enable dark mode by default on all stories
        },
    },
}

export default preview

const withBg = ((story: (arg0: any) => any, context: { globals: { theme: string } }) => {

    const styleContent = `.docs-story {
    background-color: ${context?.globals?.theme === "dark" ? "#121212" : "#fff"};
    color: ${context?.globals?.theme === "dark" ? "#fff" : "#121212"};
  }
  .sb-show-main {
    background-color: ${context?.globals?.theme === "dark" ? "#121212" : "#fff"};
    color: ${context?.globals?.theme === "dark" ? "#fff" : "#121212"};
  }`

    return <>
        <style>{styleContent}</style>
        <>{story(context)}</>
    </>
})

export const decorators = [
    // withUI,
    withThemeByDataAttribute({
        themes: {
            light: "light",
            dark: "dark",
        },
        defaultTheme: "light",
        attributeName: "data-mode",
    }),
    withBg,
]

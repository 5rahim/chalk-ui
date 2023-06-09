import type { Preview } from "@storybook/react"
import "../src/styles/globals.css"
import "../src/styles.css"
import { withThemeByDataAttribute } from "@storybook/addon-styling"
import { UIProvider } from "../src/components/ui/core"
import { ToastProvider } from "../src/components/ui/toast"

const withUI = (StoryFn: Function) => {
    return (
        <UIProvider>
            {/* @ts-expect-error */}
            <StoryFn/>
            <ToastProvider/>
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
            hideNoControlsWarning: true
        },
        docs: {
            story: {
                inline: true
            }
        },
        options: {
            storySort: {
                order: ["Introduction", "Installation", "Dark mode", "CLI", "Customization"]
            }
        }
    },
}

const withBg = ((story, context) => {

    const styleContent = `.docs-story {
    background-color: ${context?.globals?.theme === "dark" ? "#121212" : "#fff"}
  }`

    return <>
        <style>{styleContent}</style>
        <>{story(context)}</>
    </>
})

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
    withBg,
]

export const globalTypes = {
    // darkMode: true,
    // theme: {
    //    name: 'Theme',
    //    description: 'Global theme for components',
    //    defaultValue: 'light',
    //    toolbar: {
    //       // The icon for the toolbar item
    //       icon: 'circlehollow',
    //       // Array of options
    //       items: [
    //          { value: 'light', icon: 'circlehollow', title: 'light' },
    //          { value: 'dark', icon: 'circle', title: 'dark' },
    //       ],
    //       // Property that specifies if the name of the item will be displayed
    //       showName: true,
    //    },
    // },
}

import type { StorybookConfig } from "@storybook/nextjs"
import path from "path"

const config: StorybookConfig = {
    stories: ["../src/workshop/**/*.mdx", "../src/workshop/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-styling",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@storybook/addon-mdx-gfm",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../public"],
    webpackFinal: async (config: any) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "../src"),
        }

        return config
    },
}
export default config

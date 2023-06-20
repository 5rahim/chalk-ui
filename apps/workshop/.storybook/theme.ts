import { create } from "@storybook/theming/create"

export default create({
    base: "light",
    brandTitle: "Chalk UI",
    brandUrl: "https://chalk.rahim.app",
    brandTarget: "_self",

    fontBase: "\"Open Sans\", sans-serif",


    //
    colorPrimary: "#644be1",
    colorSecondary: "#644be1",
    textMutedColor: "#6b7280",

    // UI
    appBg: "#ffffff",
    appContentBg: "#ffffff",
    appBorderColor: "#e5e7eb",
    appBorderRadius: 4,

    // Text colors
    textColor: "#171717",
    textInverseColor: "#ffffff",

    // Toolbar default and active colors
    barTextColor: "#6b7280",
    barSelectedColor: "#644be1",
    barBg: "#ffffff",

    // Form colors
    inputBg: "#ffffff",
    inputBorder: "#e5e7eb",
    inputTextColor: "#111827",
    inputBorderRadius: 4,
})

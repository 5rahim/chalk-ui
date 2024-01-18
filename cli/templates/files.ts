export const STYLES = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --radius: 0.375rem;

        --foreground: theme('colors.gray.800');
        --background: white;

        --brand: theme('colors.brand.500');
        --slate: theme('colors.slate.500');
        --gray: theme('colors.gray.500');
        --zinc: theme('colors.zinc.500');
        --neutral: theme('colors.neutral.500');
        --stone: theme('colors.stone.500');
        --red: theme('colors.red.500');
        --orange: theme('colors.orange.500');
        --amber: theme('colors.amber.500');
        --yellow: theme('colors.yellow.500');
        --lime: theme('colors.lime.500');
        --green: theme('colors.green.500');
        --emerald: theme('colors.emerald.500');
        --teal: theme('colors.teal.500');
        --cyan: theme('colors.cyan.500');
        --sky: theme('colors.sky.500');
        --blue: theme('colors.blue.500');
        --indigo: theme('colors.indigo.500');
        --violet: theme('colors.violet.500');
        --purple: theme('colors.purple.500');
        --fuchsia: theme('colors.fuchsia.500');
        --pink: theme('colors.pink.500');
        --rose: theme('colors.rose.500');

        --border: theme('colors.gray.200');
        --ring: theme('colors.brand.500');

        --muted: theme('colors.gray.500');
        --muted-highlight: theme('colors.gray.700');

        --paper: theme('colors.white');
        --subtle: rgba(0, 0, 0, 0.04);
        --subtle-highlight: rgba(0, 0, 0, 0.06);

    }

    .dark, [data-mode="dark"] {
        --foreground: theme('colors.gray.200');
        --background: #0c0c0c;

        --brand: theme('colors.brand.400');
        --slate: theme('colors.slate.400');
        --gray: theme('colors.gray.400');
        --zinc: theme('colors.zinc.400');
        --neutral: theme('colors.neutral.400');
        --stone: theme('colors.stone.400');
        --red: theme('colors.red.400');
        --orange: theme('colors.orange.400');
        --amber: theme('colors.amber.400');
        --yellow: theme('colors.yellow.400');
        --lime: theme('colors.lime.400');
        --green: theme('colors.green.400');
        --emerald: theme('colors.emerald.400');
        --teal: theme('colors.teal.400');
        --cyan: theme('colors.cyan.400');
        --sky: theme('colors.sky.400');
        --blue: theme('colors.blue.400');
        --indigo: theme('colors.indigo.400');
        --violet: theme('colors.violet.400');
        --purple: theme('colors.purple.400');
        --fuchsia: theme('colors.fuchsia.400');
        --pink: theme('colors.pink.400');
        --rose: theme('colors.rose.400');

        --border: #313131;
        --ring: theme('colors.brand.200');

        --muted: theme('colors.gray.400');
        --muted-highlight: theme('colors.gray.300');

        --paper: theme('colors.gray.900');
        --subtle: rgba(255, 255, 255, 0.06);
        --subtle-highlight: rgba(255, 255, 255, 0.08);

    }
}

html {
    background-color: var(--background);
    color: var(--foreground);
}

html * {
    border-color: var(--border);
}

h1, h2, h3, h4, h5, h6 {
    @apply text-gray-800 dark:text-gray-100
}

h1 {
    @apply scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl
}

h2 {
    @apply scroll-m-20 text-3xl font-bold tracking-tight first:mt-0
}

h3 {
    @apply scroll-m-20 text-2xl font-semibold tracking-tight
}

h4 {
    @apply scroll-m-20 text-xl font-semibold tracking-tight
}

h5 {
    @apply scroll-m-20 text-lg font-semibold tracking-tight
}

h6 {
    @apply scroll-m-20 text-base font-semibold tracking-tight
}`

// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //

export const TAILWIND_CONFIG = (srcDir: boolean) => `import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: "class",
    content: [
        "./index.html",
        "${srcDir ? "./src/" : "./"}app/**/*.{ts,tsx,mdx}",
        "${srcDir ? "./src/" : "./"}pages/**/*.{ts,tsx,mdx}",
        "${srcDir ? "./src/" : "./"}components/**/*.{ts,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "5rem",
                "2xl": "6rem",
            },
            screens: {
                "2xl": "1400px",
            },
        },
        data: {
            checked: "checked",
            selected: "selected",
            disabled: "disabled",
            highlighted: "highlighted",
        },
        extend: {
            animationDuration: {
                DEFAULT: "0.25s",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "slide-down": {
                    from: { transform: "translateY(-1rem)", opacity: "0" },
                    to: { transform: "translateY(0)", opacity: "1" },
                },
                "slide-up": {
                    from: { transform: "translateY(0)", opacity: "1" },
                    to: { transform: "translateY(-1rem)", opacity: "0" },
                },
                "indeterminate-progress": {
                    "0%": { transform: " translateX(0) scaleX(0)" },
                    "40%": { transform: "translateX(0) scaleX(0.4)" },
                    "100%": { transform: "translateX(100%) scaleX(0.5)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.15s linear",
                "accordion-up": "accordion-up 0.15s linear",
                "slide-down": "slide-down 0.15s ease-in-out",
                "slide-up": "slide-up 0.15s ease-in-out",
                "indeterminate-progress": "indeterminate-progress 1s infinite ease-out",
            },
            transformOrigin: {
                "left-right": "0% 100%",
            },
            boxShadow: {
                "md": "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            },
            colors: {
                brand: {
                    50: "#fff5ec",
                    100: "#ffe9d4",
                    200: "#ffcea8",
                    300: "#ffac70",
                    400: "#ff7d36",
                    500: "#ff5a0f",
                    600: "#f03e06",
                    700: "#c72c07",
                    800: "#a9260f",
                    900: "#7f200f",
                    950: "#450d05",
                    DEFAULT: "#ff5a0f",
                },
                gray: {
                    50: "#FAFAFA",
                    100: "#F5F5F5",
                    200: "#E5E5E5",
                    300: "#D4D4D4",
                    400: "#A3A3A3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                    950: "#101010",
                    DEFAULT: "#737373",
                },
                green: {
                    50: "#e6f7ea",
                    100: "#cfead6",
                    200: "#7bd0a7",
                    300: "#68b695",
                    400: "#57a181",
                    500: "#258c60",
                    600: "#1a6444",
                    700: "#154f37",
                    800: "#103b29",
                    900: "#0a2318",
                    950: "#05130d",
                    DEFAULT: "#258c60",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("tailwind-scrollbar-hide"), require("tailwindcss-animate")],
}
export default config`

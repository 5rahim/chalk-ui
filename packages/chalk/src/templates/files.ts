export const STYLES = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --radius: 0.375rem;

        --text-color: theme('colors.gray.800');
        --background-color: white;

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

        --control: theme('colors.gray.300');
        --control-highlight: theme('colors.gray.400');

        --border: theme('colors.gray.200');
        --ring: theme('colors.brand.500');

        --muted: theme('colors.gray.500');
        --muted-highlight: theme('colors.gray.700');

        --paper: theme('colors.white');
        --highlight: rgba(0, 0, 0, 0.04);

    }

    .dark {
        --text-color: theme('colors.gray.200');
        --background-color: #121212;

        --brand: theme('colors.brand.300');
        --slate: theme('colors.slate.300');
        --gray: theme('colors.gray.300');
        --zinc: theme('colors.zinc.300');
        --neutral: theme('colors.neutral.300');
        --stone: theme('colors.stone.300');
        --red: theme('colors.red.300');
        --orange: theme('colors.orange.300');
        --amber: theme('colors.amber.300');
        --yellow: theme('colors.yellow.300');
        --lime: theme('colors.lime.300');
        --green: theme('colors.green.300');
        --emerald: theme('colors.emerald.300');
        --teal: theme('colors.teal.300');
        --cyan: theme('colors.cyan.300');
        --sky: theme('colors.sky.300');
        --blue: theme('colors.blue.300');
        --indigo: theme('colors.indigo.300');
        --violet: theme('colors.violet.300');
        --purple: theme('colors.purple.300');
        --fuchsia: theme('colors.fuchsia.300');
        --pink: theme('colors.pink.300');
        --rose: theme('colors.rose.300');

        --control: theme('colors.gray.700');
        --control-highlight: theme('colors.gray.600');

        --border: theme('colors.gray.700');
        --ring: theme('colors.brand.200');

        --muted: theme('colors.gray.400');
        --muted-highlight: theme('colors.gray.300');

        --paper: theme('colors.gray.900');
        --highlight: rgba(255, 255, 255, 0.06);

    }
}

html {
    background-color: var(--background-color);
    color: var(--text-color);
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
    @apply scroll-m-20 text-2xl font-bold tracking-tight
}

h4 {
    @apply scroll-m-20 text-xl font-bold tracking-tight
}

h5 {
    @apply scroll-m-20 text-lg font-bold tracking-tight
}`

// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------- //

export const TAILWIND_CONFIG = (srcDir: boolean) => `const {colors} = require("tailwindcss/colors")
const {fontFamily} = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        '${srcDir ? "./src/" : "./"}pages/**/*.{ts,tsx}',
        '${srcDir ? "./src/" : "./"}components/**/*.{ts,tsx}',
        '${srcDir ? "./src/" : "./"}app/**/*.{ts,tsx}',
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

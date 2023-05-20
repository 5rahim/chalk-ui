// tailwind config is required for editor support

const sharedConfig = require("../../tailwind.config");

module.exports = {
    presets: [sharedConfig],
    content: [
        `src/**/*.{js,ts,jsx,tsx}`,
        // include packages if not transpiling
        "../../packages/**/*.{js,ts,jsx,tsx}",
        "./styles.css"
    ]
};

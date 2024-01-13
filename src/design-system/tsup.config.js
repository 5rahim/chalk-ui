import {defineConfig} from "tsup";

export default defineConfig([
    {
        entry: ["./index.ts"],
        treeshake: true,
        minify: true,
        dts: true,
        verbose: true,
        external: ["react", "react-dom", "next"],
        target: "esnext",
        clean: true,
        outDir: "./build",
        tsconfig: "./tsconfig.json",
    },
]);

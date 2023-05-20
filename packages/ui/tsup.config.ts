import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
   treeshake: "smallest",
   splitting: true,
   entry: ["src/index.tsx"],
   format: ["esm", "cjs"],
   dts: true,
   clean: true,
   external: ["react", "react-dom"],
   // minify: true,
   target: "esnext",
   ...options,
}))

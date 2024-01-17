import { defineConfig } from "tsup"

export default defineConfig({
   clean: true,
   dts: true,
   entry: ["index.ts"],
   format: ["esm"],
   sourcemap: true,
   target: "esnext",
   outDir: "dist",
   tsconfig: "tsconfig.json",
})

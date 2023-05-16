import { defineConfig } from "vite";

export default defineConfig({
  // easier readability in the sandbox
  clearScreen: false,
  build: {
    lib: {
      entry: "index.html",
      name: "main",
      formats: ["umd"]
    }
  }
});

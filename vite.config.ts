import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { glob, globSync, globStream, globStreamSync, Glob } from "glob";

const root = resolve(__dirname, "src");
const outdir = resolve(__dirname, "dist");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root,
  build: {
    emptyOutDir: true,
    outDir: outdir,
    rollupOptions: {
      input: glob.sync(resolve(__dirname, "src", "*.html")),
    },
  },
});

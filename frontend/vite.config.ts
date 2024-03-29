import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { glob, globSync, globStream, globStreamSync, Glob } from "glob";
import generouted from "@generouted/react-router/plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generouted()],
  resolve: { alias: { "@": "/src" } },
  // build: {
  //   rollupOptions: {
  //     external: ["react", "react-router", "react-router-dom"],
  //   },
  // },
});

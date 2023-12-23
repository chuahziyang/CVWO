import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { glob, globSync, globStream, globStreamSync, Glob } from "glob";
import Generouted from "@generouted/react-router/plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Generouted()],
});

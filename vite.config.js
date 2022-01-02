import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: "demo",
  plugins: [
    vue(),
  ],
  define: {
    "__APP_VERSION__": JSON.stringify(process.env.npm_package_version),
  },
  server: {
    port: 8080,
    open: true,
  },
});

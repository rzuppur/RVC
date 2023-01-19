import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const styleCrossoriginPlugin = () => {
  return {
    name: "style-crossorigin",
    transformIndexHtml(html) {
      return html.replace(
        "<link rel=\"stylesheet\" ",
        "<link rel=\"stylesheet\" crossorigin=\"anonymous\" ",
      );
    },
  };
};

export default defineConfig({
  root: "demo",
  plugins: [
    vue(),
    styleCrossoriginPlugin(),
  ],
  define: {
    "__APP_VERSION__": JSON.stringify(process.env.npm_package_version),
  },
  server: {
    port: 8080,
    open: true,
  },
});

import vue from "rollup-plugin-vue";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-ts";
import alias from "@rollup/plugin-alias";
import combine from "postcss-combine-duplicated-selectors";

export default {
  input: "src/index.ts",
  output:  [
    {
      file: "dist/index.js",
      format: "es",
    },
  ],
  plugins: [
    replace({
      values: {
        NODE_ENV: JSON.stringify("production"),
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      preventAssignment: true,
    }),
    vue({
      preprocessStyles: true,
      css: false,
      compileTemplate: true,
    }),
    ts(),
    postcss({
      plugins: [combine],
      minimize: {
        preset: "advanced",
      },
    }),
    alias({
      resolve: [ ".js", ".ts", ".tsx" ],
      entries: [
        { find: "vue", replacement: "@vue/runtime-dom" },
      ],
    }),
    resolve(),
    peerDepsExternal(),
  ],
};

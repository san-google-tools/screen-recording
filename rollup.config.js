import path from "path";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { emptyDir } from "rollup-plugin-empty-dir";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
    chunkFileNames: path.join("chunks", "[name]-[hash].js"),
  },
  plugins: [
    chromeExtension({
      extendManifest: {
        manifest_version: 3,
        permissions: [],
      },
    }),
    simpleReloader(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    babel({
      ignore: ["node_modules"],
      babelHelpers: "bundled",
    }),
    resolve(),
    commonjs(),
    emptyDir(),
  ],
};

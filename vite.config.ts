import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import svgr from "vite-plugin-svgr";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3188",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    // alias: {
    //   "~": path.resolve(__dirname, "node_modules/"), // 根路径
    //   "@": path.resolve(__dirname, "src"), // src 路径
    // },
    alias: [
      {
        // ~*/xxxx  =>  node_modules/*/xxx
        find: /^~/,
        replacement: path.resolve("node_modules") + "/",
      },
      {
        // /@/xxxx  =>  src/xxx
        find: /@\//,
        replacement: path.resolve("src") + "/",
      },
    ],
  },
  optimizeDeps: {
    include: ["@ant-design/icons"],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联 JavaScript
        modifyVars: {
          "@primary-color": "#1890ff",
        },
      },
    },
  },
});

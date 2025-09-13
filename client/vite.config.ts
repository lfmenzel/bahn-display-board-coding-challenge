import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 4200,
    proxy: {
      // "^/orders/api/.*": {
      //   target: "https://ontrack-q.redbull.com/api/webshop",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/orders\/api/, ""),
      // },
      // "^/order/api/.*": {
      //   target: "https://ontrack-q.redbull.com/api/webshop",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/order\/api/, ""),
      // },
    },
  },
});

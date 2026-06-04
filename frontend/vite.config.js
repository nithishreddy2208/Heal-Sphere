import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window", // ✅ Fix for `global is not defined`
  },
  resolve: {
    alias: {
      events: "events",
      util: "util",
      stream: "stream-browserify",
      net: "net-browserify",
      tls: "tls-browserify",
      crypto: "crypto-browserify",
      http: "http-browserify",
      https: "https-browserify",
      zlib: "browserify-zlib",
      buffer: "buffer",
    },
  },
  optimizeDeps: {
    include: ["simple-peer"],
  },
  server: {
    port: 5174,
  },
});

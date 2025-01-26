// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs-extra";

// Function to copy extension files
function copyExtensionFiles() {
  return {
    name: "copy-extension-files",
    writeBundle() {
      // Copy manifest.json
      fs.copySync("manifest.json", "dist/manifest.json");

      // Copy extension folder (contains icons, background.js, content.js)
      fs.copySync("extension", "dist/extension", {
        filter: (src) => {
          // Exclude any temporary or unnecessary files
          return !src.includes("node_modules") && !src.includes(".DS_Store");
        },
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), copyExtensionFiles()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "extension/background.js"),
        content: resolve(__dirname, "extension/content.js"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "background" || chunkInfo.name === "content") {
            return "extension/[name].js";
          }
          return "assets/[name]-[hash].js";
        },
      },
    },
    outDir: "dist",
  },
  server: {
    port: 5173,
    fs: {
      strict: false,
    },
  },
});

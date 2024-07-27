import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [basicSsl(), react()],
  // server: {
  //   port: 4000,
  //   host: true,
  //   strictPort: true,
  // },
  // build: {
  //   outDir: "dist",
  //   sourcemap: false,
  // },
  // preview: {
  //   port: 4001,
  // },
});

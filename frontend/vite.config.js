import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  //  adding Server and Proxy :

  server: {
    proxy: {
      "/api/": "http://localhost:3000",
      "/uploads": " http://localhost:3000",
    },
  },
});

//

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // When running `vite` alone (not `vercel dev`), proxy /api calls to a
    // separately-running `vercel dev` instance on port 3000 if you use one.
    // With `vercel dev` for local development this isn't needed at all,
    // since it serves both the frontend and /api on the same port.
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});

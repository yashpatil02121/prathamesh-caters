import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    allowedHosts: [
      "overdrawn-prong-legibly.ngrok-free.dev",
    ],
  },
});
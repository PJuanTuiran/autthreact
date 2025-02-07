import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { federation } from "@module-federation/vite";
import { dependencies } from "./package.json";

export default defineConfig(({ command }) => ({
  plugins: [
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Login": "./src/Login.tsx",
        "./AuthContext": "./src/context/AuthContext.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: dependencies.react },
        "react-dom": { singleton: true, requiredVersion: dependencies["react-dom"] },
      },
    }),
    react(),
  ],

  build: {
    target: "chrome89",
  },

  server: {
    host: "0.0.0.0",
    port: 8050,
    strictPort: true,

    cors: {
      origin: "*",
      methods: ["GET", "HEAD", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },

    allowedHosts: ["auth.parfinanciero.crudzaso.com"],

    hmr: command === "serve" ? { 
      protocol: "wss", 
      host: "auth.parfinanciero.crudzaso.com",
      port: 443 
    } : false, // ❌ Deshabilita HMR en producción
  },
}));

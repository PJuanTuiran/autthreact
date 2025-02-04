import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Asegura que escuche en todas las IPs
    port: 8050,       // Usa el puerto correcto
    strictPort: true,
    allowedHosts: ["auth.parfinanciero.crudzaso.com"]
  }
})

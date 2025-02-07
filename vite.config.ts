import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { federation } from '@module-federation/vite'
import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [

    
    federation({
      name: 'remote', // Nombre del remote
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/Login.tsx', // Expone el componente Login
        './AuthContext': './src/context/AuthContext.tsx', // Expone el AuthContext
      },
      shared: {
        react: { singleton: true, requiredVersion: dependencies.react },
        'react-dom': { singleton: true, requiredVersion: dependencies['react-dom'] },
      },

      
    }),

    react()],
  
    build: {
    target: 'chrome89',
  },
  server: {
    host: "0.0.0.0",  // Asegura que escuche en todas las IPs
    port: 8050,       // Usa el puerto correcto
    strictPort: true,


    cors: {
      origin: "*", // Permite acceso desde cualquier origen
      methods: ["GET", "HEAD", "OPTIONS"], // Métodos permitidos
      allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
    },
    allowedHosts: ["auth.parfinanciero.crudzaso.com"]
  }
})

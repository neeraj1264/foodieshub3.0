import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,  // Allow access from other devices (mobile) on the same network
    port: 3002,  // Specify the port if needed
  },
})

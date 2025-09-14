import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/groupmoqMVP/', // This must match your repo name exactly
  server: {
    host: true,
    port: 5173
  }
})

// vite.config.js or vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': "frame-src 'self' https://www.youtube.com https://youtube.com https://platform.twitter.com;"
    }
  }
})

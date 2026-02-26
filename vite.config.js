import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//This host ("yen-spell-definitely-communication.trycloudflare.com") is not allowed.
// To allow this host, add "yen-spell-definitely-communication.trycloudflare.com" to `server.allowedHosts` in vite.config.js.
// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      "yen-spell-definitely-communication.trycloudflare.com"
    ]
  },
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// This automatically connects Tailwind without needing a separate configuration file
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
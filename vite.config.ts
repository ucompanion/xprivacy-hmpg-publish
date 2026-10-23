import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    Pages({
      dirs: 'src/pages',
    }),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
})

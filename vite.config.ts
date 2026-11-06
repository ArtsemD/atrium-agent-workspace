import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works on GitHub Pages under /<repo>/
export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
})

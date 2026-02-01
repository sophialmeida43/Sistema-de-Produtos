import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração para GitHub Pages
export default defineConfig({
  base: '/Sistema-de-Produtos/',  // <--- nome do seu repositório
  plugins: [react()],
})


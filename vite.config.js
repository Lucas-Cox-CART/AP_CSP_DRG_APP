import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'documents/gunner.html'),
        nested: resolve(__dirname, 'documents/driller.html'),
        nested: resolve(__dirname, 'documents/scout.html'),
        nested: resolve(__dirname, 'documents/engineer.html'),
        nested: resolve(__dirname, 'documents/missions.html'),
        nested: resolve(__dirname, 'documents/wildlfe.html'),
        nested: resolve(__dirname, 'documents/citation.html')
      },
    },
  },
})
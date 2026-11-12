import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5190 },
  // the Pyodide worker uses dynamic import(), so it must be an ES-module worker
  worker: { format: 'es' },
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: __dirname,
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap', '@gsap/react'],
          vendor: ['react', 'react-dom', 'lucide-react', 'lenis', 'framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
});

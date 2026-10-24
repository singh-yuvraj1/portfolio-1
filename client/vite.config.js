import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap', '@gsap/react'],
          vendor: ['react', 'react-dom', 'lucide-react', 'lenis'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true, // ✅ Enable CORS
    hmr: {
      host: '192.168.110.49', // ✅ Your local IP (not localhost)
    },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    
});

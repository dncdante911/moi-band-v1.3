import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },

    server: {
      port: 5173,
      // Proxy API requests to PHP backend during development
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
        '/public/uploads': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    build: {
      outDir: '../public_html',
      emptyOutDir: true,
      rollupOptions: {
        external: [/^\/assets\/videos\/.+/],
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            axios: ['axios'],
          },
        },
      },
    },

    assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.flac', '**/*.mp4', '**/*.webm'],

    css: {
      preprocessorOptions: {},
    },
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/* GitHub Pages sirve el juego en /dioses-del-nilo/, no en la raiz del dominio.
   El scope, el start_url y los iconos del manifest tienen que colgar de esa
   subruta o la PWA se instala apuntando a un sitio que no existe. Fuera de
   Actions (dev local, otro hosting) sigue siendo '/'. */
const base = process.env.GITHUB_ACTIONS ? '/dioses-del-nilo/' : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.svg', 'icons/*.png'],
      manifest: {
        name: 'Dioses del Nilo',
        short_name: 'Dioses Nilo',
        description: 'Juego educativo sobre el Antiguo Egipto. Encarnás a un dios y guiás el destino del Imperio.',
        theme_color: '#D4A017',
        background_color: '#2A2117',
        display: 'standalone',
        orientation: 'any',
        scope: base,
        start_url: base,
        icons: [
          {
            src: base + 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: base + 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: base + 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split heavy vendors into their own cacheable chunks so the app
        // code chunk stays under the size-warning threshold.
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})

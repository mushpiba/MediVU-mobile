import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/MediVU-mobile/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['medivu-icon.svg'],
      manifest: {
        name: 'MediVU Mobile 비대면 재진 데모',
        short_name: 'MediVU',
        description: '환자와 의사를 연결하는 비대면 재진 클릭형 데모',
        theme_color: '#0b2944',
        background_color: '#edf2f6',
        display: 'standalone',
        orientation: 'any',
        start_url: './#/patient/home',
        scope: './',
        lang: 'ko',
        icons: [
          { src: 'medivu-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'medivu-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,webmanifest}'],
        navigateFallback: 'index.html',
      },
      devOptions: { enabled: true },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})

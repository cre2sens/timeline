import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const cesiumSource = 'node_modules/cesium/Build/Cesium'

export default defineConfig(({ command }) => {
  const isProd = command === 'build';
  const base = isProd ? '/timeline/' : '/';

  return {
    base,
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          { src: `${cesiumSource}/Workers`, dest: 'cesium' },
          { src: `${cesiumSource}/ThirdParty`, dest: 'cesium' },
          { src: `${cesiumSource}/Assets`, dest: 'cesium' },
          { src: `${cesiumSource}/Widgets`, dest: 'cesium' },
        ],
      }),
    ],
    define: {
      CESIUM_BASE_URL: JSON.stringify(isProd ? '/timeline/cesium' : '/cesium'),
    },
    optimizeDeps: {
      include: ['cesium', 'mersenne-twister'],
    },
    build: {
      chunkSizeWarningLimit: 5000,
    },
  };
})

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      include: ['src'],
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'renderui.js',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: 'renderui.[ext]',
        globals: { vue: 'Vue' },
      },
    },
    sourcemap: true,
  },
})

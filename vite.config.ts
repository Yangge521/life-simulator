import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      // 如需后端 API 代理，在此配置
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true
      // }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // 生产环境去除 console
        drop_debugger: true
      }
    }
  }
})

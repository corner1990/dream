import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
    root: resolve(__dirname, './src'),
    // 开发服务器
    server: {
        port: 9999,
        host: '0.0.0.0' // 默认显示本机地址
    },
    // mode: 'development', // 打包模式
    build: {
        chunkSizeWarningLimit: 500, // 单个包最大
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        }
    },
    plugins: [
        vue(),
    ]
})
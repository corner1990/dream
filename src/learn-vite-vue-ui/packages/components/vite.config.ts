import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'; // 处理d.ts 声明文件
import style from './style-plugin';
// 打包cjs(CommonJS)和esm(ESModule)两种形式,
// cjs模式主要用于服务端引用(ssr),
// 而esm就是我们现在经常使用的方式，它本身自带treeShaking而不需要额外配置按需引入(前提是你将模块分别导出)
export default defineConfig({
    build: {
        "target": "modules", // 打包方式为module
        outDir: 'es', // 打包文件目录
        minify: false, // 是否压缩
        // cssCodeSplit: true, // css 分离
        rollupOptions: {
            external: ['vue', /\.less/], // 忽略打包vue文件
            input: ['src/index.ts'], // 入口文件
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js', // 默认打包为 *.es.js, 这里修改为 *.js
                    preserveModules: true, // 让包目录和现在目录对应
                    dir: 'es', // 配置打包根目录
                    preserveModulesRoot: 'src'
                }, {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true, // 让包目录和现在目录对应
                    dir: 'lib', // 配置打包目录
                    preserveModulesRoot: 'src',
                }
            ]
        },
        lib: {
            entry: './index.ts',
            formats: ['es', 'cjs']
        },
    },
    plugins: [
        vue(),
        dts({
            // 指定ts配置文件，这里使用统一的配置，也可以自己在component下新建, 配置对应的路径即可
            tsConfigFilePath: '../../tsconfig.json',
        }),
        
        dts({
            outputDir: 'lib', // 因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
            tsConfigFilePath: '../../tsconfig.json', 
        }),
        style()
    ]
})
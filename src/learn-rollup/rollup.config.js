import babel  from "@rollup/plugin-babel"
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import {terser} from 'rollup-plugin-terser'
import postcss from "rollup-plugin-postcss";
import serve from 'rollup-plugin-serve'
import vue from 'rollup-plugin-vue';

export default {
    input: 'src/main.js', // 入口
    // input: 'src/main.ts', // 入口修改为ts
    output: {
        file: 'dist/boundle.cjs.js',
        // format: 'cjs', // 五种输出格式 amd/es6/iife/umd/cjs
        name: 'bundleName', // 当format 为iife 和umd时必须提供，作为全局变量挂载在window下
        // 配置cdn
        format: 'iife',
        globals: {
            lodash: '_',
            jquery: '$'
        }
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            babelHelpers: "runtime",
        }),
        resolve({
            jsnext: true, // jsnext 属性是为了帮助 Node 模块迁移到 ES2015 的一部分

            // main 和 browser 属性帮助插件决定哪个文件应该被 bundle 文件使用。
            main: true,
            browser: true,
            // module: false, // <-- this library is not an ES6 module
            // browser: true, // <-- suppress node-specific features
            // module: true, // ES6 模块尽可能使用 module 字段
            // preferBuiltins: false,
            extensions: [".vue"]
        }),
        commonjs(),
        // typescript(), // ts 配置
        terser(), // 压缩js
        postcss(), // 编译css
        // 配置开发服务器
        serve({
            port: 3333,
            open: true,
            contentBase: './dist'
        }),
        //  配置vue
        vue({
            // target: 'browser',
            // template: {
            //     isProduction: true,
            //     compilerOptions: {
            //         whitespace: 'condense'
            //     }
            // }
            css: true,
            compileTemplate: true
        }),
    ],
    // cdn 配置  排除打包
    external: ['loadsh', 'jquery'],
}

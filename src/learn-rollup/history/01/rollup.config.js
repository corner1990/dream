import babel  from "@rollup/plugin-babel"
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
export default {
    input: 'src/main.ts', // 入口
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
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs()
    ],
    // cdn 配置  排除打包
    external: ['loadsh', 'jquery']
}

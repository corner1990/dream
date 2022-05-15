import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import path from 'path'
import { rollup, OutputOptions } from 'rollup'

import { parallel } from 'gulp'
import { outDir, vUIPath } from './utils/paths';
// 打包所有component
const buildFull = async () => {
    // rollup 打包配置
    const config = {
        input: path.resolve(vUIPath, 'index.ts'),
        plugins: [
            nodeResolve(),
            typescript(),
            vue(),
            commonjs(),
        ],
        external: (id) => /^vue/.test(id), // 不打包vue
    }
    // 两种使用方式 import 导入， 在浏览器中使用 script
    const buildConfig = [
        {
            fommat: 'umd', // 打包的
            file: path.resolve(outDir, 'index.js'),
            name: 'VUI', // 全局的名字
            exports: 'named',
            global: {
                vue: 'Vue', // 表示使用的全局vue
            }
        },
        {
            fommat: 'esm', // 打包的
            file: path.resolve(outDir, 'index.esm.js'),
        }
    ]
    const bondle = await rollup(config);
    return Promise.all(buildConfig.map((config) => bondle.write(config as OutputOptions)))
    // bondle.write()
}
// buildFullComponent 是一个任务名
export const buildFullComponent = async () => {
    console.log('buildFullComponent')
    return buildFull()
}
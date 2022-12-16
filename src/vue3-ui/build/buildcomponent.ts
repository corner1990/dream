// 打包每个组件
import { series } from 'gulp'
import { sync } from 'fast-glob'
import { compRoot } from './utils/paths'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import path from 'path'
import { rollup, OutputOptions } from 'rollup'
import { buildConfig } from './utils/config';
// pnpm install fast-glob -w -D 安装依赖模块
const buildEachComponent = async () => {
    // 寻找所有文件
    const files = sync('*', {
        cwd: compRoot,
        onlyDirectories: true, // 查找目录
    })

    // 分别吧componets下的组件 打包到 dist/es/components下 和 dist/lib/compnents 目录下
    console.log('files', files)
    const builds = files.map(async (file: string) => {
        const input = path.resolve(compRoot, file, 'index.ts');
        const config = {
            input,
            plugins: [
                nodeResolve(),
                commonjs(),
                typescript(),
                vue(),
            ],
            external: (id) =>{
                return /^vue/.test(id) || /^@vue3-ui/.test(id);
            }, // 不打包vue 和自己的组件
        }

        const buond = await rollup(config);
        const options = Object.values(buildConfig).map((subconfig) => ({
            format: subconfig.format,
            file: path.resolve(subconfig.output.path, `components/${file}/index.js`),
        }))
        await Promise.all(options.map((option) => {
            buond.write(option as OutputOptions)
        }))
    })
}
export const buildcomponent = series(buildEachComponent) as any
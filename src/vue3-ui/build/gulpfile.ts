import { series, parallel } from 'gulp';
import { run, widthTaskName } from './utils';


export * from './full-components';
export * from './buildcomponent';
export default series(
    // 清空目录
    widthTaskName('clean', async () => run('rm -rf ./dist')),
    // parallel(
        // 打包样式
        // widthTaskName('buildThemeChalk', async() => run('pnpm run --filter ./packages/theme-chalk --parallel build')),
        // 打包工具方法
        widthTaskName('buildUtils', async() => run('pnpm run --filter ./packages/utils --parallel build')),
        // 打包所有组件
        // widthTaskName('buildFullComponents', async() => run('pnpm run build buildFullComponent')),
        // rollp d打包
        // pnpm install rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup-plugin-typescript2 rollup-plugin-vue -D -w
        // 打包每个组件
        // widthTaskName('buildCompnent', () => run('pnpm run build buildcomponent')),
    // ),
    
    // 生成一个组件库
    // 发布组件
    
    ) as any;

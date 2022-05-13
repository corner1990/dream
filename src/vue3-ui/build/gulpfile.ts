import { series, parallel } from 'gulp';
import { run, widthTaskName } from './utils';

export default series(
    // 清空目录
    widthTaskName('clean', async () => run('rm -rf ./dist')),
    // 打包样式
    widthTaskName('buildThemeChalk', async() => run('pnpm run --filter ./packages/theme-chalk --parallel build')),
    // 打包工具方法
    widthTaskName('buildUtils', async() => run('pnpm run --filter ./packages/utils --parallel build'))
    // 打包所有组件
    // 打包每个组件
    // 生成一个组件库
    // 发布组件

) as any;
import path from 'path';
// 项目更目录
export const projectRootPath = path.resolve(__dirname, '../../');

// 输出的模块路径
export const outDir = path.resolve(__dirname, '../../dist')
// 入口路径
export const vUIPath = path.resolve(__dirname, '../../packages/v-ui')

// 组件路径
export const compRoot = path.resolve(projectRootPath, './packages/components')
import path from 'path';
// 项目更目录
export const projectRootPath = path.resolve(__dirname, '../../');

// 输出的模块路径
export const outDir = path.relative(__dirname, '../../dist')
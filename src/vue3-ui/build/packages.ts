import { parallel, series, src, dest } from 'gulp'
import { buildConfig } from './utils/config'
import path from 'path';
import { outDir, projectRootPath } from './utils/paths';
import ts from 'gulp-typescript'
import { widthTaskName } from './utils';

// 打包工具库
export const buildPackages: any = (dirName: string, name: string) =>  {
    // console.log('dir 000', dirName, name);
   
    // 打包为cjs or esmodule 模式
    // 打包
    const tasks = Object.entries(buildConfig).map(([module, config]) => {
   
        const outPath = path.resolve(dirName, config.output.name);
        return series(
            widthTaskName(`build: ${dirName}`, () => {
                const tsConfig = path.resolve(projectRootPath, './tsconfig.json'); // ts 配置文件路径
                const inputs = ['**/*.ts', '!gulpfile.ts', "!node_modules"];
                console.log('inputs', inputs)
                return src(inputs)
                    .pipe(ts.createProject(tsConfig, {
                        declaration: true, //生成配置文件
                        strict: true,
                        module: config.module
                    })())
                    .pipe(dest(outPath))
            }),
            widthTaskName('copy utils', () => {
                console.log('path.resolve(outDir, config.output.name, dirName)', path.resolve(outDir, config.output.name, dirName))
                console.log('outPath', `${outPath}/**`)
                // 将utils 模块拷贝到dist目录下的es目录和lib目录
                return src(`${outPath}/**`).pipe(dest(path.resolve(outDir, config.output.name, name)))
            })
        )
    })

    return parallel(...tasks);
    
}

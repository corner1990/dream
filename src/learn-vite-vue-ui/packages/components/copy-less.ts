import copy from 'cpy';
import { resolve, dirname } from 'path';
import less from 'less';
import glob from 'fast-glob';
import { promises as fs } from 'fs'

// 源文件
const sourceDir = resolve(__dirname, './src')

// lib 目录
const libDir = resolve(__dirname, './lib')

// es 目录
const esDir = resolve(__dirname, './es');

// 编译less
const buildLess = async () => {
    const srcDir = resolve(__dirname, './src')
    // 获取打包后的.less 目录
    const lessFilePaths = await glob('**/*.less', { cwd: srcDir, onlyFiles: true });
    // console.log('lessFiles', lessFiles)

    // 遍历路径
    lessFilePaths.forEach(async (pathStr: string, idx: number) => {
        // 当前less 文件完整路径
        const filePath = `${srcDir}/${pathStr}`;
        console.log('filePath', filePath)
        // 读取文件内容
        const contents = await fs.readFile(filePath, 'utf-8');

        // less 编译为 css
        const cssContents = await less.render(contents, {
            // 执行 src 下对应目录为
            paths: [srcDir, dirname(filePath)]
        })

        // console.log('cssContents', cssContents, pathStr)
        // 从路径列表拿到当前路径 处理路径
        const cssPath = lessFilePaths[idx].replace('.less', '.css')
        // console.log('cssPath', cssPath)
        
        // 写入css文件至对应的目录
        await fs.writeFile(resolve(libDir, cssPath), cssContents.css);
        await fs.writeFile(resolve(esDir, cssPath), cssContents.css);
    })
}

// 首次拷贝
const copyLess = async () => {
    await copy(`${sourceDir}/**/*.less`, libDir)
    await copy(`${sourceDir}/**/*.less`, esDir)
    buildLess()
}

// 拷贝样式文件
copyLess();
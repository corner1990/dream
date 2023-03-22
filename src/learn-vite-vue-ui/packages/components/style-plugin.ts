
const StylePlugin = () => {
    return {
        name: 'style',
        generateBundle(config:  Record<string, any>, bundle: Record<string, any>) {
            const keys = Object.keys(bundle);
            // bundle 打包后的文件目录以及代码内容
            console.log('bundle', bundle);
            console.log('config', config)
            for (const key of keys) {
                const bundler: any = bundle[key];
                // rollup 内置方法，将所有输入文件code中的 .less 文件替换成 .css;
                this.emitFile({
                    type: 'asset',
                    fileName: key, // 文件名不便
                    source: bundler.code.replace(/\.less/g, '.css')
                })
            }
        }
    } as any
}

export default StylePlugin;
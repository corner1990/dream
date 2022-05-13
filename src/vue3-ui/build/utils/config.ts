import path from 'path';
import { outDir } from './paths';

export const buildConfig = {
    esm: { // es 6 模式配置
        module: 'ESNext',
        format: 'esm',
        output: {
            name: 'es',
            path: path.resolve(outDir, 'es')
        },
        buildle: {
            path: 'v-ui/es'
        }

    },
    cjs: { // commonjs 模式配置
        module: 'CommonJS',
        format: 'cjs',
        output: {
            name: 'lib',
            path: path.resolve(outDir, 'lib')
        },
        buildle: {
            path: 'v-ui/lib'
        }

    }
}
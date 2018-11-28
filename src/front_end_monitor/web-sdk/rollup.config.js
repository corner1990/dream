let isDev = process.env.NODE_ENV === 'develop'
import babel from 'rollup-plugin-babel'

let bebelCon = {
    "presets": [
        [
            "env", {
                "modules": false,
                "targets": {
                    "browsers": ["chorme > 40", "safari >= 7"]
                }
            }
        ]
    ]
}
export default {
    input: 'index.js',
    watch: {
        exclude: 'node_modules/**'
    },
    output: {
        file: isDev ? '../website/client/js/eagle-monitor/bundle.umd.js' : './dist/bundle.umd.js',
        name: 'Eagle', // 挂载到全局的名字
        format: 'umd',
        sourcemap: true
    },
    plugin: [
        babel({
            babelrc: false,
            presets: bebelCon.presets,
            exclude: 'node_modules/**'
        })
    ]
}
// 打包样式
// 依赖的库
// pnpm install gulp-sass @types/gulp-sass @types/sass @types/gulp-autoprefixer gulp-autoprefixer @types/gulp-clean-css gulp-clean-css sass -D -w
import { series, src, dest } from 'gulp';
import gulpSass from 'gulp-sass'
import dartSass from 'sass';
import autoprefixer  from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css';
import path from 'path';
import { run, widthTaskName } from '../../build/utils';


// 打包完成
const compile = () => {
    const sass = gulpSass(dartSass)
    return src(path.relative(__dirname, './src/*.scss'))
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(dest('./dist'))
}
// 拷贝字体文件
const copyFonts = () => {
    return src(path.relative(__dirname, 'src/fonts/**')).pipe(cleanCss()).pipe(dest('./dist/fonts'))
}

// 拷贝所有样式
const copyFullStyles = () => {
    return src(path.relative(__dirname, './dist/**')).pipe(dest(path.resolve(__dirname, '../../dist/theme-chalk')))
}

export default series(
    widthTaskName('clean css', () => run('rm -rf ./packages/theme-chalk/dist/**')),
    widthTaskName('build theme-chalk', compile),
    copyFonts,
    copyFullStyles,
) as any;
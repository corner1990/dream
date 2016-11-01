var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    babel = require("gulp-babel"),
	minifyHTML = require("gulp-minify-html");
    var browserSync = require('browser-sync').create();
    var reload = browserSync.reload;


gulp.task('js-demo01',function(){
    return gulp.src(['src/res/js/demo01/demo01.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('*.js'))
    .pipe(gulp.dest('dist/res/js/demo01'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify({
        output:{
            ascii_only:true
        }

    }))
    .pipe(gulp.dest('dist/res/js/demo01'))
    .pipe(browserSync.stream());
});

gulp.task('html-demo01', function () {
    gulp.src('src/demo01/*.html')
    .pipe(gulp.dest("dist/demo01"))
    .pipe(browserSync.stream());

});
gulp.task("css-demo01", function () {
    return gulp.src('src/res/css/demo01/*.css')
    .pipe(autoprefixer({
        browsers: ['> 1%'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/res/css/demo01'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/res/css/demo01'))
    .pipe(browserSync.stream());
})

// gulp.task("auto-demo01", function () {
//     gulp.watch("src/demo01/*", ['html-demo01']);
//     gulp.watch('src/res/css/demo01/*.css', ['css-demo01']);
//     gulp.watch('src/res/js/demo01/demo01.js', ['js-demo01']);
// });
/*
*HTML5 
 */
gulp.task('js-HTML5',function(){
    return gulp.src(['src/res/js/HTML5/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('*.js'))
    .pipe(gulp.dest('dist/res/js/HTML5'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify({
        output:{
            ascii_only:true
        }

    }))
    .pipe(gulp.dest('dist/res/js/HTML5'))
    .pipe(browserSync.stream());
});

gulp.task('html-HTML5', function () {
    gulp.src('src/HTML5/*.html')
    .pipe(gulp.dest("dist/HTML5"))
    .pipe(browserSync.stream());

});
gulp.task("css-HTML5", function () {
    return gulp.src('src/res/css/HTML5/*.css')
    .pipe(autoprefixer({
        browsers: ['> 1%'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/res/css/HTML5'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/res/css/HTML5'))
    .pipe(browserSync.stream());
})

gulp.task('js-angular',function(){
    return gulp.src(['src/res/js/angular/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('*.js'))
    .pipe(gulp.dest('dist/res/js/angular'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify({
        output:{
            ascii_only:true
        }

    }))
    .pipe(gulp.dest('dist/res/js/angular'))
    .pipe(browserSync.stream());
});

gulp.task('html-angular', function () {
    gulp.src('src/angular/*.html')
    .pipe(gulp.dest("dist/angular"))
    .pipe(browserSync.stream());

});
gulp.task("css-angular", function () {
    return gulp.src('src/res/css/angular/*.css')
    .pipe(autoprefixer({
        browsers: ['> 1%'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/res/css/angular'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/res/css/angular'))
    .pipe(browserSync.stream());
})

// 音悦台页面
gulp.task('html-yinyuetai', function () {
    gulp.src('src/yinyuetai/*.html')
    .pipe(gulp.dest("dist/yinyuetai"))
    .pipe(browserSync.stream());

});

gulp.task('js-yinyuetai',function(){
    return gulp.src(['src/res/js/yinyuetai/index.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/res/js/yinyuetai'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify({
        output:{
            ascii_only:true
        }

    }))
    .pipe(gulp.dest('dist/res/js/yinyuetai'))
    .pipe(browserSync.stream());
});

gulp.task("css-yinyuetai", function () {
    return gulp.src('src/res/css/yinyuetai/*.scss')
    .pipe(sass({ style: 'expanded' }))
      .pipe(autoprefixer({
          browsers: ['> 1%'],
          cascade: false
      }))
      .pipe(gulp.dest('dist/res/css/yinyuetai'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss({ compatibility: 'ie8' }))
      .pipe(gulp.dest('dist/res/css/yinyuetai'))
})

// ES6
gulp.task('html-es6', function () {
    gulp.src('src/es6/*.html')
    .pipe(gulp.dest("dist/es6"))
    .pipe(browserSync.stream());

});

gulp.task('js-es6',function(){
    return gulp.src(['src/res/js/es6/index.js'])
    .pipe(babel({
         presets: ['es2015']
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/res/js/es6'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify({
        output:{
            ascii_only:true
        }

    }))
    .pipe(gulp.dest('dist/res/js/es6'))
    .pipe(browserSync.stream());
});

gulp.task("css-es6", function () {
    return gulp.src('src/res/css/es6/*.scss')
    .pipe(sass({ style: 'expanded' }))
      .pipe(autoprefixer({
          browsers: ['> 1%'],
          cascade: false
      }))
      .pipe(gulp.dest('dist/res/css/es6'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss({ compatibility: 'ie8' }))
      .pipe(gulp.dest('dist/res/css/es6'))
})


//ANGULAR 静态服务器
gulp.task('angular',function() {
    browserSync.init({
        server: {
            baseDir: "dist",
             directory: true
        }
    });
    gulp.watch("src/angular/*.html", ['html-angular']).on('change', browserSync.reload);
    gulp.watch('src/res/css/angular/*.css', ['css-angular']).on('change', browserSync.reload);
    gulp.watch('src/res/js/angular/angular.js', ['js-angular']).on('change', browserSync.reload);
});

//HTML5 静态服务器
gulp.task('HTML5',function() {
    browserSync.init({
        server: {
            baseDir: "dist",
             directory: true
        }
    });
    gulp.watch("src/HTML5/*.html", ['html-HTML5']).on('change', browserSync.reload);
    gulp.watch('src/res/css/HTML5/*.css', ['css-HTML5']).on('change', browserSync.reload);
    gulp.watch('src/res/js/HTML5/*.js', ['js-HTML5']).on('change', browserSync.reload);
});

//HTML5 静态服务器
gulp.task('yinyuetai',function() {
    browserSync.init({
        server: {
            baseDir: "dist",
             directory: true
        }
    });
    gulp.watch("src/yinyuetai/*.html", ['html-yinyuetai']).on('change', browserSync.reload);
    gulp.watch('src/res/css/yinyuetai/*.scss', ['css-yinyuetai']).on('change', browserSync.reload);
    gulp.watch('src/res/js/yinyuetai/*.js', ['js-yinyuetai']).on('change', browserSync.reload);
});

//ECMA6 学习
gulp.task('es6',function(){
   browserSync.init({
        server: {
            baseDir: "dist",
             directory: true
        }
    });
    gulp.watch("src/es6/*.html", ['html-es6']).on('change', browserSync.reload);
    gulp.watch('src/res/css/es6/*.scss', ['css-es6']).on('change', browserSync.reload);
    gulp.watch('src/res/js/es6/*.js', ['js-es6']).on('change', browserSync.reload);

});
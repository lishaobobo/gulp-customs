/**
 * Created by halfmoon on 2017/04/01.
 */
// 导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');                             // 本地安装gulp所用到的地方
var fileinclude = require('gulp-file-include');         // 包含HTML
var connect = require('gulp-connect');                  // 本地服务
var imagemin = require('gulp-imagemin');                // 图片压缩
var watch = require('gulp-watch');                      // 监听
var less = require('gulp-less');                        // 编译less
var sass = require('gulp-sass');                        // 编译sass
var notify = require('gulp-notify');                    // 处理LESS错误
var plumber = require('gulp-plumber');                  // 构建异常捕获，防止构建进程崩掉
var postcss = require('gulp-postcss');                  // css 兼容
var autoprefixer = require('autoprefixer');             // 处理浏览器私有前缀
var cssnext = require('cssnext');                       // 使用CSS未来的语法
var precss = require('precss');                         // 像Sass的函数
var spritesmith = require('gulp.spritesmith');          // 精灵图片
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cssbeautify = require('gulp-cssbeautify');          // css 美化
var minifycss = require('gulp-minify-css');             // 压缩css
var concat = require('gulp-concat');                    // 合并文件
var babel = require('gulp-babel');                      // 将ES6代码编译成ES5
var uglify = require('gulp-uglify');                    // 压缩js
var rename = require('gulp-rename');                    // 重命名文件
var cached = require('gulp-cached');                    // 文件缓存进内存
var remember = require('gulp-remember');                // 读取内存中的文件
var changed = require('gulp-changed');                  // 比较文件改变
var gutil = require('gulp-util');                       // 让电脑 哔 ~ 的响一声然后抛出异常
var debug = require('gulp-debug');

//include html并刷新服务器
gulp.task('fileinclude', function(done) {
    gulp.src(['src/html/*.html'])
        // .pipe(cached('fileinclude'))
        // .pipe(remember('fileinclude'))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/html'))
        .on('end', done)
        .pipe(reload({ stream: true }));
});

// 创建精灵图
gulp.task('sprite', function() {
    var spriteData = gulp.src('src/images/sprite/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '2_sprite.scss',
        cssFormat: 'css',                           // css 语法，但后缀名 是 scss
        imgPath: '../images/sprite.png'
    }));
    spriteData.img.pipe(gulp.dest('src/images')); // output path for the sprite
    spriteData.css.pipe(gulp.dest('src/css/')); // output path for the CSS
});

// 压缩图片
gulp.task('imagemin', ['sprite'], function() {
    var stream = gulp.src('src/images/*.+(png|jpg|jpeg|gif|svg)')
        // 如果想对变动过的文件进行压缩，则使用下面一句代码
        .pipe(cached(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(debug({ title: '压缩图片————:' }))
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({ stream: true }));
    return stream;
});

// sass 翻译 并 打包进入 temp_css 文件
gulp.task('testSass', function() {
    var processors = [autoprefixer, cssnext, precss];
    gulp.src('src/css/*.scss')
        .pipe(cached('testSass'))
        .pipe(sass())
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(postcss(processors))
        .pipe(cssbeautify({
            indent: '    ',
            openbrace: 'end-of-line',
            autosemicolon: true
        }))
        .pipe(remember('testSass'))
        .pipe(concat('common.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(debug({ title: '编译文件————:' }))
        .pipe(reload({ stream: true }));
});

// 打包Lib进入到dist目录
gulp.task('Libtodist', function() {
    gulp.src('src/Lib/**/*')
        .pipe(cached('Libtodist'))
        .pipe(debug({ title: 'LIB复制文件————:' }))
        .pipe(gulp.dest('dist/Lib'))
        .pipe(reload({ stream: true }));
});

// 打包JS到dist目录
gulp.task('jstodist', function() {
    gulp.src('src/js/**/*.js')
        .pipe(plumber({
            errHandler: function(e) {
                gutil.beep(); // 哔~ 的响一声
                gutil.log(e); // 抛出异常
            }
        }))
        .pipe(changed('dist/js', { hasChanged: changed.compareSha1Digest }))
        // .pipe(babel({ presets: ['es2015'] }))
        .pipe(debug({ title: '编译文件————:' }))
        // .pipe(remember('jstodist'))
        // .pipe(concat('public.js'))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({ stream: true }));
});

// 监视文件改动并重新载入
gulp.task('serve', function() {
    browserSync({
        port: 406,
        server: {
            baseDir: 'dist/'
        }
    });
});

// 监听所有HTML JS CSS改动
gulp.task('watch', function() {
    gulp.watch(['src/css/*.scss'], ['testSass']);
    gulp.watch(['src/images/sprite/*'], ['sprite']);
    gulp.watch(['src/Lib/**/*'], ['Libtodist']);
    gulp.watch(['src/js/*.js'], ['jstodist']);
    gulp.watch(['src/html/**/*.html'], ['fileinclude']);
    gulp.watch(['src/images/*'], ['imagemin']);
});

gulp.task('default', ['testSass', 'fileinclude', 'serve', 'imagemin', 'Libtodist', 'jstodist', 'watch']);

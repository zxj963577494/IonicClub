var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');

//index.html css、js合并压缩
gulp.task('index', function () {
    var assets = useref.assets();
    return gulp.src('app/index.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('www'));
});

// 语法检查
gulp.task('jshint', function () {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 复制文件
gulp.task('copy', function () {
    gulp.src('app/fonts/*')
        // 目标地址
        .pipe(gulp.dest('www/fonts/'))
    gulp.src('app/templates/**')
        // 目标地址
        .pipe(gulp.dest('www/templates/'))
    gulp.src('app/img/**')
        // 目标地址
        .pipe(gulp.dest('www/img/'))
});

// 监视文件的变化
gulp.task('watch', function () {
    gulp.watch('app/js/*.js', ['jshint', 'index']);
    gulp.watch('app/css/*.css', ['index']);
    gulp.watch(['app/fonts/*', 'app/templates/**', 'app/img/*'], ['copy']);
    gulp.watch(paths.sass, ['sass']);
});

// 清空图片、样式、js
gulp.task('clean', function () {
    return gulp.src(['www/css/*', 'www/js/*', 'www/img/*', 'www/lib/*', 'www/templates/*'], {read: false})
        .pipe(clean({force: true}));
});

// 注册缺省任务
gulp.task('default', ['jshint','clean', 'index', 'copy']);

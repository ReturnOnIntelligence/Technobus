var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    ftp = require('vinyl-ftp'),
    notify = require("gulp-notify"),
    rsync = require('gulp-rsync'),
    babel = require('gulp-babel'),
    jsdoc = require('gulp-jsdoc3');

// Скрипты проекта

gulp.task('doc', function (cb) {
    gulp.src(['README.md', 'app/js/*.js'], {read: false})
        .pipe(jsdoc(cb));
});

gulp.task("common-js", function () {
    return gulp.src([
        'app/js/common.js',
        'app/js/components/*.js'
    ])
        .pipe(babel({
            //plugins: ['transform-runtime'],
            presets: ['env']
        }))
        .pipe(concat('common.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        // 'app/libs/bootstrap/js/bootstrap.min.js',
        'app/js/common.min.js', // Всегда в конце
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(concat('style.css'))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function () {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/css/assets/*.css', browserSync.reload);
    gulp.watch(['libs/**/*.js', 'app/js/common.js', 'app/js/components/*.js'], ['js']);
    gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function () {
    return gulp.src('app/assets/images/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin','sass', 'js'], function () {

    var buildFiles = gulp.src([
        'app/*.html',
        'app/libs/upup/upup.sw.min.js',
        'app/libs/upup/upup.min.js',
    ]).pipe(gulp.dest('dist'));

    var buildLang = gulp.src([
        'app/lang/*',
    ]).pipe(gulp.dest('dist/lang'));

    var buildCss = gulp.src([
        'app/assets/css/*.css',
    ]).pipe(gulp.dest('dist/assets/css'));

    var buildJs = gulp.src([
        'app/js/scripts.min.js',
    ]).pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src([
        'app/assets/fonts/**/*',
    ]).pipe(gulp.dest('dist/assets/fonts'));
    var buildSvg = gulp.src([
        'app/assets/svg/**/*',
    ]).pipe(gulp.dest('dist/assets/svg'));
    var buildImgs = gulp.src([
        'app/assets/images/**/*',
    ]).pipe(gulp.dest('dist/assets/images'));

});

gulp.task('deploy', function () {

    var conn = ftp.create({
        host: 'nikitait.github.io',
        user: 'username',
        password: 'userpassword',
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'dist/**',
        'dist/.htaccess',
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('rsync', function () {
    return gulp.src('dist/**')
        .pipe(rsync({
            root: 'dist/',
            hostname: 'nikitait@nikitait.github.io',
            destination: 'nikitait.github.io/dist/',
            archive: true,
            silent: false,
            compress: true
        }));
});

gulp.task('removedist', function () {
    return del.sync('dist');
});
gulp.task('clearcache', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);

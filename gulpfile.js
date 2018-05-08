var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var del = require('del');
var minifyCSS = require('gulp-minify-css');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function() {
    gulp.src(['app/*.js', 'app/**/*.js', '!app/vendor/**'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('sass', function() {
    return gulp.src('app/scss/main.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(minifyCSS())
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('vendor', function() {
    gulp.src(['app/vendor/**'])
        .pipe(gulp.dest('dist/vendor'));
});
gulp.task('img', function() {
    gulp.src(['app/img/**'])
        .pipe(gulp.dest('dist/img'));
});
gulp.task('html', function() {
    gulp.src(['app/*.html', 'app/**/*.html'])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
})
gulp.task('clean', function() {
    return del.sync('dist');
})
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch(['app/*.html', 'app/**/*.html'], ['html']);
    gulp.watch(['app/*.js', 'app/**/*.js'], ['js']);
});


gulp.task('default', ['clean', 'sass', 'vendor', 'html', 'js', 'img', 'watch']);
gulp.task('dev', ['clean', 'sass', 'vendor', 'html', 'js', 'img']);

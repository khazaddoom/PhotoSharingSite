var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')


gulp.task('compile-sass', function() {
    //first task is to compile all the SCSS files(sass() call) and move the outputs(css file) to correct CSS folder
    //browserSync is for browser injection?
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
})

gulp.task('move-js', function() {

    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/tether/dist/js/tether.min.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
})

gulp.task('move-fonts', function() {

    return gulp.src(['node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest('src/fonts'))
    .pipe(browserSync.stream())

})

gulp.task('launch-server', ['compile-sass'], function() {

    browserSync.init({
        server: './src'
    })

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/font-awesome/scss/font-awesome.scss', 'src/scss/*.scss'], ['compile-sass'])

    gulp.watch('src/*.html').on('change', browserSync.reload)

})

gulp.task('default', ['move-js', 'move-fonts', 'launch-server'])
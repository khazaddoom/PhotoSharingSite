var gulp = require("gulp"),
sass = require("gulp-sass"),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
cssnano = require("cssnano"),
sourcemaps = require("gulp-sourcemaps"),
browserSync = require("browser-sync").create();

var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "src/scss/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "src/css"
    }
};

function style() {
    return gulp.src(paths.styles.src)
        // Initialize sourcemaps before compilation starts
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream());
}

// A simple task to reload the page
function reload() {

    console.log('test');
    browserSync.reload();
}

// Add browsersync initialization at the start of the watch task
function watch() {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./src"
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });
    gulp.watch(paths.styles.src, style);
    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch("src/*.html", reload);
}

// Don't forget to expose the task!
exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.parallel(style, watch);
 
/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);
 
/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);


// ===============================================

// var gulp = require('gulp')
// var browserSync = require('browser-sync').create()
// var sass = require('gulp-sass')


// gulp.task('compile-sass', function() {
//     //first task is to compile all the SCSS files(sass() call) and move the outputs(css file) to correct CSS folder
//     //browserSync is for browser injection?
//     return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
//     .pipe(sass())
//     .pipe(gulp.dest('src/css'))
//     .pipe(browserSync.stream())
// })

// gulp.task('move-js', function() {

//     return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
//     'node_modules/tether/dist/js/tether.min.js', 'node_modules/jquery/dist/jquery.min.js'])
//     .pipe(gulp.dest('src/js'))
//     .pipe(browserSync.stream())
// })

// gulp.task('move-fonts', function() {

//     return gulp.src(['node_modules/font-awesome/fonts/*'])
//     .pipe(gulp.dest('src/fonts'))
//     .pipe(browserSync.stream())

// })

// gulp.task('launch-server', ['compile-sass'], function() {

//     browserSync.init({
//         server: './src'
//     })

//     gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/font-awesome/scss/font-awesome.scss', 'src/scss/*.scss'], ['compile-sass'])

//     gulp.watch('src/*.html').on('change', browserSync.reload)

// })

// gulp.task('default', ['move-js', 'move-fonts', 'launch-server'], function(callback) {

//     console.log('reacheds');
//     callback();
// });

// function callback() {

// }
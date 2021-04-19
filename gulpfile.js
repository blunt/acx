/////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////

const gulp = require('gulp');

const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cache = require('gulp-cache');
const cssnano = require("cssnano");
const del = require('del');
const gulpif = require('gulp-if');
const npmDist = require('gulp-npm-dist');
const imagemin = require('gulp-imagemin');
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss");
const useref = require('gulp-useref');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');

// PATHS

var paths = {
    styles: {
        src: "./src/css/scss/**/*.scss",
        dest: "./src/css"
    }
};

// Compile SCSS into CSS

function sassy() {
    return gulp.src('./src/css/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer('defaults')]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    })
    gulp.watch('./src/css/scss/**/*.scss', sassy);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

function compile() {
    return gulp.src('./src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', terser()))
        .pipe(gulpif('*.css', postcss([cssnano()])))
        .pipe(gulp.dest('./dist'));
}

function fonts() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
}

function scriptLink() {
    return gulp.src(npmDist(), {base:'./node_modules'})
        .pipe(gulp.dest('./src/js/scripts'));
}

function images() {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
}

function purge() {
    return gulp.src('./dist/css/*.css')
        .pipe(
            purgecss({
                content: ['./dist/**/*.html']
            })
        )
        .pipe(gulp.dest('./dist/css'))
}

async function clean() {
    return del.sync(['./dist/**/*']);
}

exports.clean = clean;
exports.images = images;
exports.sassy = sassy;
exports.watch = watch;
exports.purge = purge;
exports.compile = compile;
exports.scriptLink = scriptLink;

exports.default = gulp.series(scriptLink, sassy, watch);
exports.link = gulp.series(scriptLink);
exports.build = gulp.series(clean, scriptLink, sassy, compile, images, fonts);
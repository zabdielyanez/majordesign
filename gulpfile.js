const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

function buildStyles() {
    return src('src/scss/**/*.scss')
        // .css
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            format: 'beautify',
            level: {
                1: {
                    specialComments: 1
                }
            }
        }))
        .pipe(dest('dist/css'))
        // min.css
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/css'));
}

function watchTask() {
    watch('src/scss/**/*.scss', buildStyles);
}

exports.default = series(buildStyles, watchTask);
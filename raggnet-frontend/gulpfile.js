const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');

function minifyJS() {
  return gulp.src('app/js/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js'}))
  .pipe(gulp.dest('public/js'));
}

function minifyCSS() {
  return gulp.src('app/styles/*.css')
  .pipe(cleanCSS())
  .pipe(rename({extname: '.min.css'}))
  .pipe(gulp.dest('public/styles'));
}

function watch() {
  gulp.watch('app/js/*.js', minifyJS);
  gulp.watch('app/styles/*.css', minifyCSS);
}

gulp.task('default', watch);
// TODO 1.1: add .min suffix to minified files
// TODO 1.2: learn more about uglify-js vs gulp-uglify
// TODO 1.3: learn more about gulp, rename, gulp-clean-css and babel

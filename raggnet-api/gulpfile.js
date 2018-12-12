// TODO: learn more about browser sync and how I can automatically
// run <node raggnet-api.js> when one of my files change

const gulp = require('gulp');
const browserSync = require('browser-sync');

function start() {
  return browserSync.init({
    server: 'build',
    open: false,
    port: 3000
  });
}

function serve() {
  return browserSync.init({
    server: 'build',
    open: false,
    port: 5000
  });
}

function watch() {
  gulp.watch('raggnet-api/**/*.js', start);
}

gulp.task('default', gulp.parallel(start, serve, watch));

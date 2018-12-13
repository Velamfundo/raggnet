// TODO: learn more about browser sync and how I can automatically
// run <node raggnet-api.js> when one of my files change

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const exec = require('child_process').exec;

function start_db() {
  exec('mongod -f ./models/mongod.conf', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
}

// start our server and listen for changes
function start() {
  // configure nodemon
  nodemon({
    script: 'raggnet-api.js',
    watch: ["raggnet-api.js", "./**/*.js"],
    ext: 'js'
  }).on('restart', () => {
    console.log('restarted!!!');
  });
}

gulp.task('default', gulp.parallel(start_db, start));
gulp.task('start', start);

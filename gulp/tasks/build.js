'use strict';

var gulp    = require('gulp'),
    $       = require('../utils/plugins'),
    config  = require('../utils/config');

gulp.task('build:copy', function () {

  return gulp.src([
      './src/bower_components/**/*',
      './src/index.html'
    ], { base: './src' })
    .pipe(gulp.dest('./dist'));

});

'use strict';

var gulp    = require('gulp'),
    $ = require('../utils/plugins'),
    config  = require('../utils/config');

gulp.task('watch', function () {
  $.watch([
    './src/index.html',
    './src/scripts/**/*'
  ], function () {
    gulp.start('build');
  });
});

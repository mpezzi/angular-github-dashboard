'use strict';

var gulp    = require('gulp'),
    $ = require('../utils/plugins'),
    config  = require('../utils/config');

gulp.task('watch', function () {
  $.watch(config.settings.watch, function () {
    gulp.start('server:reload:page');
  });
});

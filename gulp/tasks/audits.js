'use strict';

var gulp   = require('gulp'),
    $      = require('../utils/plugins'),
    config = require('../utils/config');

/**
 * Check the accessibility of the final output.
 */
gulp.task('audits:accessibility', function () {
  // @todo: prevent auditing bower_components folder. For now
  //        just run an audit on index.html
  return gulp.src('./src/index.html')
    .pipe($.a11y())
    .pipe($.a11y.reporter());
});

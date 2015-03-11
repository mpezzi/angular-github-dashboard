'use strict';

var gulp    = require('gulp'),
    $       = require('../utils/plugins'),
    config  = require('../utils/config'),
    ghPages = require('gulp-gh-pages');

gulp.task('deploy', function () {

  return gulp.src('./dist/**/*')
    .pipe(ghPages());

});

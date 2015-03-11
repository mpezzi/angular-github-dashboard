'use strict';

var gulp          = require('gulp'),
    $             = require('../utils/plugins'),
    config        = require('../utils/config'),
    templateCache = require('gulp-angular-templatecache');

gulp.task('templates:build', function () {

  return gulp.src('./src/scripts/**/*.html')
    .pipe(templateCache('app-templates.js', {
      module: 'app.templates',
      standalone: true,
      root: '/src/scripts/'
    }))
    .pipe(gulp.dest('./dist/scripts'));

});

gulp.task('templates:build:min', function () {

  return gulp.src('./src/scripts/**/*.html')
    .pipe(templateCache('app-templates.min.js', {
      module: 'app.templates',
      standalone: true,
      root: '/src/scripts/'
    }))
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/scripts'));

});

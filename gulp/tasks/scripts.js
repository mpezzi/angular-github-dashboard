'use strict';

var gulp    = require('gulp'),
    $       = require('../utils/plugins'),
    config  = require('../utils/config'),
    ts      = require('gulp-typescript'),
    merge   = require('merge2');

gulp.task('scripts:clean', function () {
  return $.del(config.paths.dest.scripts);
});

var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: true
});

gulp.task('scripts:build', function() {
  var results = gulp.src([
      './src/scripts/app.ts',
      './src/scripts/**/*.module.ts',
      './src/scripts/**/*.ts'
    ])
    .pipe(ts({
      sortOutput: true,
      removeComments: true
    }))

  return results.js
    .pipe($.concat('app.js'))
    .pipe($.annotate())
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('scripts:build:min', function() {
  var results = gulp.src([
    './src/scripts/app.ts',
    './src/scripts/**/*.module.ts',
    './src/scripts/**/*.ts'
  ])
    .pipe(ts({
      sortOutput: true,
      removeComments: true
    }))

  return results.js
    .pipe($.concat('app.min.js'))
    .pipe($.annotate())
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('scripts:watch', ['scripts:build', 'scripts:build:min'], function() {
  gulp.watch('./src/scripts/**/*.ts', ['scripts:build', 'scripts:build:min']);
});

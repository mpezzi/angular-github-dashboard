'use strict';

var gulp = require('gulp');

gulp.task('audits', ['audits:accessibility']);

gulp.task('scripts', ['scripts:build', 'scripts:build:min']);

gulp.task('develop', ['server:start', 'watch']);

gulp.task('build', ['scripts', 'audits', 'build:copy', 'templates:build', 'templates:build:min']);

gulp.task('default', ['build']);

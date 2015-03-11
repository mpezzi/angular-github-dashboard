'use strict';

var gulp = require('gulp');

gulp.task('audits', ['audits:accessibility']);

gulp.task('scripts', ['scripts:build', 'scripts:build:min']);

gulp.task('develop', ['server:start', 'watch']);

gulp.task('build', ['scripts', 'audits']);

gulp.task('default', ['build']);

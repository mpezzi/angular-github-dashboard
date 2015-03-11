'use strict';

var gulp = require('gulp');

gulp.task('audits', ['audits:accessibility']);

gulp.task('templates', ['templates:build', 'templates:build:min'])

gulp.task('scripts', ['scripts:build', 'scripts:build:min']);

gulp.task('build', ['scripts', 'templates', 'audits', 'build:copy']);

gulp.task('default', ['build']);

'use strict';

var gulp    = require('gulp'),
    $ = require('../utils/plugins'),
    config  = require('../utils/config');

gulp.task('server:start', ['build'], function () {
  var settings = config.settings.server;

  if ($.util.env.tunnel) {
    settings.tunnel = true;
  }

  $.browsersync(settings);
});

gulp.task('server:reload:page', ['build'], function () {
  $.browsersync.reload();
});

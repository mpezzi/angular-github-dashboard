'use strict';

module.exports.paths = {
  src: {
    base: './src',
    scripts: './src/scripts/**/*.js',
    styles: './src/styles/**/*.scss',
    markup: './src/**/*.html'
  },
  dest: {
    base: './dist',
    scripts: './dist/scripts',
    styles: './dist/styles'
  }
};

module.exports.settings = {
  server: {
    server: {
      baseDir: './',
      index: './src/index.html'
    }
  },
  watch: [
    module.exports.paths.src.markup,
    module.exports.paths.src.scripts,
    module.exports.paths.src.styles
  ]
};

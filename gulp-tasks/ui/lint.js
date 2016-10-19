'use strict';

var cached = require('gulp-cached');
var sassLint = require('gulp-sass-lint');
var gulpif = require('gulp-if');

module.exports = function (gulp, options) {
  if (options.ui.lint.enabled) {
    return gulp.src(options.css.src)
      .pipe(cached('styles:lint'))
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(gulpif(options.ui.lint.failOnError, sassLint.failOnError()));
  }
  else {
    return console.log('css linting not enabled');
  }
};
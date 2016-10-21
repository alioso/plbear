'use strict';

module.exports = function (gulp, options) {
  return gulp.watch(options.ui.src, ['ui:lint', 'ui:build']);
};
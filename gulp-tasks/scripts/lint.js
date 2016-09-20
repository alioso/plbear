'use strict';

var eslint = require('gulp-eslint');

module.exports = function(gulp, options) {
  var source = options.js.src;
  source.push('!js/vendor/*');
  source.push('!js/*.min.js');
  
  return gulp.src(source)
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format());
};
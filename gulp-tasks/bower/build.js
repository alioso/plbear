'use strict';

var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');

module.exports = function (gulp, options) {
  var files = mainBowerFiles({debugging: true, includeDev: true});
  var jsFilter = gulpFilter('**/*.js', {restore: true});
  var cssFilter = gulpFilter('**/*.css', {restore: true});
  var imageFilter = gulpFilter(['**/*.jpg', '**/*.jpeg', '**/*.gif' ,'**/*.png'], {restore: true});
  var fontFilter = gulpFilter(['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf'], {restore: true});

  return gulp.src(files)

    // grab vendor js files from bower_components
    .pipe(jsFilter)
    .pipe(gulp.dest(options.bower.dest + '/js'))
    .pipe(jsFilter.restore)

    // grab vendor css files from bower_components
    .pipe(cssFilter)
    .pipe(gulp.dest(options.bower.dest + '/css'))
    .pipe(cssFilter.restore)

    // grab vendor images files from bower_components
    .pipe(imageFilter)
    .pipe(gulp.dest(options.bower.dest + '/images'))
    .pipe(imageFilter.restore)

    // grab vendor font files from bower_components
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest(options.bower.dest + '/fonts'));
};
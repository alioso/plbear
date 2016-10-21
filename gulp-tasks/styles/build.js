'use strict';

var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var flexibility = require('postcss-flexibility');
var postcss = require('gulp-postcss');
var cached = require('gulp-cached');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var flatten = require('gulp-flatten');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');

module.exports = function (gulp, options) {

  var processors = [
    autoprefixer({browsers: options.css.browsers}),
    mqpacker({sort: true}),
    flexibility()
  ];

  return gulp.src(options.css.src)
    .pipe(sassGlob())
    .pipe(plumber({
      errorHandler: function (error) {
        notify.onError({
          title: 'CSS <%= error.name %> - Line <%= error.line %>',
          message: '<%= error.message %>'
        })(error);
        this.emit('end');
      }
    }))
    .pipe(gulpif(options.css.buildSourceMaps, sourcemaps.init({debug: true})))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on('error', sass.logError)
    .pipe(gulpif(options.css.buildSourceMaps, sourcemaps.write()))
    .pipe(postcss(processors))
    .pipe(flatten())
    .pipe(gulp.dest(options.css.dest))
    .on('end', function () {
      if (options.browserSync.patterns.enabled) {
        browserSync.get('patterns').reload();
      }

      if (options.browserSync.site.enabled) {
        browserSync.get('site').reload();
      }
    });
};

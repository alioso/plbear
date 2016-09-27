(function () {
  'use strict';

  var gulp = require('gulp');
  var yaml = require('js-yaml');
  var fs = require('fs');
  var assign = require('lodash.assign');
  var backstopConfig  = require('./backstop.json'),
  gulp            = require('gulp'),
  shell           = require('gulp-shell'),
  gutil           = require('gulp-util'),
  notify          = require('gulp-notify'),
  argv            = require('yargs').argv,
  gulpif          = require('gulp-if'),
  browserSync     = require('browser-sync').create();

var assign = require('lodash.assign');

  //  should we build sourcemaps? "gulp build --sourcemaps"
  var buildSourceMaps = !!argv.sourcemaps;

  // read default config settings
  var config = yaml.safeLoad(fs.readFileSync('default.gulpfile.yml', 'utf8'), {json: true});
  try {
    // override default config settings
    var customConfig = yaml.safeLoad(fs.readFileSync('gulpfile.yml', 'utf8'), {json: true});
    config = assign(config, customConfig);
  } catch (e) {
    console.log('No custom config found! Proceeding with default config only.');
  }

  var gulpRequireTasks = require('gulp-require-tasks');
  gulpRequireTasks({
    path: process.cwd() + '/gulp-tasks',
    arguments: [config]
  });

  var patternLabTasks = require('./gulp-tasks/patternLab.js');
  patternLabTasks(gulp, config);

  var backstopTasks = require('./gulp-tasks/backstop.js');
  backstopTasks(gulp, config);

  gulp.task('watch', ['serve', 'styles:watch', 'ui:watch', 'scripts:watch', 'pl:watch']);
  gulp.task('default', ['watch']);
  gulp.task('build', ['images:build', 'ui:build', 'styles:build', 'pl:build']);

}());

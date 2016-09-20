'use strict';

var core = require('./core.js');
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs');
var browserSync = require('browser-sync');
//var inject = require('gulp-inject');
//var bowerFiles = require('main-bower-files');
//var _ = require('lodash');

module.exports = function (gulp, options) {
  var plConfig = yaml.safeLoad(
    fs.readFileSync(options.patternLab.configFile, 'utf8')
  );
  var plRoot = path.join(options.patternLab.configFile, '../..');
  var plSource = path.join(plRoot, plConfig.sourceDir);
  var plPublic = path.join(plRoot, plConfig.publicDir);
  var plMeta = path.join(plSource, '/_meta');
  var consolePath = path.join(plRoot, 'core/console');
  var watchedExtensions = options.patternLab.watchedExtensions.join(',');

  function plBuild(cb) {
    core.sh('php ' + consolePath + ' --generate', true, function () {
      if (options.browserSync.enabled) {
        browserSync.get('pl').reload();
      }
      cb();
    });
  }

  gulp.task('pl:build', plBuild);



  gulp.task('pl:watch', function () {
    var plGlob = path.normalize(plSource + '/**/*.{' + watchedExtensions + '}' );
    console.log('glob files', plGlob);

    gulp.watch(plGlob, function(event) {
      console.log('File ' + path.relative(process.cwd(), event.path) + ' was ' + event.type + ', running tasks...');
      core.sh('php ' + consolePath +  ' --generate', false, function() {
        if (options.browserSync.patterns.enabled) {
          browserSync.get('patterns').reload();
        }
      });
    });
  });
};
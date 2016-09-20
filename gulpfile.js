'use strict';

// core utilities
var yaml = require('js-yaml');
var fs = require('fs');
var backstopConfig  = require('./backstop.json'),
    gulp            = require('gulp'),
    shell           = require('gulp-shell'),
    gutil           = require('gulp-util'),
    notify          = require('gulp-notify'),
    argv            = require('yargs').argv,
    gulpif          = require('gulp-if'),
    browserSync     = require('browser-sync').create();

//  should we build sourcemaps? "gulp build --sourcemaps"
var buildSourceMaps = !!argv.sourcemaps;

// read default config settings
var config = yaml.safeLoad(fs.readFileSync('default.gulpfile.yml', 'utf8'), {json: true});
try {
  // override default config settings
  var customConfig = yaml.safeLoad(fs.readFileSync('gulpfile.yml', 'utf8'), {json: true});
  config = Object.extend(config, customConfig);
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

// error notifications
var handleError = function (task) {
  return function (err) {
    gutil.beep();

    notify.onError({
      title: task,
      message: err.message,
      sound: false,
      icon: false
    })(err);

    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));

    this.emit('end');
  };
};

gulp.task('images', function () {
  gutil.log(gutil.colors.yellow('Crunching images!'));
  return gulp.src(paths.images)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .on('error', handleError('Image optimization'))
    .pipe(gulp.dest('./images/'));
});


//*********************
// CSS regression tools
//*********************

gulp.task('backstop:ref', shell.task([
  'cd node_modules/backstopjs; npm run reference'
]));

gulp.task('backstop:test', shell.task([
  'cd node_modules/backstopjs; npm run test'
]));

//**********************************************************//

gulp.task('watch', ['serve', 'styles:watch', 'scripts:watch', 'pl:watch']);
gulp.task('default', ['watch']);
gulp.task('build', ['styles:build', 'pl:build']);

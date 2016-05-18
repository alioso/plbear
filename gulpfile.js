'use strict';

// utilities
var config        = require('./config.json')  ,
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    notify        = require('gulp-notify'),
    argv          = require('yargs').argv,
    gulpif        = require('gulp-if'),
    runSequence   = require('run-sequence'),
    sass          = require('gulp-sass'),
    cssGlobbing   = require('gulp-css-globbing'),
    flatten       = require('gulp-flatten'),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),
    mqpacker      = require('css-mqpacker'),
    run           = require('gulp-run'),
    sourcemaps    = require('gulp-sourcemaps');

// js utilities
var jshint        = require('gulp-jshint'),
    stylish       = require('jshint-stylish');

// image utilities
var imagemin      = require('gulp-imagemin');

//  should we build sourcemaps? "gulp build --sourcemaps"
var buildSourceMaps = !!argv.sourcemaps;

// post CSS processors
var processors = [
  autoprefixer({browsers: ['last 2 version', 'IE 9']}), // specify browser compatibility with https://github.com/ai/browserslist
  mqpacker // this will reorganize css into media query groups, better for performance
];

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

function isDirectory(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  }
  catch (err) {
    return false;
  }
}

gulp.task('sass', function () {
  gutil.log(gutil.colors.yellow('Compiling the theme CSS!'));
  return gulp.src('./sass/*.scss')
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(gulpif(buildSourceMaps, sourcemaps.init()))
    .pipe(sass())
    .on('error', handleError('Sass Compiling'))
    .pipe(gulpif(buildSourceMaps, sourcemaps.write()))
    .pipe(postcss(processors))
    .on('error', handleError('Post CSS Processing'))
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('./pattern-lab/source/css'));
});

gulp.task('scripts', function () {
  gutil.log(gutil.colors.yellow('Reviewing JavaScript files!'));
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .on('error', handleError('JS Linting'));
});

gulp.task('images', function () {
  gutil.log(gutil.colors.yellow('Crunching images!'));
  return gulp.src('./images/**/*.{gif,jpg,png}')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .on('error', handleError('Image optimization'))
    .pipe(gulp.dest('./images/'));
});

gulp.task('clear-cache', function() {
  return run('drush ' + config.drush.alias + ' cr').exec();
});

gulp.task('patterns-change', function() {
  runSequence('generate-pattern-lab', 'copy-patterns', 'clear-cache');
});

gulp.task('templates-change', function() {
  runSequence('clear-cache');
});

gulp.task('sass-change', function() {
  runSequence('sass', 'generate-pattern-lab');
});

gulp.task('generate-pattern-lab', function() {
  run('php ' + config.patternLab.dir + '/core/console --generate').exec();
});

gulp.task('start-server', function() {
  run('php ' + config.patternLab.dir + '/core/console --server').exec();
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('copy-patterns', function() {
  return gulp.src('./pattern-lab/source/_patterns/**/*.html.twig')
    .pipe(flatten())
    .pipe(gulp.dest(config.drupal.patternsDir));
});

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass-change']);
  gulp.watch('./js/*.js', ['scripts']);
  gulp.watch('./images/**/*.{gif,jpg,png}', ['images']);
  gulp.watch('./pattern-lab/source/_patterns/**/*', ['patterns-change', 'generate-pattern-lab']);
});

gulp.task('default', ['sass', 'watch']);
gulp.task('styles', ['sass']);
gulp.task('build', ['sass', 'scripts', 'images']);

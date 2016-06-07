'use strict';

// utilities
var config        = require('./config.json'),
    argv          = require('yargs').argv,
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    notify        = require('gulp-notify'),
    gulpif        = require('gulp-if'),
    runSequence   = require('run-sequence'),
    sass          = require('gulp-sass'),
    cssGlobbing   = require('gulp-css-globbing'),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),
    mqpacker      = require('css-mqpacker'),
    contains      = require('gulp-contains'),
    run           = require('gulp-run'),
    rename        = require('gulp-rename'),
    sourcemaps    = require('gulp-sourcemaps'),
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload;

// js utilities
var jshint        = require('gulp-jshint'),
    stylish       = require('jshint-stylish');

// image utilities
var imagemin      = require('gulp-imagemin');

//  should we build sourcemaps? "gulp build --sourcemaps"
var buildSourceMaps = !!argv.sourcemaps;

var component = !!argv.param;

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

var component = argv.component ? argv.component : 'null';

gulp.task('export', function() {
  return gulp.src('./**/*.{scss,twig,js}', {base: './'})
  .pipe(contains({
		search: component,
		onFound: function (string, file, cb) {
      gulp.src('/'+file.path)
        .pipe(gulp.dest('./components/export/'+component+'/'));
        return false;
		},
    onNotFound: function (file, cb) {
      gutil.log(gutil.colors.bgRed("No component found with this name!"));
    }
  }));
});

// BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
    port: config.browserSync.port,
    proxy: config.browserSync.hostname,
    open: config.browserSync.openAutomatically,
    reloadDelay: config.browserSync.reloadDelay,
    injectChanges: config.browserSync.injectChanges,
    notify: config.browserSync.notify,
    online: config.browserSync.online,
    browser: ["google chrome", "firefox"]
  });
});

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
    .pipe(gulp.dest('./pattern-lab/source/css'))
    .pipe(browserSync.reload({stream:true}));
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

gulp.task('cr', function() {
  return run('drush ' + config.drush.alias + ' cr').exec();
});

gulp.task('patterns-change', function() {
  runSequence('generate-pattern-lab');
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

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('./sass/**/*.scss', ['sass-change']);
  gulp.watch('./js/*.js', ['scripts']);
  gulp.watch('./images/**/*.{gif,jpg,png}', ['images']);
  gulp.watch('./pattern-lab/source/_patterns/**/*', ['patterns-change']);
  gulp.watch('./templates/**/*', ['patterns-change']);
});

gulp.task('default', ['browserSync', 'sass', 'watch']);
gulp.task('styles', ['sass']);
gulp.task('build', ['sass', 'gutenberg', 'scripts', 'images', 'patterns-change']);

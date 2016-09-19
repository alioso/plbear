'use strict';

// core utilities
var defaultConfig   = require('./config.json'),
    backstopConfig  = require('./backstop.json'),
    gulp            = require('gulp'),
    shell           = require('gulp-shell'),
    gutil           = require('gulp-util'),
    notify          = require('gulp-notify'),
    argv            = require('yargs').argv,
    gulpif          = require('gulp-if'),
    browserSync     = require('browser-sync').create();

// css utilities
var sass            = require('gulp-sass'),
    cssGlobbing     = require('gulp-css-globbing'),
    scss            = require('postcss-scss'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    mqpacker        = require('css-mqpacker'),
    sourcemaps      = require('gulp-sourcemaps'),
    stylelint       = require('gulp-stylelint');

// js utilities
var eslint = require('gulp-eslint');

// image utilities
var imagemin = require('gulp-imagemin');

//  should we build sourcemaps? "gulp build --sourcemaps"
var buildSourceMaps = !!argv.sourcemaps;

// post CSS processors
var processors = [
  autoprefixer({browsers: ['last 2 version', 'IE 9']}), // specify browser compatibility with https://github.com/ai/browserslist
  mqpacker({sort: true}) // this will reorganize css into media query groups, better for performance
];

// create settings from config file and arguments
var config = {
  drush: {
    alias: argv.drushAlias || defaultConfig.drush.alias
  },
  browserSync: {
    hostname: argv.hostname || defaultConfig.browserSync.hostname,
    openAutomatically: argv.openAutomatically || defaultConfig.browserSync.openAutomatically,
    reloadDelay: argv.reloadDelay || defaultConfig.browserSync.reloadDelay,
    injectChanges: argv.injectChanges || defaultConfig.browserSync.injectChanges,
    notify: argv.notify || defaultConfig.browserSync.notify,
    online: argv.online || defaultConfig.browserSync.online
  },
  backstopjs : {
    reference: argv.reference
  }
};

// project paths
var paths = {
  js: 'js/*.js',
  sass: 'components/**/*.scss',
  images: 'images/**/*.{gif,jpg,png}',
  templates: 'templates/**/*.twig'
};

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

// Compile Sass
gulp.task('sass', function () {
  gutil.log(gutil.colors.yellow('Compiling the theme CSS!'));
  return gulp.src(paths.sass)
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe(gulpif(buildSourceMaps, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on('error', handleError('Sass Compiling'))
    .pipe(gulpif(buildSourceMaps, sourcemaps.write()))
    .pipe(postcss(processors))
    .on('error', handleError('Post CSS Processing'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream:true}));
});

// Lint Sass
gulp.task('sass:lint', function() {
  gutil.log(gutil.colors.yellow('Reviewing Sass files!'));
  return gulp.src(['sass/**/*.scss', '!sass/vendor/**/*.scss'])
    .pipe(stylelint({
      syntax: 'scss',
      reporters: [
        {formatter: 'string', console: true}
      ],
      failAfterError: false
    }))
});

gulp.task('scripts', function () {

});

// Lint JS
gulp.task('scripts:lint', function() {
  gutil.log(gutil.colors.yellow('Reviewing JavaScript files!'));
  return gulp.src(['js/*.js', '!js/vendor/*', '!js/*.min.js'])
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format());
});

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

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: config.browserSync.hostname,
    open: config.browserSync.openAutomatically,
    reloadDelay: config.browserSync.reloadDelay,
    injectChanges: config.browserSync.injectChanges,
    notify: config.browserSync.notify,
    online: config.browserSync.online,
    browser: ['google chrome']
  });
});

//************
// Pattern Lab
//************

gulp.task('pl:generate', shell.task([
  'cd pattern-lab; php core/console --generate'
]));

gulp.task('pl:watch', shell.task([
  'cd pattern-lab; php core/console --watch'
]));

gulp.task('pl:server', shell.task([
  'cd pattern-lab; php core/console --server'
]));


//******************
// Pattern Generator
//******************

// not working with Gulp at the moment. Just use "npm run new"

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

gulp.task('watch', ['browserSync'], function() {
  gulp.watch([paths.sass], ['sass:lint', 'sass']);
  gulp.watch(paths.js, ['scripts:lint']);
  gulp.watch(paths.templates);
});

gulp.task('default', ['sass:lint', 'sass', 'watch']);
gulp.task('build', ['sass:lint', 'scripts:lint', 'images']);

'use strict';

var assign = require('lodash.assign');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

module.exports = function (gulp, options) {
  var config = assign(options.ui.iconfont.config, {
    timestamp: Math.round(Date.now()/100)
  });

  return gulp.src(options.ui.iconfont.src)
    .pipe(iconfontCss({
      fontName: options.ui.iconfont.config.fontName,
      fontPath:  options.ui.iconfont.fontPath,
      targetPath:  options.ui.iconfont.scssFile
    }))
    .pipe(iconfont(config))
    .on('glyphs', function(glyphs, options) {
      console.log('Icon font generated!');
      console.log(glyphs);
    })
    .pipe(gulp.dest(options.ui.iconfont.dest));
};
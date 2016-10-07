'use strict';

var del = require('del');

module.exports = function (gulp, options) {
  return del([options.ui.dest]);
};
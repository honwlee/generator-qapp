var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    util = require('../utils');

module.exports = function() {
    livereload.listen({
        port: 35729,
        start: true
    });
    gutil.log('The env is : ', gutil.colors.magenta((util.isProd()) ? '"prod"' : '"dev"'));
    gulp.watch(util.assetSrc + 'resources/stylesheets/sass/*.scss', ['sass']);
};

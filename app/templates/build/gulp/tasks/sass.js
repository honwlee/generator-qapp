var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    header = require('gulp-header'),
    livereload = require('gulp-livereload'),
    minifyCss = require('gulp-minify-css'),
    sourceMaps = require('gulp-sourcemaps'),
    autoPrefixer = require('gulp-autoprefixer'),
    onError = require('../utils/handleErrors'),
    util = require('../utils');


var src = util.assetSrc + 'resources/stylesheets/sass/**/*.scss';

var dists = [util.assetDest + 'stylesheets', util.assetSrc + 'resources/stylesheets'];

var apConfig = {
    browsers: ['last 2 versions'],
    cascade: false
};

module.exports = function() {
    var sassData = sass(src, {
            style: 'expanded',
            // style: 'compressed',
            compass: true,
            sourcemap: true
        }).pipe(util.isProd() ? sourceMaps.init() : gutil.noop())
        .on('error', onError)
        .pipe(util.isProd() ? sourceMaps.write() : gutil.noop())
        .pipe(util.isProd() ? autoPrefixer(apConfig) : gutil.noop())
        .pipe(util.isProd() ? minifyCss() : gutil.noop())
        .pipe(util.isProd() ? header(util.banner, {
            pkg: util.pkg
        }) : gutil.noop());
    dists.forEach(function(dist) {
        sassData.pipe(gulp.dest(dist))
            .pipe(util.isProd() ? gutil.noop() : livereload());
    });
};

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    header = require('gulp-header'),
    sourceMaps = require('gulp-sourcemaps'),
    onError = require('../utils/handleErrors'),
    spritesmith = require('gulp.spritesmith'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    minifyCss = require('gulp-minify-css'),
    autoPrefixer = require('gulp-autoprefixer'),
    util = require('../utils');


var src = util.assetSrc + 'resources/images/album*.png';

var dstImg = util.assetDest + 'img';
var dstCss = util.assetDest + 'css';


var apConfig = {
    browsers: ['last 2 versions'],
    cascade: false
};

module.exports = function() {
    var spriteData = gulp.src(src)
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));

    spriteData.img
        .pipe(gulp.dest(dstCss));

    spriteData.css
        .pipe(util.isProd() ? sourceMaps.init() : gutil.noop())
        .pipe(sass())
        .on('error', onError)
        .pipe(util.isProd() ? sourceMaps.write() : gutil.noop())
        .pipe(util.isProd() ? autoPrefixer(apConfig) : gutil.noop())
        .pipe(util.isProd() ? minifyCss() : gutil.noop())
        .pipe(util.isProd() ? header(util.banner, {
            pkg: util.pkg
        }) : gutil.noop())
        .pipe(gulp.dest(dstCss))
        .pipe(util.isProd() ? gutil.noop() : livereload());

    return spriteData;

};

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    header = require('gulp-header'),
    livereload = require('gulp-livereload'),
    sourceMaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    amdOptimize = require('gulp-requirejs'),
    onError = require('../utils/handleErrors'),
    util = require('../utils');

var src = [util.src + '**/*.js'];

var dest = util.dest;

var requireConfig = {
    baseUrl: util.src,
    out: util.dest + "Activator.js",
    locale: "zh",
    optimize: "none",
    paths: {
        "utilhub": "empty:",
        "dojo": "empty:",
        "dijit": "empty:",
        "dojox": "empty:",
        "qscript": "empty:",
        "qscriptx": "empty:",
        "qface": "empty:",
        "qfacex": "empty:",
        "udesktop": "empty:",
        "toastr": "empty:",
        "nanoscroller": "empty:",
        "bundle": '../build/gulp/utils/bundle',
        "dependencies": "empty:",
        "i18n": '../build/gulp/utils/i18n',
        "text": '../build/gulp/utils/text',
        "utilhub-bundle-dynamic-package": "./"

    },
    name: 'utilhub-bundle-dynamic-package/Activator',
    include: [
        'utilhub-bundle-dynamic-package/App'
    ],
    onBuildWrite: function(name, path, contents) {
        console.log('Writing: ' + name);
        // output the original source contents

        // perform transformations on the original source
        if (["i18n", "text", "bundle"].indexOf(name) > -1) {
            return "";
        }
        contents = contents.replace("utilhub-bundle-dynamic-package", ".");

        // return contents
        return contents;
    }
};


module.exports = function() {
    if (util.isProd()) {
        return amdOptimize(requireConfig)
            .on('error', onError)
            .pipe(util.isProd() ? uglify() : gutil.noop())
            .pipe(util.isProd() ? header(util.banner, {
                pkg: util.pkg
            }) : gutil.noop())
            .pipe(gulp.dest(dest))
            .pipe(util.isProd() ? gutil.noop() : livereload());
    } else {
        return gulp.src(src)
            .pipe(util.isProd() ? sourceMaps.init() : gutil.noop())
            .on('error', onError)
            .pipe(util.isProd() ? sourceMaps.write() : gutil.noop())
            .pipe(util.isProd() ? uglify() : gutil.noop())
            .on('error', onError)
            .pipe(util.isProd() ? header(util.banner, {
                pkg: util.pkg
            }) : gutil.noop())
            .pipe(gulp.dest(dest))
            .pipe(util.isProd() ? gutil.noop() : livereload());

    }
};

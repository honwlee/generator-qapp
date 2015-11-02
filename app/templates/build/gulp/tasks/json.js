var gulp = require('gulp'),
    util = require('../utils');

module.exports = function() {
    return gulp.src(util.src + '**//*.json')
        .pipe(gulp.dest(util.dest));
};

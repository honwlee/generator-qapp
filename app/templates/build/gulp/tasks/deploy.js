var gutil = require('gulp-util'),
    gulp = require('gulp'),
    del = require('del'),
    util = require('../utils');
var src = util.assetDest + "**/*",
    cat = util.bundle.exports.apps.filter(function(s) {
        return s.serviceType === "App";
    })[0].category,
    dist = gutil.env.path + util.bundle.vendor + "/" + cat,
    distWithName = dist + "/" + util.bundle.name + "/" + util.bundle.version;
module.exports = function() {
    // delete bak folder
    del.sync([distWithName + ".bak"], {
        force: true
    });
    // rename current folder with xxx.bak
    gulp.src(distWithName + "/**/*")
        .pipe(gulp.dest(distWithName + ".bak"));
    // copy new version
    return gulp.src(src)
        .pipe(gulp.dest(distWithName));
};

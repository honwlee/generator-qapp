var gulp = require('gulp');

module.exports = function() {
    gulp.start('clean', 'html', 'css', 'script', 'json');
};

var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('website')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['webserver']);
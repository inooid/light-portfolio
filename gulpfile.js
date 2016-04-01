var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');


gulp.task('copy-html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
  return gulp.src('src/style.css')
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  gulp.start('copy-html');
  gulp.start('minify-css');
});

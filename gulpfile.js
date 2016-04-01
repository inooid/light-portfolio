var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('style', function() {
  return gulp.src('src/style.css')
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('default', function() {
  gulp.start('html');
  gulp.start('style');
  gulp.start('images');
});

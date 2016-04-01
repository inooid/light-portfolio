var gulp = require('gulp');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');

var dir = {
  src: 'src',
  dist: 'dist',
  temp: 'tmp'
}

gulp.task('style', function() {
  return gulp.src(`${dir.src}/styles/style.css`)
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(gulp.dest(`${dir.temp}/styles`));
});

gulp.task('images', function() {
  return gulp.src(`${dir.src}/images/*`)
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('revision', ['clean-dist', 'style', 'images'], function() {
  return gulp.src([`${dir.temp}/**/*.css`, `${dir.temp}/**/*.js`])
    .pipe(rev())
    .pipe(gulp.dest(dir.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(dir.temp))
});

gulp.task('revreplace', ['revision'], function(){
  var manifest = gulp.src(`${dir.temp}/rev-manifest.json`);

  return gulp.src(`${dir.src}/index.html`)
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest(dir.dist));
});

gulp.task('clean-dist', function() {
  return del(`${dir.dist}/styles`).then(function(paths) {
    console.log('Files and folders that are deleted:\n', paths.join('\n'));
  });
});

gulp.task('clean', function() {
  return del(dir.temp);
});

gulp.task('build', ['revreplace'], function() {
  gulp.start('clean');
});

gulp.task('default', ['build']);

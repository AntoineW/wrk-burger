/*!
 * gulp
 * $ npm install gulp gulp-sass gulp-autoprefixer gulp-cssnano jshint gulp-jshint gulp-concat gulp-uglify gulp-notify gulp-rename browser-sync --save
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync');

sass.compiler = require('node-sass');

// Styles
gulp.task('styles', function() {
  return gulp.src('../sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('../css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['../js/script.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('../sass/*.scss', gulp.task('styles'));

  // Watch .js files
  gulp.watch('../js/*.js', gulp.task('scripts'));

  // Browser sync
  browserSync({
    proxy: 'wrk-burger.wrk'
  });

  // Reload on change
  gulp.watch(['../index.html']).on('change', browserSync.reload);
  gulp.watch(['../css/style.css']).on('change', browserSync.reload);
  gulp.watch(['../js/script.js']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', gulp.task('watch'));
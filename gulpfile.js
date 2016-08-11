//*********** IMPORTS *****************
var gulp = require('gulp');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var uglifycss = require('gulp-uglifycss');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

global.errorMessage = '';

//Configuration - Change me

gulp.task('concat1', function() {
    return gulp.src([
        './includes/scripts/jquery-1.11.0.js',
        './includes/scripts/jquery.cookie.js',
    ])
        .pipe(concat('all1.js'))
        .pipe(gulp.dest('./includes/scripts'))
        .pipe(rename('ugJquerynCookie.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./includes/scripts'));
});


gulp.task('concatcss', function () {
    return gulp.src([
	    './includes/prettify/prettify.css',
        './includes/styles/validationEngine.jquery.css',
		'./includes/styles/font-awesome.css',
		'./includes/styles/jquery.Jcrop.css',
		'./includes/styles/jquery.minicolors.css',
		'./includes/styles/bootstrap-datetimepicker.min.css',
    ])
        .pipe(concatCss('all.css'))
        .pipe(gulp.dest('./includes/styles'))
        .pipe(rename('uglifyAll.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('./includes/styles'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "http://localhost:100/"
  })
})

gulp.task('livecss', function() {
  return gulp.src('./includes/styles/**/*.css') // Gets all files ending with .scss in app/scss
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'livecss'], function (){
  gulp.watch('./includes/styles/**/*.css', ['livecss']); 
  // Other watchers
});

//gulp.task('livewatch', function() {
//  return gulp.src('./Application/**/*.php') 
//    .pipe(browserSync.reload({
//      stream: true
 //   }))
//});


//gulp.task('watch', ['browserSync', 'livewatch'], function (){
//  gulp.watch('./Application/**/*.php', ['livewatch']); 
  // Other watchers
//});


//gulp.task('serve', function() {
//  browserSync({
//   proxy: "http://localhost:100/"
//  });
//  gulp.watch(['./Application/**/*.php'], {cwd: 'app'}, reload);
//});


gulp.task('default', []);



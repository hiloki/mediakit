var gulp    = require('gulp');
var rename  = require('gulp-rename');
var sass    = require('gulp-sass');
//var plumber = require('gulp-plumber');
var please  = require('gulp-pleeease');
var connect = require('gulp-connect');

gulp.task('connect', function(){
  connect.server({
    root: 'docs/',
    livereload: true
  });
});

gulp.task('html', function(){
  gulp.src('docs/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch('docs/*.html', ['html']);
  gulp.watch('src/scss/*.scss', ['styles', 'html']);
});

gulp.task('styles', function(){
  gulp.src('src/scss/*.scss')
    //.pipe(plumber)
    .pipe(sass())
    .pipe(gulp.dest('docs/css'))
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(gulp.dest('docs/css'));
});

gulp.task('default', ['connect', 'watch']);
gulp.task('serve', ['connect', 'watch']);
gulp.task('build', ['styles']);
